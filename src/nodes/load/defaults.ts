import type { LoadData } from './types';

export const createDefaultLoadData = (): LoadData => ({
  name: 'Load',
  busId: '',
  p_mw: 1,
  q_mvar: 0,
  scaling: 1,
  in_service: true,
  type: '',
  controllable: false,
});

