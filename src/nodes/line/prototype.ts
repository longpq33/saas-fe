import type { LineData } from './types';
import { createDefaultLineData } from './defaults';

export type NodePrototype<TType extends string, TData> = {
  type: TType;
  label: string;
  defaultData: () => TData;
};

export const linePrototype: NodePrototype<'line', LineData> = {
  type: 'line',
  label: 'Line',
  defaultData: createDefaultLineData,
};

