import type { DcSourceData } from './types';

export const createDefaultDcSourceData = (): DcSourceData => ({
  name: 'Source DC',
  busId: '',
  vm_pu: 1.0,
  p_mw: 0,
  in_service: true,
});



