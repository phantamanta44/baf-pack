// blockBasalt ~= stoneBasalt
<ore:blockBasalt>.addAll(<ore:stoneBasalt>);
<ore:stoneBasalt>.addAll(<ore:blockBasalt>);

// p:vj basalt has no oredict for some reason
<ore:blockBasalt>.add(<pvj:basalt>);
<ore:stoneBasalt>.add(<pvj:basalt>);

// ic2 basalt has no oredict for some reason
<ore:blockBasalt>.add(<ic2:resource:0>);
<ore:stoneBasalt>.add(<ic2:resource:0>);
