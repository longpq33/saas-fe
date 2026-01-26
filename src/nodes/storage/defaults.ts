import type { StorageData } from './types';

export const createDefaultStorageData = (): StorageData => ({
  name: 'Storage',
  busId: '',
  p_mw: 0,
  q_mvar: 0,
  max_e_mwh: 10,
  min_e_mwh: 0,
  max_p_mw: 5,
  min_p_mw: -5,
  soc_percent: 50,
  in_service: true,
});

