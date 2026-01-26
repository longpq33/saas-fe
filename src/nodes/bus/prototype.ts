import type { BusData } from './types';
import { createDefaultBusData } from './defaults';

export type NodePrototype<TType extends string, TData> = {
  type: TType;
  label: string;
  defaultData: () => TData;
};

export const busPrototype: NodePrototype<'bus', BusData> = {
  type: 'bus',
  label: 'Bus',
  defaultData: createDefaultBusData,
};

