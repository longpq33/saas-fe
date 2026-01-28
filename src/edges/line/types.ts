export type SwitchSide = 'source' | 'target';

export type SwitchType = 'LBS' | 'CB' | 'DS';

export type SwitchData = {
  enabled: boolean;
  closed: boolean;
  side: SwitchSide;
  type?: SwitchType;
  z_ohm?: number;
};

export type LineEdgeData = {
  name: string;
  // If std_type is empty or null, custom parameters are used
  std_type?: string;
  length_km: number;
  parallel?: number;
  df?: number;
  in_service: boolean;

  // Custom parameters (used if std_type is not provided)
  r_ohm_per_km?: number;
  x_ohm_per_km?: number;
  c_nf_per_km?: number;
  max_i_ka?: number;

  switch?: SwitchData;
};
