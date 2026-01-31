import type { DcBusData } from './types';

export const createDefaultDcBusData = (): DcBusData => ({
  name: 'Bus DC',
  vn_kv: 22,
  type: 'b',
  min_vm_pu: 0.9,
  max_vm_pu: 1.1,
  geodata: {
    lat: 0,
    long: 0,
  },
});

