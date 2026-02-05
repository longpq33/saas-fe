export type SwitchElementType = 'line' | 'trafo' | 'bus';

export type SwitchType = 'LBS' | 'CB' | 'DS';

export type SwitchGeodata = {
  lat: number;
  long: number;
};

export type SwitchData = {
  name: string;
  busId: string;
  elementId: string;
  elementType: SwitchElementType;
  closed: boolean;
  type?: SwitchType;
  z_ohm?: number;
  in_service: boolean;
  geodata?: SwitchGeodata;
};

