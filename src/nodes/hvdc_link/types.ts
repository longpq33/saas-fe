export type HvdcLinkData = {
  name: string;
  fromBusId: string;
  toBusId: string;
  p_mw: number;
  loss_percent: number;
  loss_mw: number;
  vm_from_pu: number;
  vm_to_pu: number;
  max_p_mw: number;
  in_service: boolean;
};

