import type { SGenData } from './types';
import { createDefaultSGenData } from './defaults';

export type NodePrototype<TType extends string, TData> = {
  type: TType;
  label: string;
  defaultData: () => TData;
};

export const sgenPrototype: NodePrototype<'sgen', SGenData> = {
  type: 'sgen',
  label: 'SGen',
  defaultData: createDefaultSGenData,
};


