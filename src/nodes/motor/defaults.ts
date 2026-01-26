import type { MotorData } from './types';

export const createDefaultMotorData = (): MotorData => ({
  name: 'Motor',
  busId: '',
  pn_mech_mw: 1,
  cos_phi: 0.85,
  efficiency: 0.9,
  loading_percent: 100,
  in_service: true,
});

