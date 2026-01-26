import type { ExtGridData } from './types';
import { createDefaultExtGridData } from './defaults';

export type NodePrototype<TType extends string, TData> = {
  type: TType;
  label: string;
  defaultData: () => TData;
};

export const extGridPrototype: NodePrototype<'ext_grid', ExtGridData> = {
  type: 'ext_grid',
  label: 'Ext Grid',
  defaultData: createDefaultExtGridData,
};


