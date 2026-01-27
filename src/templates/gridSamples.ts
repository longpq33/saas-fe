import type { Edge, Node } from 'reactflow';

export type GridSample = {
  key: string;
  name: string;
  description?: string;
  diagram: {
    nodes: Node[];
    edges: Edge[];
  };
};

const bus = (id: string, x: number, y: number, data?: Record<string, unknown>): Node => ({
  id,
  type: 'bus',
  position: { x, y },
  data: {
    name: id,
    vn_kv: 22,
    min_vm_pu: 0.95,
    max_vm_pu: 1.05,
    in_service: true,
    ...(data ?? {}),
  },
});

const extGrid = (id: string, x: number, y: number, busId: string, data?: Record<string, unknown>): Node => ({
  id,
  type: 'ext_grid',
  position: { x, y },
  data: {
    name: id,
    busId,
    vm_pu: 1.02,
    va_degree: 0,
    in_service: true,
    ...(data ?? {}),
  },
});

const load = (id: string, x: number, y: number, busId: string, p_mw: number, q_mvar: number, data?: Record<string, unknown>): Node => ({
  id,
  type: 'load',
  position: { x, y },
  data: {
    name: id,
    busId,
    p_mw,
    q_mvar,
    scaling: 1.0,
    in_service: true,
    ...(data ?? {}),
  },
});

const gen = (
  id: string,
  x: number,
  y: number,
  busId: string,
  p_mw: number,
  vm_pu: number,
  min_q_mvar: number,
  max_q_mvar: number,
  data?: Record<string, unknown>,
): Node => ({
  id,
  type: 'gen',
  position: { x, y },
  data: {
    name: id,
    busId,
    p_mw,
    vm_pu,
    min_q_mvar,
    max_q_mvar,
    controllable: true,
    in_service: true,
    ...(data ?? {}),
  },
});

const line = (id: string, source: string, target: string, data?: Record<string, unknown>): Edge => ({
  id,
  source,
  target,
  data: {
    std_type: 'NAYY 4x50 SE',
    length_km: 1.0,
    in_service: true,
    ...(data ?? {}),
  },
});

export const GRID_SAMPLES: GridSample[] = [
  {
    key: 'simple_2bus_1line_1load',
    name: '1 nguồn - 2 bus - 1 line - 1 tải',
    description: 'Case cơ bản 22kV, dùng để test end-to-end.',
    diagram: {
      nodes: [
        bus('bus1', 100, 120, { name: 'Bus 22kV - Source', vn_kv: 22 }),
        bus('bus2', 360, 120, { name: 'Bus 22kV - Load', vn_kv: 22 }),
        extGrid('eg1', 100, 20, 'bus1', { name: 'Grid' }),
        load('load1', 360, 20, 'bus2', 3.0, 1.2, { name: 'Load' }),
      ],
      edges: [line('line1', 'bus1', 'bus2', { length_km: 2.0 })],
    },
  },
  {
    key: 'radial_4bus_3line_3load',
    name: 'Feeder hình tia 22kV (4 bus)',
    description: 'Radial feeder, 3 tải dọc tuyến.',
    diagram: {
      nodes: [
        bus('bus1', 80, 160, { name: 'Feeder Head', vn_kv: 22 }),
        bus('bus2', 260, 160, { name: 'Branch 1', vn_kv: 22 }),
        bus('bus3', 440, 160, { name: 'Branch 2', vn_kv: 22 }),
        bus('bus4', 620, 160, { name: 'End', vn_kv: 22 }),
        extGrid('eg1', 80, 60, 'bus1', { name: 'Grid' }),
        load('load2', 260, 60, 'bus2', 1.5, 0.6, { name: 'Load@bus2' }),
        load('load3', 440, 60, 'bus3', 1.2, 0.5, { name: 'Load@bus3' }),
        load('load4', 620, 60, 'bus4', 1.0, 0.4, { name: 'Load@bus4' }),
      ],
      edges: [
        line('line12', 'bus1', 'bus2', { length_km: 1.5 }),
        line('line23', 'bus2', 'bus3', { length_km: 2.0 }),
        line('line34', 'bus3', 'bus4', { length_km: 2.5 }),
      ],
    },
  },
  {
    key: 'pv_gen_q_limits',
    name: 'PV generator + test Q limit',
    description: 'Có gen PV, có min/max Q để trigger Q-limit violation.',
    diagram: {
      nodes: [
        bus('bus1', 80, 160, { name: 'Grid Bus', vn_kv: 22 }),
        bus('bus2', 300, 160, { name: 'Gen Bus', vn_kv: 22 }),
        bus('bus3', 520, 160, { name: 'Load Bus', vn_kv: 22, min_vm_pu: 0.95, max_vm_pu: 1.05 }),
        extGrid('eg1', 80, 60, 'bus1', { name: 'Grid' }),
        gen('gen1', 300, 60, 'bus2', 2.0, 1.04, -0.5, 0.5, { name: 'Gen PV' }),
        load('load1', 520, 60, 'bus3', 3.0, 1.8, { name: 'Load' }),
      ],
      edges: [
        line('line12', 'bus1', 'bus2', { length_km: 1.0 }),
        line('line23', 'bus2', 'bus3', { length_km: 3.0 }),
      ],
    },
  },
  {
    key: 'islanding_should_fail',
    name: 'Islanding (phải fail) - 2 island chỉ 1 island có ext_grid',
    description: 'Dùng để test validation islanding (FATAL).',
    diagram: {
      nodes: [
        bus('bus1', 80, 160, { name: 'Island A - bus1', vn_kv: 22 }),
        bus('bus2', 260, 160, { name: 'Island A - bus2', vn_kv: 22 }),
        bus('bus3', 520, 160, { name: 'Island B - bus3', vn_kv: 22 }),
        bus('bus4', 700, 160, { name: 'Island B - bus4', vn_kv: 22 }),
        extGrid('eg1', 80, 60, 'bus1', { name: 'Grid@IslandA' }),
        load('loadB', 700, 60, 'bus4', 1.0, 0.4, { name: 'Load on island B' }),
      ],
      edges: [
        line('line12', 'bus1', 'bus2', { length_km: 1.0 }),
        line('line34', 'bus3', 'bus4', { length_km: 1.0 }),
      ],
    },
  },
];

