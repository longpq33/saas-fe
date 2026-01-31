import type { WardData } from './types';

export const createDefaultWardData = (): WardData => ({
  name: 'Ward',
  busId: '',
  ps_mw: 0,
  qs_mvar: 0,
  vm_pu: 1.0,
  in_service: true,
});

