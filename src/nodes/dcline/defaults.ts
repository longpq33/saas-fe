import type { DcLineData } from './types';

export const createDefaultDcLineData = (): DcLineData => ({
  name: 'Line DC',
  fromBusId: '',
  toBusId: '',
  p_mw: 0,
  loss_percent: 0,
  loss_mw: 0,
  vm_from_pu: 1.0,
  vm_to_pu: 1.0,
  max_p_mw: 100,
  min_q_from_mvar: -100,
  min_q_to_mvar: -100,
  max_q_from_mvar: 100,
  max_q_to_mvar: 100,
  in_service: true,
});



