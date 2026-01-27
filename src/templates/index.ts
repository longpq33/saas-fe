import type { Node, Edge } from 'reactflow';

export interface DiagramTemplate {
  id: string;
  name: string;
  category: string;
  description: string;
  data: {
    nodes: Node[];
    edges: Edge[];
  };
}

export const diagramTemplates: DiagramTemplate[] = [
  {
    id: 'blank',
    name: 'Blank Diagram',
    category: 'Basic',
    description: 'Start with an empty canvas.',
    data: {
      nodes: [],
      edges: [],
    },
  },
  {
    id: 'simple-example',
    name: 'Simple Example',
    category: 'Basic',
    description: 'A simple two-bus system with a load and a grid connection.',
    data: {
      nodes: [
        {
          id: 'bus-1',
          type: 'bus',
          position: { x: 100, y: 150 },
          data: { name: 'Bus 1', vn_kv: 22, min_vm_pu: 0.95, max_vm_pu: 1.05, in_service: true },
        },
        {
          id: 'bus-2',
          type: 'bus',
          position: { x: 400, y: 150 },
          data: { name: 'Bus 2', vn_kv: 22, min_vm_pu: 0.95, max_vm_pu: 1.05, in_service: true },
        },
        {
          id: 'ext-grid-1',
          type: 'ext_grid',
          position: { x: 100, y: 50 },
          data: { name: 'Grid', busId: 'bus-1', vm_pu: 1.02, va_degree: 0, in_service: true },
        },
        {
          id: 'load-1',
          type: 'load',
          position: { x: 400, y: 250 },
          data: { name: 'Load', busId: 'bus-2', p_mw: 10, q_mvar: 4, scaling: 1.0, in_service: true },
        },
      ],
      edges: [
        {
          id: 'line-1-2',
          source: 'bus-1',
          target: 'bus-2',
          data: { name: 'Line', length_km: 10, std_type: 'NAYY 4x50 SE', in_service: true },
        },
      ],
    },
  },
  {
    id: 'real-2bus-1line-1load',
    name: '1 nguồn - 2 bus - 1 line - 1 tải (22kV)',
    category: 'Power Grid (Samples)',
    description: 'Case cơ bản để test end-to-end với backend (std_type/length_km/vn_kv đầy đủ).',
    data: {
      nodes: [
        {
          id: 'bus1',
          type: 'bus',
          position: { x: 100, y: 120 },
          data: { name: 'Bus 22kV - Source', vn_kv: 22, min_vm_pu: 0.95, max_vm_pu: 1.05, in_service: true },
        },
        {
          id: 'bus2',
          type: 'bus',
          position: { x: 360, y: 120 },
          data: { name: 'Bus 22kV - Load', vn_kv: 22, min_vm_pu: 0.95, max_vm_pu: 1.05, in_service: true },
        },
        {
          id: 'eg1',
          type: 'ext_grid',
          position: { x: 100, y: 20 },
          data: { name: 'Grid', busId: 'bus1', vm_pu: 1.02, va_degree: 0, in_service: true },
        },
        {
          id: 'load1',
          type: 'load',
          position: { x: 360, y: 20 },
          data: { name: 'Load', busId: 'bus2', p_mw: 3.0, q_mvar: 1.2, scaling: 1.0, in_service: true },
        },
      ],
      edges: [
        {
          id: 'line1',
          source: 'bus1',
          target: 'bus2',
          data: { std_type: 'NAYY 4x50 SE', length_km: 2.0, in_service: true },
        },
      ],
    },
  },
  {
    id: 'real-radial-4bus',
    name: 'Feeder hình tia 22kV (4 bus)',
    category: 'Power Grid (Samples)',
    description: 'Radial feeder 22kV gồm 4 bus, 3 line, 3 tải.',
    data: {
      nodes: [
        {
          id: 'bus1',
          type: 'bus',
          position: { x: 80, y: 160 },
          data: { name: 'Feeder Head', vn_kv: 22, min_vm_pu: 0.95, max_vm_pu: 1.05, in_service: true },
        },
        {
          id: 'bus2',
          type: 'bus',
          position: { x: 260, y: 160 },
          data: { name: 'Branch 1', vn_kv: 22, min_vm_pu: 0.95, max_vm_pu: 1.05, in_service: true },
        },
        {
          id: 'bus3',
          type: 'bus',
          position: { x: 440, y: 160 },
          data: { name: 'Branch 2', vn_kv: 22, min_vm_pu: 0.95, max_vm_pu: 1.05, in_service: true },
        },
        {
          id: 'bus4',
          type: 'bus',
          position: { x: 620, y: 160 },
          data: { name: 'End', vn_kv: 22, min_vm_pu: 0.95, max_vm_pu: 1.05, in_service: true },
        },
        {
          id: 'eg1',
          type: 'ext_grid',
          position: { x: 80, y: 60 },
          data: { name: 'Grid', busId: 'bus1', vm_pu: 1.02, va_degree: 0, in_service: true },
        },
        {
          id: 'load2',
          type: 'load',
          position: { x: 260, y: 60 },
          data: { name: 'Load@bus2', busId: 'bus2', p_mw: 1.5, q_mvar: 0.6, scaling: 1.0, in_service: true },
        },
        {
          id: 'load3',
          type: 'load',
          position: { x: 440, y: 60 },
          data: { name: 'Load@bus3', busId: 'bus3', p_mw: 1.2, q_mvar: 0.5, scaling: 1.0, in_service: true },
        },
        {
          id: 'load4',
          type: 'load',
          position: { x: 620, y: 60 },
          data: { name: 'Load@bus4', busId: 'bus4', p_mw: 1.0, q_mvar: 0.4, scaling: 1.0, in_service: true },
        },
      ],
      edges: [
        {
          id: 'line12',
          source: 'bus1',
          target: 'bus2',
          data: { std_type: 'NAYY 4x50 SE', length_km: 1.5, in_service: true },
        },
        {
          id: 'line23',
          source: 'bus2',
          target: 'bus3',
          data: { std_type: 'NAYY 4x50 SE', length_km: 2.0, in_service: true },
        },
        {
          id: 'line34',
          source: 'bus3',
          target: 'bus4',
          data: { std_type: 'NAYY 4x50 SE', length_km: 2.5, in_service: true },
        },
      ],
    },
  },
  {
    id: 'real-pv-gen-q-limits',
    name: 'PV generator + test Q limit',
    category: 'Power Grid (Samples)',
    description: 'Có gen PV và min/max Q để trigger Q-limit violation (warning + element_status fail).',
    data: {
      nodes: [
        {
          id: 'bus1',
          type: 'bus',
          position: { x: 80, y: 160 },
          data: { name: 'Grid Bus', vn_kv: 22, min_vm_pu: 0.95, max_vm_pu: 1.05, in_service: true },
        },
        {
          id: 'bus2',
          type: 'bus',
          position: { x: 300, y: 160 },
          data: { name: 'Gen Bus', vn_kv: 22, min_vm_pu: 0.95, max_vm_pu: 1.05, in_service: true },
        },
        {
          id: 'bus3',
          type: 'bus',
          position: { x: 520, y: 160 },
          data: { name: 'Load Bus', vn_kv: 22, min_vm_pu: 0.95, max_vm_pu: 1.05, in_service: true },
        },
        {
          id: 'eg1',
          type: 'ext_grid',
          position: { x: 80, y: 60 },
          data: { name: 'Grid', busId: 'bus1', vm_pu: 1.02, va_degree: 0, in_service: true },
        },
        {
          id: 'gen1',
          type: 'gen',
          position: { x: 300, y: 60 },
          data: { name: 'Gen PV', busId: 'bus2', p_mw: 2.0, vm_pu: 1.04, min_q_mvar: -0.5, max_q_mvar: 0.5, controllable: true, in_service: true },
        },
        {
          id: 'load1',
          type: 'load',
          position: { x: 520, y: 60 },
          data: { name: 'Load', busId: 'bus3', p_mw: 3.0, q_mvar: 1.8, scaling: 1.0, in_service: true },
        },
      ],
      edges: [
        {
          id: 'line12',
          source: 'bus1',
          target: 'bus2',
          data: { std_type: 'NAYY 4x50 SE', length_km: 1.0, in_service: true },
        },
        {
          id: 'line23',
          source: 'bus2',
          target: 'bus3',
          data: { std_type: 'NAYY 4x50 SE', length_km: 3.0, in_service: true },
        },
      ],
    },
  },
  {
    id: 'real-islanding-should-fail',
    name: 'Islanding (phải fail) - 2 island chỉ 1 island có ext_grid',
    category: 'Power Grid (Samples)',
    description: 'Dùng để test validation islanding (FATAL).',
    data: {
      nodes: [
        {
          id: 'bus1',
          type: 'bus',
          position: { x: 80, y: 160 },
          data: { name: 'Island A - bus1', vn_kv: 22, min_vm_pu: 0.95, max_vm_pu: 1.05, in_service: true },
        },
        {
          id: 'bus2',
          type: 'bus',
          position: { x: 260, y: 160 },
          data: { name: 'Island A - bus2', vn_kv: 22, min_vm_pu: 0.95, max_vm_pu: 1.05, in_service: true },
        },
        {
          id: 'bus3',
          type: 'bus',
          position: { x: 520, y: 160 },
          data: { name: 'Island B - bus3', vn_kv: 22, min_vm_pu: 0.95, max_vm_pu: 1.05, in_service: true },
        },
        {
          id: 'bus4',
          type: 'bus',
          position: { x: 700, y: 160 },
          data: { name: 'Island B - bus4', vn_kv: 22, min_vm_pu: 0.95, max_vm_pu: 1.05, in_service: true },
        },
        {
          id: 'eg1',
          type: 'ext_grid',
          position: { x: 80, y: 60 },
          data: { name: 'Grid@IslandA', busId: 'bus1', vm_pu: 1.02, va_degree: 0, in_service: true },
        },
        {
          id: 'loadB',
          type: 'load',
          position: { x: 700, y: 60 },
          data: { name: 'Load on island B', busId: 'bus4', p_mw: 1.0, q_mvar: 0.4, scaling: 1.0, in_service: true },
        },
      ],
      edges: [
        {
          id: 'line12',
          source: 'bus1',
          target: 'bus2',
          data: { std_type: 'NAYY 4x50 SE', length_km: 1.0, in_service: true },
        },
        {
          id: 'line34',
          source: 'bus3',
          target: 'bus4',
          data: { std_type: 'NAYY 4x50 SE', length_km: 1.0, in_service: true },
        },
      ],
    },
  },
];

export const getCategories = (): string[] => {
  const categories = diagramTemplates.map((t) => t.category);
  return [...new Set(categories)];
};

export const getTemplatesByCategory = (category: string): DiagramTemplate[] => {
  return diagramTemplates.filter((t) => t.category === category);
};

