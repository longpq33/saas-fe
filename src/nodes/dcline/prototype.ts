import type { DcLineData } from './types';
import { createDefaultDcLineData } from './defaults';

export type NodePrototype<TType extends string, TData> = {
  type: TType;
  label: string;
  defaultData: () => TData;
};

export const dcLinePrototype: NodePrototype<'dcline', DcLineData> = {
  type: 'dcline',
  label: 'Line DC',
  defaultData: createDefaultDcLineData,
};



