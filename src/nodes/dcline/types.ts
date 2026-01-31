export type DcLineData = {
  name: string;
  fromBusId: string;
  toBusId: string;
  p_mw: number;
  loss_percent: number;
  loss_mw: number;
  vm_from_pu: number;
  vm_to_pu: number;
  max_p_mw: number;
  min_q_from_mvar: number;
  min_q_to_mvar: number;
  max_q_from_mvar: number;
  max_q_to_mvar: number;
  in_service: boolean;
};

