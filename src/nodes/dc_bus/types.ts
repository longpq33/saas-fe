export type DcBusTypeOption = {
  value: string;
  label: string;
};

export type DcBusGeodata = {
  lat: number;
  long: number;
};

export type DcBusData = {
  name: string;
  vn_kv: number;
  type: string;
  min_vm_pu: number;
  max_vm_pu: number;
  geodata: DcBusGeodata;
};

export const DC_BUS_TYPE_OPTIONS: DcBusTypeOption[] = [
  { value: "b", label: "b (busbar)" },
  { value: "n", label: "n (node)" },
  { value: "m", label: "m (muff)" },
];

