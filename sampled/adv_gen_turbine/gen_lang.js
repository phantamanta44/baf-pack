const fs = require('fs');

const turbineDefs = JSON.parse(fs.readFileSync('turbine_defs.json', { encoding: 'utf-8' }));

const advGensBuiltins = new Set(['adv_alloy', 'bronze', 'enderium', 'gold', 'iron', 'manyullyn', 'steel', 'vibrant']);

const lang = [];
for (const [key, {name}] of Object.entries(turbineDefs)) {
  const keyNorm = key.toLowerCase();
  lang.push(`item.advgenerators.turbine_blade_${keyNorm}.name=${name} Turbine Blade`);
  lang.push(`item.advgenerators.turbine_rotor_${keyNorm}.name=${name} Turbine Rotor`);
  lang.push(`item.advgenerators.turbine_kit_${keyNorm}.name=${name} Turbine Upgrade Kit`);
  lang.push(`tile.advgenerators.turbine_${keyNorm}.name=${name} Turbine`);
}

console.log(lang.join('\n'));
