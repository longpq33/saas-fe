import type { TransformerData } from './types';
import { createDefaultTransformerData } from './defaults';

export type NodePrototype<TType extends string, TData> = {
  type: TType;
  label: string;
  defaultData: () => TData;
};

export const transformerPrototype: NodePrototype<'transformer', TransformerData> = {
  type: 'transformer',
  label: 'Transformer',
  defaultData: createDefaultTransformerData,
};


