import type { AsymmetricSGenData } from './types';

export const createDefaultAsymmetricSGenData = (): AsymmetricSGenData => ({
  name: 'Asymmetric SGen',
  busId: '',
  p_a_mw: 1,
  p_b_mw: 1,
  p_c_mw: 1,
  q_a_mvar: 0,
  q_b_mvar: 0,
  q_c_mvar: 0,
  in_service: true,
});

