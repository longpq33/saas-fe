import type { HvdcLinkData } from './types';

export const createDefaultHvdcLinkData = (): HvdcLinkData => ({
  name: 'HV DC Link',
  fromBusId: '',
  toBusId: '',
  p_mw: 0,
  loss_percent: 0,
  loss_mw: 0,
  vm_from_pu: 1.0,
  vm_to_pu: 1.0,
  max_p_mw: 100,
  in_service: true,
});

