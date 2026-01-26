import type { Trafo3WData } from './types';
import { createDefaultTrafo3WData } from './defaults';

export type NodePrototype<TType extends string, TData> = {
  type: TType;
  label: string;
  defaultData: () => TData;
};

export const trafo3wPrototype: NodePrototype<'trafo3w', Trafo3WData> = {
  type: 'trafo3w',
  label: 'Trafo3W',
  defaultData: createDefaultTrafo3WData,
};

