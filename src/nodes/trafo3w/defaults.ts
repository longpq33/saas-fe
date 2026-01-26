import type { Trafo3WData } from './types';

export const TRAFO3W_STD_TYPES = [
  '63/25/38 MVA 110/20/10 kV',
  '100/40/40 MVA 110/20/10 kV',
] as const;

export const createDefaultTrafo3WData = (): Trafo3WData => ({
  name: 'Trafo3W',
  hvBusId: '',
  mvBusId: '',
  lvBusId: '',
  std_type: TRAFO3W_STD_TYPES[0],
  in_service: true,
});

