import type { XWardData } from './types';

export const createDefaultXWardData = (): XWardData => ({
  name: 'Extended Ward',
  busId: '',
  ps_mw: 0,
  qs_mvar: 0,
  vm_pu: 1.0,
  r_ohm: 0,
  x_ohm: 0,
  in_service: true,
});

