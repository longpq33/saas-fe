import type { LineData } from './types';

export const createDefaultLineData = (): LineData => ({
  name: 'Line',
  fromBusId: '',
  toBusId: '',
  std_type: 'NAYY 4x50 SE',
  length_km: 1.0,
  parallel: 1,
  df: 1,
  in_service: true,
  r_ohm_per_km: 0.642,
  x_ohm_per_km: 0.083,
  c_nf_per_km: 210,
  max_i_ka: 0.2,
  switch: {
    enabled: true,
    closed: true,
    side: 'source',
    z_ohm: 0,
  },
  geodata: undefined, // Optional: array of {lat, long} points
});

