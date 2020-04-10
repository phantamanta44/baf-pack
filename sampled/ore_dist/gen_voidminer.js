const fs = require('fs');

oreDist = JSON.parse(fs.readFileSync('ore_dist.json', { encoding: 'utf-8' }));
oreMeta = JSON.parse(fs.readFileSync('ore_metadata.json', { encoding: 'utf-8' }));

const oreEntries = [];

const tier = parseInt(process.argv[2]);
if (isNaN(tier) || tier < 0 || tier > 5) {
  throw new Error('Bad tier!');
}

function serItem(item) {
  if (typeof(item) === 'string') {
    return item;
  } else {
    return `${item.item}:${item.data || 0}`;
  }
}

const COLOUR_MAP = {
  light_grey: 'light_gray', dark_grey: 'gray'
};

function putEntry(item, weight, colour) {
  oreEntries.push({
    target: COLOUR_MAP[colour] || colour, weight, id: serItem(item)
  });
}

const envTechCrystals = [
  {
    "target": "black",
    "weight": 24,
    "id": "environmentaltech:lonsdaleite_crystal"
  }, {
    "target": "crystal",
    "weight": 200,
    "id": "environmentaltech:litherite_crystal"
  }, {
    "target": "crystal",
    "weight": 150,
    "id": "environmentaltech:erodium_crystal"
  }, {
    "target": "crystal",
    "weight": 120,
    "id": "environmentaltech:kyronite_crystal"
  }, {
    "target": "crystal",
    "weight": 90,
    "id": "environmentaltech:pladium_crystal"
  }, {
    "target": "crystal",
    "weight": 60,
    "id": "environmentaltech:ionite_crystal"
  }, {
    "target": "crystal",
    "weight": 30,
    "id": "environmentaltech:aethium_crystal"
  }
];

const envTechCrystalNdx = Math.min(tier + 3, envTechCrystals.length);
for (let i = 0; i < envTechCrystalNdx; i++) {
  oreEntries.push(envTechCrystals[i]);
}

for (const [dim, entrySet] of Object.entries(oreDist)) {
  for (const [key, entry] of Object.entries(entrySet)) {
    const meta = oreMeta[key];
    if (meta.primary_dim === dim && meta.tier <= tier) {
      if (key === entry.name) {
        putEntry(meta.rep, entry.weight, meta.colour);
      } else {
        putEntry(`OD:${entry.name}`, entry.weight, meta.colour);
      }  
    }
  }
}

console.log(JSON.stringify({ outputs: oreEntries }, null, 2));
