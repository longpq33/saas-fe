import type { GenData } from './types';

export const createDefaultGenData = (): GenData => ({
  name: 'Gen',
  busId: '',
  p_mw: 1,
  vm_pu: 1.0,
  min_q_mvar: -10,
  max_q_mvar: 10,
  controllable: true,
  in_service: true,
});


