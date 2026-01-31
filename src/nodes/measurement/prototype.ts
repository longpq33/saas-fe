import type { MeasurementData } from './types';
import { createDefaultMeasurementData } from './defaults';

export type NodePrototype<TType extends string, TData> = {
  type: TType;
  label: string;
  defaultData: () => TData;
};

export const measurementPrototype: NodePrototype<'measurement', MeasurementData> = {
  type: 'measurement',
  label: 'Measurement',
  defaultData: createDefaultMeasurementData,
};

