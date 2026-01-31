import type { DcLoadData } from './types';
import { createDefaultDcLoadData } from './defaults';

export type NodePrototype<TType extends string, TData> = {
  type: TType;
  label: string;
  defaultData: () => TData;
};

export const dcLoadPrototype: NodePrototype<'dc_load', DcLoadData> = {
  type: 'dc_load',
  label: 'Load DC',
  defaultData: createDefaultDcLoadData,
};

