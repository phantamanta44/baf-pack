#!/usr/bin/env python

import json
import os
from PIL import Image, ImageColor, ImageOps

adv_gens_builtins = set(['advalloy', 'bronze', 'enderium', 'gold', 'iron', 'manyullyn', 'steel', 'vibrant'])
pil_col_black = (0, 0, 0)

class ImageTemplate:
  def __init__(self, img_name, bg_name=None):
    img_main = Image.open(img_name)
    self.img_fg = img_main.convert('L')
    self.img_fg_mask = img_main.split()[-1]
    self.img_bg = Image.open(bg_name) if bg_name is not None else None
    
  def generate(self, colour):
    pil_col = ImageColor.getrgb(f'#{colour}')
    layer_fg = ImageOps.colorize(self.img_fg, pil_col_black, pil_col)
    if self.img_bg is None:
      layer_fg.putalpha(self.img_fg_mask)
      return layer_fg
    else:
      layer_bg = self.img_bg.copy()
      layer_bg.paste(layer_fg, (0, 0), self.img_fg_mask)
      return layer_bg

tmp_blade = ImageTemplate('blade.png')
tmp_kit = ImageTemplate('kit_fg.png', 'kit_bg.png')
tmp_main = ImageTemplate('main_fg.png', 'main_bg.png')
tmp_rotor = ImageTemplate('rotor.png')
tmp_top = ImageTemplate('top_fg.png', 'top_bg.png')

def load_turbine_defs():
  with open('turbine_defs.json') as turbine_defs_f:
    return json.load(turbine_defs_f)
turbine_defs = load_turbine_defs()

for key, turbine_def in turbine_defs.items():
  key_lower = key.lower()
  key_norm = key_lower.replace('_', '')
  if key_norm in adv_gens_builtins:
    print(f'Skipping built-in material: {key}')
  else:
    print(f'Processing material: {key}')
    # gen textures
    os.makedirs(f'out/textures/items/turbine/{key_norm}', exist_ok=True)
    os.makedirs(f'out/textures/blocks/turbine/{key_norm}', exist_ok=True)
    turbine_col = turbine_def['colour']
    tmp_blade.generate(turbine_col).save(f'out/textures/items/turbine/{key_norm}/blade.png')
    tmp_kit.generate(turbine_col).save(f'out/textures/items/turbine/{key_norm}/kit.png')
    tmp_rotor.generate(turbine_col).save(f'out/textures/items/turbine/{key_norm}/rotor.png')
    tmp_main.generate(turbine_col).save(f'out/textures/blocks/turbine/{key_norm}/main.png')
    tmp_top.generate(turbine_col).save(f'out/textures/blocks/turbine/{key_norm}/top.png')
    
    # gen turbine block state mapping
    os.makedirs('out/blockstates', exist_ok=True)
    model_turbine_block = {
      'forge_marker': 1,
      'defaults': {
        'textures': {
          'top': f'advgenerators:blocks/turbine/{key_norm}/top',
          'bottom': f'advgenerators:blocks/turbine/{key_norm}/main',
          'side': f'advgenerators:blocks/turbine/{key_norm}/main'
        },
        'model': 'advgenerators:sided_multiblock.extended'
      },
      'variants': {
        'normal': [
          {}
        ],
        'inventory': {
          'transform': 'forge:default-block'
        }
      }
    }
    with open(f'out/blockstates/turbine_{key_lower}.json', 'w') as model_block_f:
      json.dump(model_turbine_block, model_block_f)

    # gen item models
    os.makedirs('out/models/item', exist_ok=True)
    def write_item_model(item_type):
      model_item = {
        'parent': 'item/generated',
        'textures': {
          'layer0': f'advgenerators:items/turbine/{key_norm}/{item_type}'
        }
      }
      with open(f'out/models/item/turbine_{item_type}_{key_lower}.json', 'w') as model_item_f:
        json.dump(model_item, model_item_f)
    write_item_model('blade')
    write_item_model('kit')
    write_item_model('rotor')
