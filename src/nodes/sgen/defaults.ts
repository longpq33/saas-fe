import type { SGenData } from './types';

export const createDefaultSGenData = (): SGenData => ({
  name: 'SGen',
  busId: '',
  p_mw: 1,
  q_mvar: 0,
  controllable: true,
  in_service: true,
});


