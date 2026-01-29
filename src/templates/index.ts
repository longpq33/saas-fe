import type { Node, Edge } from 'reactflow';

export interface DiagramTemplate {
  id: string;
  name: string;
  category: string;
  description: string;
  data: {
    nodes: Node[];
    edges: Edge[];
    settings?: Record<string, unknown>;
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
          id: 'ext_grid-1769653774416',
          type: 'ext_grid',
          position: { x: 120, y: 80 },
          data: {
            name: 'Ext Grid',
            busId: 'bus-1769653776698',
            vm_pu: 1,
            va_degree: 0,
            in_service: true,
          },
        },
        {
          id: 'bus-1769653776698',
          type: 'bus',
          position: { x: 320, y: 120 },
          data: {
            name: 'Bus',
            vn_kv: 22,
            type: 'b',
            min_vm_pu: 0.9,
            max_vm_pu: 1.1,
            geodata: { lat: 0, long: 0 },
          },
        },
        {
          id: 'line-1769653780469',
          type: 'line',
          position: { x: 520, y: 120 },
          data: {
            name: 'Line',
            fromBusId: 'bus-1769653776698',
            toBusId: 'bus-1769653786343',
            std_type: 'NAYY 4x50 SE',
            length_km: 1,
            parallel: 1,
            df: 1,
            in_service: true,
            r_ohm_per_km: 0.642,
            x_ohm_per_km: 0.083,
            c_nf_per_km: 210,
            max_i_ka: 0.2,
            switch: { enabled: true, closed: true, side: 'source', z_ohm: 0 },
          },
        },
        {
          id: 'bus-1769653786343',
          type: 'bus',
          position: { x: 720, y: 120 },
          data: {
            name: 'Bus',
            vn_kv: 22,
            type: 'b',
            min_vm_pu: 0.9,
            max_vm_pu: 1.1,
            geodata: { lat: 0, long: 0 },
          },
        },
        {
          id: 'load-1769653795028',
          type: 'load',
          position: { x: 900, y: 220 },
          data: {
            name: 'Load',
            busId: 'bus-1769653786343',
            p_mw: 1,
            q_mvar: 0,
            scaling: 1,
            in_service: true,
            type: '',
            controllable: false,
          },
        },
      ],
      edges: [
        {
          id: 'reactflow__edge-ext_grid-1769653774416source-bus-1769653776698target',
          source: 'ext_grid-1769653774416',
          target: 'bus-1769653776698',
          data: { kind: 'attach', attach_type: 'ext_grid' },
        },
        {
          id: 'reactflow__edge-bus-1769653776698source-line-1769653780469from',
          source: 'bus-1769653776698',
          target: 'line-1769653780469',
          data: { kind: 'attach', attach_type: 'line' },
        },
        {
          id: 'reactflow__edge-line-1769653780469to-bus-1769653786343target',
          source: 'line-1769653780469',
          target: 'bus-1769653786343',
          data: { kind: 'attach', attach_type: 'line' },
        },
        {
          id: 'reactflow__edge-bus-1769653786343source-load-1769653795028',
          source: 'bus-1769653786343',
          target: 'load-1769653795028',
          data: { kind: 'attach', attach_type: 'load' },
        },
      ],
      settings: { return_network: 'tables' },
    },
  },
  {
    id: 'line-overload',
    name: 'Line Overload',
    category: 'Validation',
    description: 'A two-bus system designed to overload the line (loading_percent > 100%).',
    data: {
      nodes: [
        {
          id: 'bus-ol-1',
          type: 'bus',
          position: { x: 260, y: 140 },
          data: { name: 'Bus 1 (Slack)', vn_kv: 22, min_vm_pu: 0.95, max_vm_pu: 1.05, in_service: true },
        },
        {
          id: 'bus-ol-2',
          type: 'bus',
          position: { x: 640, y: 140 },
          data: { name: 'Bus 2 (Load)', vn_kv: 22, min_vm_pu: 0.95, max_vm_pu: 1.05, in_service: true },
        },
        {
          id: 'ext-grid-ol-1',
          type: 'ext_grid',
          position: { x: 80, y: 80 },
          data: { name: 'Grid', busId: 'bus-ol-1', vm_pu: 1.02, va_degree: 0, in_service: true },
        },
        {
          id: 'load-ol-1',
          type: 'load',
          position: { x: 820, y: 220 },
          data: { name: 'Heavy Load', busId: 'bus-ol-2', p_mw: 25, q_mvar: 10, scaling: 1, in_service: true },
        },
        {
          id: 'line-ol-1-2',
          type: 'line',
          position: { x: 450, y: 140 },
          data: {
            name: 'Weak Line',
            fromBusId: 'bus-ol-1',
            toBusId: 'bus-ol-2',
            std_type: '', // Use custom params
            length_km: 1,
            parallel: 1,
            df: 1,
            in_service: true,
            r_ohm_per_km: 0.642,
            x_ohm_per_km: 0.083,
            c_nf_per_km: 210,
            max_i_ka: 0.05,
          },
        },
      ],
      edges: [
        {
          id: 'edge-extgrid-ol-1',
          source: 'ext-grid-ol-1',
          target: 'bus-ol-1',
          data: { kind: 'attach', attach_type: 'ext_grid' },
        },
        {
          id: 'edge-bus1-line-ol',
          source: 'bus-ol-1',
          target: 'line-ol-1-2',
          targetHandle: 'from',
          data: { kind: 'attach', attach_type: 'line' },
        },
        {
          id: 'edge-line-bus2-ol',
          source: 'line-ol-1-2',
          sourceHandle: 'to',
          target: 'bus-ol-2',
          data: { kind: 'attach', attach_type: 'line' },
        },
        {
          id: 'edge-load-ol-1',
          source: 'bus-ol-2',
          target: 'load-ol-1',
          data: { kind: 'attach', attach_type: 'load' },
        },
      ],
      settings: { return_network: 'tables' },
    },
  }
  
];

export const getCategories = (): string[] => {
  const categories = diagramTemplates.map((t) => t.category);
  return [...new Set(categories)];
};

export const getTemplatesByCategory = (category: string): DiagramTemplate[] => {
  return diagramTemplates.filter((t) => t.category === category);
};

