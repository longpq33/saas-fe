import type { SwitchData } from './types';
import { createDefaultSwitchData } from './defaults';

export type NodePrototype<TType extends string, TData> = {
  type: TType;
  label: string;
  defaultData: () => TData;
};

export const switchPrototype: NodePrototype<'switch', SwitchData> = {
  type: 'switch',
  label: 'Switch',
  defaultData: createDefaultSwitchData,
};

