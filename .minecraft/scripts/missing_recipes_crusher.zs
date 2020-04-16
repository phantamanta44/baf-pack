function addRecipeSimple(input as crafttweaker.item.IIngredient, output as crafttweaker.item.IItemStack) {
  mods.immersiveengineering.Crusher.addRecipe(output, input, 2048);
  mods.metallurgyreforged.Crusher.addRecipe(input, output);
  mods.actuallyadditions.Crusher.addRecipe(output, input);
  mods.appliedenergistics2.Grinder.addRecipe(output, input, 8);
  mods.enderio.SagMill.addRecipe([output] as crafttweaker.item.IItemStack[], [1.0] as float[], input);
  mods.nuclearcraft.manufactory.addRecipe(input, output);
  mods.ic2.Macerator.addRecipe(output, input);
  for inputItem in input.items {
    mods.thermalexpansion.Pulverizer.addRecipe(output, inputItem, 4000);
    mods.extrautils2.Crusher.add(output, inputItem);
  }
}

function addRecipeOre(input as crafttweaker.item.IIngredient, output as crafttweaker.item.IItemStack) {
  addRecipeSimple(input, output);
  mods.mekanism.enrichment.addRecipe(input, output);
}

function addRecipeCrush(input as crafttweaker.item.IIngredient, output as crafttweaker.item.IItemStack) {
  addRecipeSimple(input, output);
  mods.mekanism.crusher.addRecipe(input, output);
}

addRecipeOre(<ore:orePhosphorite>, <metallurgy:phosphorus> * 4);
