export type MeasurementData = {
  name: string;
  element: string;
  element_type: string;
  measurement_type: string;
  side?: string;
  in_service: boolean;
};

export const MEASUREMENT_ELEMENT_TYPES = [
  { value: 'bus', label: 'bus' },
  { value: 'line', label: 'line' },
  { value: 'trafo', label: 'trafo' },
  { value: 'trafo3w', label: 'trafo3w' },
];

export const MEASUREMENT_TYPES = [
  { value: 'v', label: 'v (voltage)' },
  { value: 'i', label: 'i (current)' },
  { value: 'p', label: 'p (active power)' },
  { value: 'q', label: 'q (reactive power)' },
];

export const MEASUREMENT_SIDES = [
  { value: 'from', label: 'from' },
  { value: 'to', label: 'to' },
  { value: 'hv', label: 'hv' },
  { value: 'lv', label: 'lv' },
  { value: 'mv', label: 'mv' },
];

