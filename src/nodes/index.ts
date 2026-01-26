import { busPrototype } from './bus/prototype';
import { loadPrototype } from './load/prototype';
import { transformerPrototype } from './transformer/prototype';
import { extGridPrototype } from './ext_grid/prototype';
import { genPrototype } from './gen/prototype';
import { sgenPrototype } from './sgen/prototype';
import { switchPrototype } from './switch/prototype';
import { motorPrototype } from './motor/prototype';
import { shuntPrototype } from './shunt/prototype';
import { storagePrototype } from './storage/prototype';
import { trafo3wPrototype } from './trafo3w/prototype';

export const NODE_PROTOTYPES = [
  busPrototype,
  loadPrototype,
  transformerPrototype,
  extGridPrototype,
  genPrototype,
  sgenPrototype,
  switchPrototype,
  motorPrototype,
  shuntPrototype,
  storagePrototype,
  trafo3wPrototype,
] as const;

export const getPaletteItems = () =>
  NODE_PROTOTYPES.map((p) => ({
    key: p.type,
    label: p.label,
  }));

 