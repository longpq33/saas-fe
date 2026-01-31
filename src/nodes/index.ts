import { busPrototype } from './bus/prototype';
import { loadPrototype } from './load/prototype';
import { linePrototype } from './line/prototype';
import { transformerPrototype } from './transformer/prototype';
import { extGridPrototype } from './ext_grid/prototype';
import { genPrototype } from './gen/prototype';
import { sgenPrototype } from './sgen/prototype';
import { switchPrototype } from './switch/prototype';
import { motorPrototype } from './motor/prototype';
import { shuntPrototype } from './shunt/prototype';
import { storagePrototype } from './storage/prototype';
import { trafo3wPrototype } from './trafo3w/prototype';
import { dcBusPrototype } from './dc_bus/prototype';
import { dcLinePrototype } from './dcline/prototype';
import { dcLoadPrototype } from './dc_load/prototype';
import { dcSourcePrototype } from './dc_source/prototype';
import { asymmetricLoadPrototype } from './asymmetric_load/prototype';
import { asymmetricSGenPrototype } from './asymmetric_sgen/prototype';
import { impedancePrototype } from './impedance/prototype';
import { wardPrototype } from './ward/prototype';
import { xwardPrototype } from './xward/prototype';
import { measurementPrototype } from './measurement/prototype';
import { hvdcLinkPrototype } from './hvdc_link/prototype';

export const NODE_PROTOTYPES = [
  busPrototype,
  linePrototype,
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
  dcBusPrototype,
  dcLinePrototype,
  dcLoadPrototype,
  dcSourcePrototype,
  asymmetricLoadPrototype,
  asymmetricSGenPrototype,
  impedancePrototype,
  wardPrototype,
  xwardPrototype,
  measurementPrototype,
  hvdcLinkPrototype,
] as const;

export type PaletteItem = {
  key: string;
  label: string;
  category: string;
};

export type PaletteGroup = {
  key: string;
  label: string;
  items: PaletteItem[];
};

const CATEGORY_NETWORK = 'network';
const CATEGORY_GENERATORS = 'generators';
const CATEGORY_LOADS = 'loads';
const CATEGORY_TRANSFORMERS = 'transformers';
const CATEGORY_SHUNTS = 'shunts';
const CATEGORY_STORAGE = 'storage';
const CATEGORY_DC = 'dc';
const CATEGORY_SPECIAL = 'special';

const getCategoryForNode = (nodeType: string): string => {
  const categoryMap: Record<string, string> = {
    bus: CATEGORY_NETWORK,
    line: CATEGORY_NETWORK,
    switch: CATEGORY_NETWORK,
    gen: CATEGORY_GENERATORS,
    sgen: CATEGORY_GENERATORS,
    ext_grid: CATEGORY_GENERATORS,
    load: CATEGORY_LOADS,
    motor: CATEGORY_LOADS,
    transformer: CATEGORY_TRANSFORMERS,
    trafo3w: CATEGORY_TRANSFORMERS,
    shunt: CATEGORY_SHUNTS,
    storage: CATEGORY_STORAGE,
    dc_bus: CATEGORY_DC,
    dcline: CATEGORY_DC,
    dc_load: CATEGORY_DC,
    dc_source: CATEGORY_DC,
    asymmetric_load: CATEGORY_SPECIAL,
    asymmetric_sgen: CATEGORY_SPECIAL,
    impedance: CATEGORY_SPECIAL,
    ward: CATEGORY_SPECIAL,
    xward: CATEGORY_SPECIAL,
    measurement: CATEGORY_SPECIAL,
    hvdc_link: CATEGORY_SPECIAL,
  };
  return categoryMap[nodeType] || CATEGORY_NETWORK;
};

export const getPaletteItems = (): PaletteItem[] =>
  NODE_PROTOTYPES.map((p) => ({
    key: p.type,
    label: p.label,
    category: getCategoryForNode(p.type),
  }));

export const getPaletteGroups = (): PaletteGroup[] => {
  const items = getPaletteItems();
  const groups: Record<string, PaletteItem[]> = {};

  items.forEach((item) => {
    if (!groups[item.category]) {
      groups[item.category] = [];
    }
    groups[item.category].push(item);
  });

  const groupDefinitions: Array<{ key: string; label: string }> = [
    { key: CATEGORY_NETWORK, label: 'Network Elements' },
    { key: CATEGORY_GENERATORS, label: 'Generators' },
    { key: CATEGORY_LOADS, label: 'Loads' },
    { key: CATEGORY_TRANSFORMERS, label: 'Transformers' },
    { key: CATEGORY_SHUNTS, label: 'Shunts' },
    { key: CATEGORY_STORAGE, label: 'Storage' },
    { key: CATEGORY_DC, label: 'DC' },
    { key: CATEGORY_SPECIAL, label: 'Special' },
  ];

  return groupDefinitions
    .filter((group) => groups[group.key] && groups[group.key].length > 0)
    .map((group) => ({
      key: group.key,
      label: group.label,
      items: groups[group.key],
    }));
};

 