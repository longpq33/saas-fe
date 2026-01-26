import type { ShuntData } from './types';
import { createDefaultShuntData } from './defaults';

export type NodePrototype<TType extends string, TData> = {
  type: TType;
  label: string;
  defaultData: () => TData;
};

export const shuntPrototype: NodePrototype<'shunt', ShuntData> = {
  type: 'shunt',
  label: 'Shunt',
  defaultData: createDefaultShuntData,
};

