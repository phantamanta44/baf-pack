const fs = require('fs');

oreDist = JSON.parse(fs.readFileSync('ore_dist.json', { encoding: 'utf-8' }));

console.log('data {');
console.log('    S:data <');
for (const {name, weight} of Object.values(oreDist.overworld)) {
  console.log(`        ore${name};${weight}`);
}
console.log('     >');
console.log('}');
