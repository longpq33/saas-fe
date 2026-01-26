import type { TransformerData } from './types';

export const TRANSFORMER_STD_TYPES = [
  '0.25 MVA 10/0.4 kV',
  '0.4 MVA 10/0.4 kV',
  '0.63 MVA 10/0.4 kV',
  '1 MVA 10/0.4 kV',
  '2.5 MVA 20/0.4 kV',
  '10 MVA 110/20 kV',
] as const;

export const createDefaultTransformerData = (): TransformerData => ({
  name: 'Transformer',
  std_type: TRANSFORMER_STD_TYPES[0],
  in_service: true,
  hvBusId: '',
  lvBusId: '',
});


