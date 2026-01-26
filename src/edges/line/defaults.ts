import type { LineEdgeData } from './types';

export const LINE_STD_TYPES = [
  'NAYY 4x50 SE',
  'NAYY 4x150 SE',
  'NA2XS2Y 1x240 RM/25 12/20 kV',
  'NA2XS2Y 1x240 RM/25 6/10 kV',
] as const;

export const createDefaultLineEdgeData = (): LineEdgeData => ({
  name: 'Line',
  std_type: LINE_STD_TYPES[0],
  length_km: 1,
  in_service: true,
  switch: {
    enabled: true,
    closed: true,
    side: 'source',
    z_ohm: 0,
  },
});

