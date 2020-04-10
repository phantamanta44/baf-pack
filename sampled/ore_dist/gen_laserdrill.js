const fs = require('fs');

oreDist = JSON.parse(fs.readFileSync('ore_dist.json', { encoding: 'utf-8' }));
oreMeta = JSON.parse(fs.readFileSync('ore_metadata.json', { encoding: 'utf-8' }));

const oreEntries = [];

const colours = {
  black: 0, red: 1, green: 2, brown: 3,
  blue: 4, purple: 5, cyan: 6, light_grey: 7,
  dark_grey: 8, pink: 9, lime: 10, yellow: 11,
  light_blue: 12, magenta: 13, orange: 14, white: 15
};

function serItem(item) {
  if (typeof(item) === 'string') {
    return item;
  } else {
    return `${item.item}:${item.data || 0}`;
  }
}

function putEntry(key, name, weight, whitelist, blacklist) {
  const meta = oreMeta[key];
  oreEntries.push({
    item: key === name ? serItem(meta.rep) : `ore${name}`,
		color: colours[meta.colour],
		rarity: [{
      whitelist,
      blacklist,
      depth_min: 1,
      depth_max: 255,
      weight
    }]
  });
}

for (const [key, entry] of Object.entries(oreDist.overworld)) {
  putEntry(key, entry.name, entry.weight, '', 'minecraft:hell, minecraft:sky');
}
for (const [key, entry] of Object.entries(oreDist.nether)) {
  putEntry(key, entry.name, entry.weight, 'minecraft:hell', '');
}
for (const [key, entry] of Object.entries(oreDist.end)) {
  putEntry(key, entry.name, entry.weight, 'minecraft:sky', '');
}

console.log(JSON.stringify(oreEntries, null, 2));
