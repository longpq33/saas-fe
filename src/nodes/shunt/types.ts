export type ShuntData = {
  name: string;
  busId: string;
  p_mw: number;
  q_mvar: number;
  vn_kv: number;
  step?: number;
  max_step?: number;
  in_service: boolean;
};

