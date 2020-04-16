const fs = require('fs');

const turbineDefs = JSON.parse(fs.readFileSync('turbine_defs.json', { encoding: 'utf-8' }));

const config = ['cfg TurbineMaterials {'];
for (const [name, {tier, inertia, power}] of Object.entries(turbineDefs)) {
  config.push(`  cfg ${name} {`);
  config.push(`    Tier = ${tier}`);
  config.push(`    InertiaMultiplier = ${inertia}`);
  config.push(`    MaxMJPerTick = ${power}`);
  if (name === 'Iron') {
    config.push('    RegisterKit = No');
  }
  config.push('  }');
}
config.push('}');

for (const [name, {material}] of Object.entries(turbineDefs)) {
  const matKey = name.toLowerCase();
  config.push('recipes {');
  config.push(`  X = ${material}`);
  config.push(`  B = I:advgenerators:turbine_blade_${matKey}`);
  config.push(`  R = I:advgenerators:turbine_rotor_${matKey}`);
  config.push('');
  config.push('  F = I:advgenerators:iron_frame');
  config.push('  w = I:advgenerators:iron_wiring');
  config.push('  W = I:advgenerators:iron_tubing');
  config.push('  K = I:advgenerators:upgrade_kit');
  config.push('');
  config.push('  _XX');
  config.push('  _XX => $B * 4');
  config.push('  __X');
  config.push('');
  config.push('  BBB');
  config.push('  BXB => $R');
  config.push('  BBB');
  config.push('');
  config.push('  FWF');
  config.push(`  wRw => B:advgenerators:turbine_${matKey}`);
  config.push('  FWF');
  config.push('');
  if (name !== 'Iron') {
    config.push(`  shapeless: RK => I:advgenerators:turbine_kit_${matKey}`);
    config.push('');
  }
  config.push('  smelt: $R => $X * 11 + 0 xp');
  config.push('}');
}

console.log(config.join('\n'));
