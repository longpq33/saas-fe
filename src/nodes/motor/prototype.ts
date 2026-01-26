import type { MotorData } from './types';
import { createDefaultMotorData } from './defaults';

export type NodePrototype<TType extends string, TData> = {
  type: TType;
  label: string;
  defaultData: () => TData;
};

export const motorPrototype: NodePrototype<'motor', MotorData> = {
  type: 'motor',
  label: 'Motor',
  defaultData: createDefaultMotorData,
};

