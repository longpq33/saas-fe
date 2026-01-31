import type { DcLoadData } from './types';

export const createDefaultDcLoadData = (): DcLoadData => ({
  name: 'Load DC',
  busId: '',
  p_mw: 1,
  in_service: true,
});

