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
          id: 'ext_grid-1769589840593',
          type: 'ext_grid',
          position: { x: 120, y: 60 },
          data: {
            name: 'Ext Grid',
            busId: 'bus-1769589844864',
            vm_pu: 1,
            va_degree: 0,
            in_service: true,
          },
        },
        {
          id: 'bus-1769589844864',
          type: 'bus',
          position: { x: 120, y: 180 },
          data: {
            name: 'Bus-1',
            vn_kv: 22,
            type: 'b',
            min_vm_pu: 0.9,
            max_vm_pu: 1.1,
            geodata: {
              lat: 0,
              long: 0,
            },
          },
        },
        {
          id: 'bus-1769589847339',
          type: 'bus',
          position: { x: 420, y: 180 },
          data: {
            name: 'Bus-2',
            vn_kv: 22,
            type: 'b',
            min_vm_pu: 0.9,
            max_vm_pu: 1.1,
            geodata: {
              lat: 0,
              long: 0,
            },
          },
        },
        {
          id: 'load-1769589849621',
          type: 'load',
          position: { x: 420, y: 60 },
          data: {
            name: 'Load',
            busId: 'bus-1769589847339',
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
              "id": "reactflow__edge-ext_grid-1769589840593source-bus-1769589844864target",
              "source": "ext_grid-1769589840593",
              "target": "bus-1769589844864",
              "data": {
                  "kind": "attach",
                  "attach_type": "ext_grid"
              }
          },
          {
              "id": "reactflow__edge-bus-1769589844864source-bus-1769589847339target",
              "source": "bus-1769589844864",
              "target": "bus-1769589847339",
              "data": {
                  "name": "Line",
                  "std_type": "NAYY 4x50 SE",
                  "length_km": 1,
                  "parallel": 1,
                  "df": 1,
                  "in_service": true,
                  "r_ohm_per_km": 0.642,
                  "x_ohm_per_km": 0.083,
                  "c_nf_per_km": 210,
                  "max_i_ka": 0.2,
                  "switch": {
                      "enabled": true,
                      "closed": true,
                      "side": "source",
                      "z_ohm": 0
                  },
                  "kind": "line"
              }
          },
          {
              "id": "reactflow__edge-bus-1769589847339source-load-1769589849621",
              "source": "bus-1769589847339",
              "target": "load-1769589849621",
              "data": {
                  "kind": "attach",
                  "attach_type": "load"
              }
          }
      ]
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

