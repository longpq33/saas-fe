import type { GenData } from './types';
import { createDefaultGenData } from './defaults';

export type NodePrototype<TType extends string, TData> = {
  type: TType;
  label: string;
  defaultData: () => TData;
};

export const genPrototype: NodePrototype<'gen', GenData> = {
  type: 'gen',
  label: 'Gen',
  defaultData: createDefaultGenData,
};


