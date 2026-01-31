import type { HvdcLinkData } from './types';
import { createDefaultHvdcLinkData } from './defaults';

export type NodePrototype<TType extends string, TData> = {
  type: TType;
  label: string;
  defaultData: () => TData;
};

export const hvdcLinkPrototype: NodePrototype<'hvdc_link', HvdcLinkData> = {
  type: 'hvdc_link',
  label: 'HV DC Link',
  defaultData: createDefaultHvdcLinkData,
};

