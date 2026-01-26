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
  std_type: string;
  length_km: number;
  in_service: boolean;
  switch?: SwitchData;
};
