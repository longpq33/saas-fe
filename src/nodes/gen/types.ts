export type GenGeodata = {
  lat: number;
  long: number;
};

export type GenData = {
  name: string;
  busId: string;
  p_mw: number;
  vm_pu: number;
  min_q_mvar?: number;
  max_q_mvar?: number;
  controllable: boolean;
  in_service: boolean;
  geodata?: GenGeodata;
};


