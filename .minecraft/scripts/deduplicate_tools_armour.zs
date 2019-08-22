import mods.jei.JEI;

function rmBasicTools(namespace as string, name as string) {
  JEI.removeAndHide(itemUtils.getItem(namespace ~ ":" ~ name ~ "_axe"));
  JEI.removeAndHide(itemUtils.getItem(namespace ~ ":" ~ name ~ "_shovel"));
  JEI.removeAndHide(itemUtils.getItem(namespace ~ ":" ~ name ~ "_pickaxe"));
  JEI.removeAndHide(itemUtils.getItem(namespace ~ ":" ~ name ~ "_sword"));
}

function rmTools(namespace as string, name as string) {
  JEI.removeAndHide(itemUtils.getItem(namespace ~ ":" ~ name ~ "_hoe"));
  rmBasicTools(namespace, name);
}

function rmArmour(namespace as string, name as string) {
  JEI.removeAndHide(itemUtils.getItem(namespace ~ ":" ~ name ~ "_helmet"));
  JEI.removeAndHide(itemUtils.getItem(namespace ~ ":" ~ name ~ "_chestplate"));
  JEI.removeAndHide(itemUtils.getItem(namespace ~ ":" ~ name ~ "_leggings"));
  JEI.removeAndHide(itemUtils.getItem(namespace ~ ":" ~ name ~ "_boots"));
}

function rmAll(namespace as string, name as string) {
  rmArmour(namespace, name);
  rmTools(namespace, name);
}

function rmBasicToolsZ(namespace as string, name as string) {
  JEI.removeAndHide(itemUtils.getItem(namespace ~ ":" ~ "axe_" ~ name));
  JEI.removeAndHide(itemUtils.getItem(namespace ~ ":" ~ "shovel_" ~ name));
  JEI.removeAndHide(itemUtils.getItem(namespace ~ ":" ~ "pickaxe_" ~ name));
  JEI.removeAndHide(itemUtils.getItem(namespace ~ ":" ~ "sword_" ~ name));
}

function rmToolsZ(namespace as string, name as string) {
  JEI.removeAndHide(itemUtils.getItem(namespace ~ ":" ~ "hoe_" ~ name));
  rmBasicToolsZ(namespace, name);
}

function rmArmourZ(namespace as string, name as string) {
  JEI.removeAndHide(itemUtils.getItem(namespace ~ ":" ~ "helmet_" ~ name));
  JEI.removeAndHide(itemUtils.getItem(namespace ~ ":" ~ "chestplate_" ~ name));
  JEI.removeAndHide(itemUtils.getItem(namespace ~ ":" ~ "leggings_" ~ name));
  JEI.removeAndHide(itemUtils.getItem(namespace ~ ":" ~ "boots_" ~ name));
}

function rmAllZ(namespace as string, name as string) {
  rmArmourZ(namespace, name);
  rmToolsZ(namespace, name);
}

// tin
rmToolsZ("embers", "tin");
// silver
rmAll("metallurgy", "silver");
rmToolsZ("embers", "silver");
rmTools("mysticalworld", "silver");
// steel
rmAll("metallurgy", "steel");
rmBasicToolsZ("immersiveengineering", "steel");
// copper
rmAll("metallurgy", "copper");
rmToolsZ("embers", "copper");
rmTools("mysticalworld", "copper");
// lead
rmToolsZ("embers", "lead");
// bronze
rmAll("metallurgy", "bronze");
rmAll("ic2", "bronze");
rmToolsZ("embers", "bronze");
// aluminium
rmToolsZ("embers", "aluminum");
// nickel
rmToolsZ("embers", "nickel");
// platinum
rmAll("metallurgy", "platinum");
// electrum
rmAll("metallurgy", "electrum");
rmToolsZ("embers", "electrum");
// osmium
rmArmour("metallurgy", "osmium");
