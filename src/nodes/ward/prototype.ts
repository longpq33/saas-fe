import type { WardData } from './types';
import { createDefaultWardData } from './defaults';

export type NodePrototype<TType extends string, TData> = {
  type: TType;
  label: string;
  defaultData: () => TData;
};

export const wardPrototype: NodePrototype<'ward', WardData> = {
  type: 'ward',
  label: 'Ward',
  defaultData: createDefaultWardData,
};

