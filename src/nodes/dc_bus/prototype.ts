import type { DcBusData } from './types';
import { createDefaultDcBusData } from './defaults';

export type NodePrototype<TType extends string, TData> = {
  type: TType;
  label: string;
  defaultData: () => TData;
};

export const dcBusPrototype: NodePrototype<'dc_bus', DcBusData> = {
  type: 'dc_bus',
  label: 'Bus DC',
  defaultData: createDefaultDcBusData,
};

