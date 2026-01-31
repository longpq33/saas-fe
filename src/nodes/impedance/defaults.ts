import type { ImpedanceData } from './types';

export const createDefaultImpedanceData = (): ImpedanceData => ({
  name: 'Impedance',
  fromBusId: '',
  toBusId: '',
  rft_pu: 0.01,
  xft_pu: 0.01,
  in_service: true,
});

