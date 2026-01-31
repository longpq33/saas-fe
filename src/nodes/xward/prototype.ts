import type { XWardData } from './types';
import { createDefaultXWardData } from './defaults';

export type NodePrototype<TType extends string, TData> = {
  type: TType;
  label: string;
  defaultData: () => TData;
};

export const xwardPrototype: NodePrototype<'xward', XWardData> = {
  type: 'xward',
  label: 'Extended Ward',
  defaultData: createDefaultXWardData,
};

