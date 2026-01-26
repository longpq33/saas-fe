import type { LoadData } from './types';
import { createDefaultLoadData } from './defaults';

export type NodePrototype<TType extends string, TData> = {
  type: TType;
  label: string;
  defaultData: () => TData;
};

export const loadPrototype: NodePrototype<'load', LoadData> = {
  type: 'load',
  label: 'Load',
  defaultData: createDefaultLoadData,
};


