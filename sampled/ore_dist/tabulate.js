const fs = require('fs');

function readText(fileName) {
  return fs.readFileSync(fileName, { encoding: 'utf-8' });
}

const oreMeta = JSON.parse(readText('ore_metadata.json'));
const logScale = 1 / Math.log(12582**(1/999)); // hmmm... this number looks okay
let errored = false;

function parseDistribution(data, dim) {
  const distr = {};
  for (const line of data) {
    const trimmed = line.trim();
    if (trimmed) {
      const m = /^.+\[CHAT\]  \* §e(\w+)§r - ([\d,]+) \([^)]+\)$/g.exec(trimmed);
      if (m) {
        const oreName = m[1].replace('Aluminium', 'Aluminum');
        const oreKey = oreName.startsWith('Nether') ? oreName.substring(6) : oreName.startsWith('End') ? oreName.substring(3) : oreName;
        const ore = oreMeta[oreKey];
        if (ore) {
          const count = parseInt(m[2].replace(/,/g, ''));
          if (!isNaN(count) && count > 0) {
            distr[oreKey] = { name: oreName, weight: Math.ceil(Math.log(count) * logScale) };
          } else {
            console.log(`Bad count for ${oreName}: ${m[2]}`);
            errored = true;
          }
        } else {
          console.log(`Unknown ore: ${oreName}`);
          errored = true;
        }
      }
    }
  }
  return distr;
}

function readDistribution(dim) {
  return parseDistribution(readText(`${dim}.txt`).split('\n'), dim);
}

const distrs = {
  overworld: readDistribution('overworld'),
  nether: readDistribution('nether'),
  end: readDistribution('end')
};
if (errored) {
  console.log('One or more errors encountered!');
} else {
  console.log(JSON.stringify(distrs, null, 2));
}
