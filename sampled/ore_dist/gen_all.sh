# astral sorcery
mkdir -p out/astralsorcery
node.exe gen_astral.js > out/astralsorcery/aevitas_ore_perk.cfg
cp out/astralsorcery/aevitas_ore_perk.cfg out/astralsorcery/mineralis_ritual.cfg
cp out/astralsorcery/aevitas_ore_perk.cfg out/astralsorcery/perk_void_trash_replacement.cfg
cp out/astralsorcery/aevitas_ore_perk.cfg out/astralsorcery/treasure_shrine.cfg

# industrial foregoing
mkdir -p out/laser_drill_ores
node.exe gen_laserdrill.js > out/laser_drill_ores/laser_drill.json

# environmental tech
mkdir -p out/environmentaltech/multiblocks/void_miner/ore
for tier in {0..5}
do
  node.exe gen_voidminer.js $tier > out/environmentaltech/multiblocks/void_miner/ore/tier_$(($tier+1)).json
done
