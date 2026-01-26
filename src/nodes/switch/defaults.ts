import type { SwitchData } from './types';

export const createDefaultSwitchData = (): SwitchData => ({
  name: 'Switch',
  busId: '',
  elementId: '',
  elementType: 'line',
  closed: true,
  z_ohm: 0,
  in_service: true,
});

