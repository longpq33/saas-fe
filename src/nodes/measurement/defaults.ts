import type { MeasurementData } from './types';

export const createDefaultMeasurementData = (): MeasurementData => ({
  name: 'Measurement',
  element: '',
  element_type: 'bus',
  measurement_type: 'v',
  side: undefined,
  in_service: true,
});

