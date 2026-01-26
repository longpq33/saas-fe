import type { ShuntData } from './types';

export const createDefaultShuntData = (): ShuntData => ({
  name: 'Shunt',
  busId: '',
  p_mw: 0,
  q_mvar: 0,
  vn_kv: 22,
  step: 1,
  max_step: 1,
  in_service: true,
});

