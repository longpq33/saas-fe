import type { AsymmetricSGenData } from './types';
import { createDefaultAsymmetricSGenData } from './defaults';

export type NodePrototype<TType extends string, TData> = {
  type: TType;
  label: string;
  defaultData: () => TData;
};

export const asymmetricSGenPrototype: NodePrototype<'asymmetric_sgen', AsymmetricSGenData> = {
  type: 'asymmetric_sgen',
  label: 'Asymmetric SGen',
  defaultData: createDefaultAsymmetricSGenData,
};

