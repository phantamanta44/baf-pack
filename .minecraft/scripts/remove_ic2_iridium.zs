mods.jei.JEI.removeAndHide(<ic2:misc_resource:1>);
mods.jei.JEI.removeAndHide(<ic2:misc_resource:2>);
recipes.addShapeless(<thermalfoundation:material:135>, [<ic2:misc_resource:1>]);
recipes.addShapeless(<thermalfoundation:material:199>, [<ic2:misc_resource:2>]);

// iridium-reinforced plate
recipes.remove(<ic2:crafting:4>);
recipes.addShaped(<ic2:crafting:4>, [
  [<ore:ingotIridium>, <ore:plateAdvancedAlloy>, <ore:ingotIridium>],
  [<ore:plateAdvancedAlloy>, <ore:gemDiamond>, <ore:plateAdvancedAlloy>],
  [<ore:ingotIridium>, <ore:plateAdvancedAlloy>, <ore:ingotIridium>]
]);

// jetpack attachment plate
recipes.remove(<ic2:crafting:37>);
recipes.addShaped(<ic2:crafting:37>, [
  [<ore:nuggetIridium>, <ore:plateAdvancedAlloy>, <ore:nuggetIridium>],
  [<ore:plateCarbon>, <ore:plateSteel>, <ore:plateCarbon>],
  [<ore:nuggetIridium>, <ore:plateAdvancedAlloy>, <ore:plateCarbon>]
]);
