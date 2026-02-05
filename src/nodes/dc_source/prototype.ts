import type { DcSourceData } from './types';
import { createDefaultDcSourceData } from './defaults';

export type NodePrototype<TType extends string, TData> = {
  type: TType;
  label: string;
  defaultData: () => TData;
};

export const dcSourcePrototype: NodePrototype<'dc_source', DcSourceData> = {
  type: 'dc_source',
  label: 'Source DC',
  defaultData: createDefaultDcSourceData,
};



