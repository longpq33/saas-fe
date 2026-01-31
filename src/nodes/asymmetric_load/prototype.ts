import type { AsymmetricLoadData } from './types';
import { createDefaultAsymmetricLoadData } from './defaults';

export type NodePrototype<TType extends string, TData> = {
  type: TType;
  label: string;
  defaultData: () => TData;
};

export const asymmetricLoadPrototype: NodePrototype<'asymmetric_load', AsymmetricLoadData> = {
  type: 'asymmetric_load',
  label: 'Asymmetric Load',
  defaultData: createDefaultAsymmetricLoadData,
};

