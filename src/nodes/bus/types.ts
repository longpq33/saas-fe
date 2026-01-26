export type BusTypeOption = {
  value: string;
  label: string;
};

export type BusGeodata = {
  lat: number;
  long: number;
};

export type BusData = {
  name: string;
  vn_kv: number;
  type: string;
  min_vm_pu: number;
  max_vm_pu: number;
  geodata: BusGeodata;
};

export const BUS_TYPE_OPTIONS: BusTypeOption[] = [
  { value: "b", label: "b (busbar)" },
  { value: "n", label: "n (node)" },
  { value: "m", label: "m (muff)" },
];
