import type { ImpedanceData } from './types';
import { createDefaultImpedanceData } from './defaults';

export type NodePrototype<TType extends string, TData> = {
  type: TType;
  label: string;
  defaultData: () => TData;
};

export const impedancePrototype: NodePrototype<'impedance', ImpedanceData> = {
  type: 'impedance',
  label: 'Impedance',
  defaultData: createDefaultImpedanceData,
};

