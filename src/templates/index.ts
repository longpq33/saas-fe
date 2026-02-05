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
    id: 'vn-backbone-normal',
    name: 'Vietnam Backbone - Normal Load',
    category: 'Vietnam Grid',
    description: 'Simplified 110/22 kV North-Central-South backbone with normal loading.',
    data: {
      nodes: [
        {
          id: 'vn-bus-north-500',
          type: 'bus',
          position: { x: 200, y: 80 },
          data: {
            name: 'North 110kV',
            vn_kv: 110,
            min_vm_pu: 0.95,
            max_vm_pu: 1.05,
            in_service: true,
            geodata: { lat: 21.0285, long: 105.8542 }, // Hà Nội
          },
        },
        {
          id: 'vn-bus-central-500',
          type: 'bus',
          position: { x: 520, y: 80 },
          data: {
            name: 'Central 110kV',
            vn_kv: 110,
            min_vm_pu: 0.95,
            max_vm_pu: 1.05,
            in_service: true,
            geodata: { lat: 16.0544, long: 108.2022 }, // Đà Nẵng
          },
        },
        {
          id: 'vn-bus-south-500',
          type: 'bus',
          position: { x: 840, y: 80 },
          data: {
            name: 'South 110kV',
            vn_kv: 110,
            min_vm_pu: 0.95,
            max_vm_pu: 1.05,
            in_service: true,
            geodata: { lat: 10.8231, long: 106.6297 }, // TP.HCM
          },
        },
        {
          id: 'vn-bus-load-north',
          type: 'bus',
          position: { x: 200, y: 260 },
          data: {
            name: 'North Load',
            vn_kv: 20,
            in_service: true,
            geodata: { lat: 21.0, long: 105.8 }, // Gần Hà Nội
          },
        },
        {
          id: 'vn-bus-load-central',
          type: 'bus',
          position: { x: 520, y: 260 },
          data: {
            name: 'Bus Central Load',
            vn_kv: 20,
            in_service: true,
            geodata: { lat: 16.0, long: 108.2 }, // Gần Đà Nẵng
          },
        },
        {
          id: 'vn-bus-load-south',
          type: 'bus',
          position: { x: 840, y: 260 },
          data: {
            name: 'South Load',
            vn_kv: 20,
            in_service: true,
            geodata: { lat: 10.8, long: 106.6 }, // Gần TP.HCM
          },
        },
        {
          id: 'vn-ext-grid-north',
          type: 'ext_grid',
          position: { x: 40, y: 40 },
          data: { name: 'North Grid', busId: 'vn-bus-north-500', vm_pu: 1.02, va_degree: 0, in_service: true },
        },
        {
          id: 'vn-load-north',
          type: 'load',
          position: { x: 200, y: 360 },
          data: { name: 'North Load', busId: 'vn-bus-load-north', p_mw: 50, q_mvar: 12, scaling: 1, in_service: true },
        },
        {
          id: 'vn-load-central',
          type: 'load',
          position: { x: 520, y: 360 },
          data: { name: 'Central Load', busId: 'vn-bus-load-central', p_mw: 40, q_mvar: 10, scaling: 1, in_service: true },
        },
        {
          id: 'vn-load-south',
          type: 'load',
          position: { x: 840, y: 360 },
          data: { name: 'South Load', busId: 'vn-bus-load-south', p_mw: 60, q_mvar: 15, scaling: 1, in_service: true },
        },
        {
          id: 'vn-gen-north',
          type: 'gen',
          position: { x: 200, y: 0 },
          data: { name: 'North Gen', busId: 'vn-bus-north-500', p_mw: 100, q_mvar: 0, vm_pu: 1.02, in_service: true },
        },
        {
          id: 'vn-gen-central',
          type: 'gen',
          position: { x: 520, y: 0 },
          data: { name: 'Central Gen', busId: 'vn-bus-central-500', p_mw: 50, q_mvar: 0, vm_pu: 1.02, in_service: true },
        },
        {
          id: 'vn-gen-south',
          type: 'gen',
          position: { x: 840, y: 0 },
          data: { name: 'South Gen', busId: 'vn-bus-south-500', p_mw: 50, q_mvar: 0, vm_pu: 1.02, in_service: true },
        },
        {
          id: 'vn-line-north-central',
          type: 'line',
          position: { x: 360, y: 80 },
          data: {
            name: '110kV N-C',
            fromBusId: 'vn-bus-north-500',
            toBusId: 'vn-bus-central-500',
            std_type: '',
            length_km: 100,
            parallel: 1,
            df: 1,
            in_service: true,
            r_ohm_per_km: 0.05,
            x_ohm_per_km: 0.25,
            c_nf_per_km: 10,
            max_i_ka: 1.5,
            geodata: [
              { lat: 21.0285, long: 105.8542 }, // Hà Nội
              { lat: 19.5, long: 106.5 }, // Điểm trung gian
              { lat: 17.0, long: 107.5 }, // Điểm trung gian
              { lat: 16.0544, long: 108.2022 }, // Đà Nẵng
            ],
          },
        },
        {
          id: 'vn-line-central-south',
          type: 'line',
          position: { x: 680, y: 80 },
          data: {
            name: '110kV C-S',
            fromBusId: 'vn-bus-central-500',
            toBusId: 'vn-bus-south-500',
            std_type: '',
            length_km: 120,
            parallel: 1,
            df: 1,
            in_service: true,
            r_ohm_per_km: 0.05,
            x_ohm_per_km: 0.25,
            c_nf_per_km: 10,
            max_i_ka: 1.5,
            geodata: [
              { lat: 16.0544, long: 108.2022 }, // Đà Nẵng
              { lat: 14.0, long: 108.5 }, // Điểm trung gian
              { lat: 12.0, long: 107.0 }, // Điểm trung gian
              { lat: 10.8231, long: 106.6297 }, // TP.HCM
            ],
          },
        },
        {
          id: 'vn-trafo-north',
          type: 'transformer',
          position: { x: 200, y: 170 },
          data: {
            name: '110/22kV N Trafo',
            hvBusId: 'vn-bus-north-500',
            lvBusId: 'vn-bus-load-north',
            std_type: '63 MVA 110/20 kV',
            in_service: true,
          },
        },
        {
          id: 'vn-trafo-central',
          type: 'transformer',
          position: { x: 520, y: 170 },
          data: {
            name: '110/22kV C Trafo',
            hvBusId: 'vn-bus-central-500',
            lvBusId: 'vn-bus-load-central',
            std_type: '63 MVA 110/20 kV',
            in_service: true,
          },
        },
        {
          id: 'vn-trafo-south',
          type: 'transformer',
          position: { x: 840, y: 170 },
          data: {
            name: '110/22kV S Trafo',
            hvBusId: 'vn-bus-south-500',
            lvBusId: 'vn-bus-load-south',
            std_type: '63 MVA 110/20 kV',
            in_service: true,
          },
        },
      ],
      edges: [
        { id: 'vn-e-ext-north', source: 'vn-ext-grid-north', target: 'vn-bus-north-500', data: { kind: 'attach', attach_type: 'ext_grid' } },
        { id: 'vn-e-bn-lnc', source: 'vn-bus-north-500', target: 'vn-line-north-central', targetHandle: 'from', data: { kind: 'attach', attach_type: 'line' } },
        { id: 'vn-e-lnc-bc', source: 'vn-line-north-central', sourceHandle: 'to', target: 'vn-bus-central-500', data: { kind: 'attach', attach_type: 'line' } },
        { id: 'vn-e-bc-lcs', source: 'vn-bus-central-500', target: 'vn-line-central-south', targetHandle: 'from', data: { kind: 'attach', attach_type: 'line' } },
        { id: 'vn-e-lcs-bs', source: 'vn-line-central-south', sourceHandle: 'to', target: 'vn-bus-south-500', data: { kind: 'attach', attach_type: 'line' } },
        { id: 'vn-e-bn-trafo-n', source: 'vn-bus-north-500', target: 'vn-trafo-north', data: { kind: 'attach', attach_type: 'transformer' } },
        { id: 'vn-e-trafo-n-bln', source: 'vn-trafo-north', target: 'vn-bus-load-north', data: { kind: 'attach', attach_type: 'transformer' } },
        { id: 'vn-e-bc-trafo-c', source: 'vn-bus-central-500', target: 'vn-trafo-central', data: { kind: 'attach', attach_type: 'transformer' } },
        { id: 'vn-e-trafo-c-blc', source: 'vn-trafo-central', target: 'vn-bus-load-central', data: { kind: 'attach', attach_type: 'transformer' } },
        { id: 'vn-e-bs-trafo-s', source: 'vn-bus-south-500', target: 'vn-trafo-south', data: { kind: 'attach', attach_type: 'transformer' } },
        { id: 'vn-e-trafo-s-bls', source: 'vn-trafo-south', target: 'vn-bus-load-south', data: { kind: 'attach', attach_type: 'transformer' } },
        { id: 'vn-e-bln-load', source: 'vn-bus-load-north', target: 'vn-load-north', data: { kind: 'attach', attach_type: 'load' } },
        { id: 'vn-e-blc-load', source: 'vn-bus-load-central', target: 'vn-load-central', data: { kind: 'attach', attach_type: 'load' } },
        { id: 'vn-e-bls-load', source: 'vn-bus-load-south', target: 'vn-load-south', data: { kind: 'attach', attach_type: 'load' } },
        { id: 'vn-e-bn-gen', source: 'vn-bus-north-500', target: 'vn-gen-north', data: { kind: 'attach', attach_type: 'gen' } },
        { id: 'vn-e-bc-gen', source: 'vn-bus-central-500', target: 'vn-gen-central', data: { kind: 'attach', attach_type: 'gen' } },
        { id: 'vn-e-bs-gen', source: 'vn-bus-south-500', target: 'vn-gen-south', data: { kind: 'attach', attach_type: 'gen' } },
      ],
      settings: { return_network: 'tables' },
    },
  },
  {
    id: 'vn-backbone-fault-switch',
    name: 'Vietnam Backbone - Switch Fault',
    category: 'Vietnam Grid',
    description: 'Vietnam Backbone with fault: switch open on Central-South line, isolating South region.',
    data: {
      nodes: [
        {
          id: 'vn-bus-north-500',
          type: 'bus',
          position: { x: 200, y: 80 },
          data: {
            name: 'North 110kV',
            vn_kv: 110,
            min_vm_pu: 0.95,
            max_vm_pu: 1.05,
            in_service: true,
            geodata: { lat: 21.0285, long: 105.8542 }, // Hà Nội
          },
        },
        {
          id: 'vn-bus-central-500',
          type: 'bus',
          position: { x: 520, y: 80 },
          data: {
            name: 'Central 110kV',
            vn_kv: 110,
            min_vm_pu: 0.95,
            max_vm_pu: 1.05,
            in_service: true,
            geodata: { lat: 16.0544, long: 108.2022 }, // Đà Nẵng
          },
        },
        {
          id: 'vn-bus-south-500',
          type: 'bus',
          position: { x: 840, y: 80 },
          data: {
            name: 'South 110kV',
            vn_kv: 110,
            min_vm_pu: 0.95,
            max_vm_pu: 1.05,
            in_service: true,
            geodata: { lat: 10.8231, long: 106.6297 }, // TP.HCM
          },
        },
        {
          id: 'vn-bus-load-north',
          type: 'bus',
          position: { x: 200, y: 260 },
          data: {
            name: 'North Load',
            vn_kv: 20,
            in_service: true,
            geodata: { lat: 21.0, long: 105.8 }, // Gần Hà Nội
          },
        },
        {
          id: 'vn-bus-load-central',
          type: 'bus',
          position: { x: 520, y: 260 },
          data: {
            name: 'Central Load',
            vn_kv: 20,
            in_service: true,
            geodata: { lat: 16.0, long: 108.2 }, // Gần Đà Nẵng
          },
        },
        {
          id: 'vn-bus-load-south',
          type: 'bus',
          position: { x: 840, y: 260 },
          data: {
            name: 'South Load',
            vn_kv: 20,
            in_service: true,
            geodata: { lat: 10.8, long: 106.6 }, // Gần TP.HCM
          },
        },
        {
          id: 'vn-ext-grid-north',
          type: 'ext_grid',
          position: { x: 40, y: 40 },
          data: { name: 'North Grid', busId: 'vn-bus-north-500', vm_pu: 1.02, va_degree: 0, in_service: true },
        },
        {
          id: 'vn-load-north',
          type: 'load',
          position: { x: 200, y: 360 },
          data: { name: 'North Load', busId: 'vn-bus-load-north', p_mw: 50, q_mvar: 12, scaling: 1, in_service: true },
        },
        {
          id: 'vn-load-central',
          type: 'load',
          position: { x: 520, y: 360 },
          data: { name: 'Central Load', busId: 'vn-bus-load-central', p_mw: 40, q_mvar: 10, scaling: 1, in_service: true },
        },
        {
          id: 'vn-load-south',
          type: 'load',
          position: { x: 840, y: 360 },
          data: { name: 'South Load', busId: 'vn-bus-load-south', p_mw: 60, q_mvar: 15, scaling: 1, in_service: true },
        },
        {
          id: 'vn-gen-north',
          type: 'gen',
          position: { x: 200, y: 0 },
          data: { name: 'North Gen', busId: 'vn-bus-north-500', p_mw: 100, q_mvar: 0, vm_pu: 1.02, in_service: true },
        },
        {
          id: 'vn-gen-central',
          type: 'gen',
          position: { x: 520, y: 0 },
          data: { name: 'Central Gen', busId: 'vn-bus-central-500', p_mw: 50, q_mvar: 0, vm_pu: 1.02, in_service: true },
        },
        {
          id: 'vn-gen-south',
          type: 'gen',
          position: { x: 840, y: 0 },
          data: { name: 'South Gen', busId: 'vn-bus-south-500', p_mw: 50, q_mvar: 0, vm_pu: 1.02, in_service: true },
        },
        {
          id: 'vn-line-north-central',
          type: 'line',
          position: { x: 360, y: 80 },
          data: {
            name: '110kV N-C',
            fromBusId: 'vn-bus-north-500',
            toBusId: 'vn-bus-central-500',
            std_type: '',
            length_km: 100,
            parallel: 1,
            df: 1,
            in_service: true,
            r_ohm_per_km: 0.05,
            x_ohm_per_km: 0.25,
            c_nf_per_km: 10,
            max_i_ka: 1.5,
            geodata: [
              { lat: 21.0285, long: 105.8542 }, // Hà Nội
              { lat: 19.5, long: 106.5 }, // Điểm trung gian
              { lat: 17.0, long: 107.5 }, // Điểm trung gian
              { lat: 16.0544, long: 108.2022 }, // Đà Nẵng
            ],
          },
        },
        {
          id: 'vn-line-central-south',
          type: 'line',
          position: { x: 680, y: 80 },
          data: {
            name: '110kV C-S',
            fromBusId: 'vn-bus-central-500',
            toBusId: 'vn-bus-south-500',
            std_type: '',
            length_km: 120,
            parallel: 1,
            df: 1,
            in_service: true,
            r_ohm_per_km: 0.05,
            x_ohm_per_km: 0.25,
            c_nf_per_km: 10,
            max_i_ka: 1.5,
            geodata: [
              { lat: 16.0544, long: 108.2022 }, // Đà Nẵng
              { lat: 14.0, long: 108.5 }, // Điểm trung gian
              { lat: 12.0, long: 107.0 }, // Điểm trung gian
              { lat: 10.8231, long: 106.6297 }, // TP.HCM
            ],
          },
        },
        {
          id: 'vn-trafo-north',
          type: 'transformer',
          position: { x: 200, y: 170 },
          data: {
            name: '110/22kV N Trafo',
            hvBusId: 'vn-bus-north-500',
            lvBusId: 'vn-bus-load-north',
            std_type: '63 MVA 110/20 kV',
            in_service: true,
          },
        },
        {
          id: 'vn-trafo-central',
          type: 'transformer',
          position: { x: 520, y: 170 },
          data: {
            name: '110/22kV C Trafo',
            hvBusId: 'vn-bus-central-500',
            lvBusId: 'vn-bus-load-central',
            std_type: '63 MVA 110/20 kV',
            in_service: true,
          },
        },
        {
          id: 'vn-trafo-south',
          type: 'transformer',
          position: { x: 840, y: 170 },
          data: {
            name: '110/22kV S Trafo',
            hvBusId: 'vn-bus-south-500',
            lvBusId: 'vn-bus-load-south',
            std_type: '63 MVA 110/20 kV',
            in_service: true,
          },
        },
        {
          id: 'vn-switch-cs-fault',
          type: 'switch',
          position: { x: 680, y: 120 },
          data: {
            name: 'Switch CS Fault',
            busId: 'vn-bus-central-500',
            elementType: 'line',
            elementId: 'vn-line-central-south',
            closed: false, // Mở - sự cố
            type: 'CB', // Circuit Breaker
            in_service: true,
          },
        },
      ],
      edges: [
        { id: 'vn-e-ext-north', source: 'vn-ext-grid-north', target: 'vn-bus-north-500', data: { kind: 'attach', attach_type: 'ext_grid' } },
        { id: 'vn-e-bn-lnc', source: 'vn-bus-north-500', target: 'vn-line-north-central', targetHandle: 'from', data: { kind: 'attach', attach_type: 'line' } },
        { id: 'vn-e-lnc-bc', source: 'vn-line-north-central', sourceHandle: 'to', target: 'vn-bus-central-500', data: { kind: 'attach', attach_type: 'line' } },
        { id: 'vn-e-bc-lcs', source: 'vn-bus-central-500', target: 'vn-line-central-south', targetHandle: 'from', data: { kind: 'attach', attach_type: 'line' } },
        { id: 'vn-e-lcs-bs', source: 'vn-line-central-south', sourceHandle: 'to', target: 'vn-bus-south-500', data: { kind: 'attach', attach_type: 'line' } },
        { id: 'vn-e-bn-trafo-n', source: 'vn-bus-north-500', target: 'vn-trafo-north', data: { kind: 'attach', attach_type: 'transformer' } },
        { id: 'vn-e-trafo-n-bln', source: 'vn-trafo-north', target: 'vn-bus-load-north', data: { kind: 'attach', attach_type: 'transformer' } },
        { id: 'vn-e-bc-trafo-c', source: 'vn-bus-central-500', target: 'vn-trafo-central', data: { kind: 'attach', attach_type: 'transformer' } },
        { id: 'vn-e-trafo-c-blc', source: 'vn-trafo-central', target: 'vn-bus-load-central', data: { kind: 'attach', attach_type: 'transformer' } },
        { id: 'vn-e-bs-trafo-s', source: 'vn-bus-south-500', target: 'vn-trafo-south', data: { kind: 'attach', attach_type: 'transformer' } },
        { id: 'vn-e-trafo-s-bls', source: 'vn-trafo-south', target: 'vn-bus-load-south', data: { kind: 'attach', attach_type: 'transformer' } },
        { id: 'vn-e-bln-load', source: 'vn-bus-load-north', target: 'vn-load-north', data: { kind: 'attach', attach_type: 'load' } },
        { id: 'vn-e-blc-load', source: 'vn-bus-load-central', target: 'vn-load-central', data: { kind: 'attach', attach_type: 'load' } },
        { id: 'vn-e-bls-load', source: 'vn-bus-load-south', target: 'vn-load-south', data: { kind: 'attach', attach_type: 'load' } },
        { id: 'vn-e-bn-gen', source: 'vn-bus-north-500', target: 'vn-gen-north', data: { kind: 'attach', attach_type: 'gen' } },
        { id: 'vn-e-bc-gen', source: 'vn-bus-central-500', target: 'vn-gen-central', data: { kind: 'attach', attach_type: 'gen' } },
        { id: 'vn-e-bs-gen', source: 'vn-bus-south-500', target: 'vn-gen-south', data: { kind: 'attach', attach_type: 'gen' } },
        { id: 'vn-e-switch-cs', source: 'vn-bus-central-500', target: 'vn-switch-cs-fault', data: { kind: 'attach', attach_type: 'switch' } },
      ],
      settings: { return_network: 'tables' },
    },
  },
  {
    id: 'overload-line-test',
    name: 'Overloaded Line',
    category: 'Overloaded',
    description: 'Two-bus system with a single overloaded line for testing map overload visualization.',
    data: {
      nodes: [
        {
          id: 'ol-bus-slack',
          type: 'bus',
          position: { x: 240, y: 160 },
          data: {
            name: 'Slack Bus',
            vn_kv: 110,
            min_vm_pu: 0.95,
            max_vm_pu: 1.05,
            in_service: true,
            geodata: { lat: 21.0285, long: 105.8542 },
          },
        },
        {
          id: 'ol-bus-load',
          type: 'bus',
          position: { x: 560, y: 160 },
          data: {
            name: 'Load Bus',
            vn_kv: 110,
            min_vm_pu: 0.95,
            max_vm_pu: 1.05,
            in_service: true,
            geodata: { lat: 21.03, long: 105.86 },
          },
        },
        {
          id: 'ol-ext-grid',
          type: 'ext_grid',
          position: { x: 80, y: 120 },
          data: {
            name: 'Ext Grid',
            busId: 'ol-bus-slack',
            vm_pu: 1.0,
            va_degree: 0,
            in_service: true,
          },
        },
        {
          id: 'ol-line-overloaded',
          type: 'line',
          position: { x: 400, y: 160 },
          data: {
            name: 'Overloaded Line',
            fromBusId: 'ol-bus-slack',
            toBusId: 'ol-bus-load',
            std_type: '',
            length_km: 1.0,
            parallel: 1,
            df: 1.0,
            in_service: true,
            r_ohm_per_km: 0.05,
            x_ohm_per_km: 0.1,
            c_nf_per_km: 0,
            max_i_ka: 0.05,
            geodata: [
              { lat: 21.0285, long: 105.8542 },
              { lat: 21.0295, long: 105.857 },
              { lat: 21.03, long: 105.86 },
            ],
            switch: { enabled: true, closed: true, side: 'source', z_ohm: 0 },
          },
        },
        {
          id: 'ol-load',
          type: 'load',
          position: { x: 720, y: 220 },
          data: {
            name: 'Big Load',
            busId: 'ol-bus-load',
            p_mw: 80,
            q_mvar: 20,
            scaling: 1,
            in_service: true,
            type: '',
            controllable: false,
          },
        },
      ],
      edges: [
        {
          id: 'ol-edge-ext-grid',
          source: 'ol-ext-grid',
          target: 'ol-bus-slack',
          data: { kind: 'attach', attach_type: 'ext_grid' },
        },
        {
          id: 'ol-edge-bus-slack-line',
          source: 'ol-bus-slack',
          target: 'ol-line-overloaded',
          data: { kind: 'attach', attach_type: 'line' },
        },
        {
          id: 'ol-edge-line-bus-load',
          source: 'ol-line-overloaded',
          target: 'ol-bus-load',
          data: { kind: 'attach', attach_type: 'line' },
        },
        {
          id: 'ol-edge-bus-load-load',
          source: 'ol-bus-load',
          target: 'ol-load',
          data: { kind: 'attach', attach_type: 'load' },
        },
      ],
      settings: { return_network: 'tables' },
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

