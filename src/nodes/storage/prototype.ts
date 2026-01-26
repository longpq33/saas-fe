import type { StorageData } from './types';
import { createDefaultStorageData } from './defaults';

export type NodePrototype<TType extends string, TData> = {
  type: TType;
  label: string;
  defaultData: () => TData;
};

export const storagePrototype: NodePrototype<'storage', StorageData> = {
  type: 'storage',
  label: 'Storage',
  defaultData: createDefaultStorageData,
};

