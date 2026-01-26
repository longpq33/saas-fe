import type { BusData } from './types';

export const createDefaultBusData = (): BusData => ({
  name: 'Bus',
  vn_kv: 22,
  type: 'b',
  min_vm_pu: 0.9,
  max_vm_pu: 1.1,
  geodata: {
    lat: 0,
    long: 0,
  },
});

