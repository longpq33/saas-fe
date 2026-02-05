import type { Edge, Node } from 'reactflow';
import type { BusData } from '../nodes/bus/types';
import type { DcBusData } from '../nodes/dc_bus/types';
import type { LineData, LineGeodataPoint } from '../nodes/line/types';
import type { TransformerData } from '../nodes/transformer/types';
import type { Trafo3WData } from '../nodes/trafo3w/types';

export type BusWithGeodata = {
  id: string;
  name: string;
  type: 'bus' | 'dc_bus';
  lat: number;
  long: number;
  data: BusData | DcBusData;
};

export type LineWithGeodata = {
  id: string;
  name: string;
  fromBusId: string;
  toBusId: string;
  geodata?: LineGeodataPoint[];
  fromBus?: BusWithGeodata;
  toBus?: BusWithGeodata;

  // Design / configuration data (optional, for tooltips)
  length_km?: number;
  std_type?: string;
  parallel?: number;
  df?: number;
  in_service?: boolean;
  r_ohm_per_km?: number;
  x_ohm_per_km?: number;
  c_nf_per_km?: number;
  max_i_ka?: number;
};

export type NodeWithGeodata = {
  id: string;
  name: string;
  type: string;
  lat: number;
  long: number;
  busId: string; // Present if node is connected to a bus
  bus?: BusWithGeodata; // Present if bus exists and has geodata
  data: unknown;
};

export type NodeToBusConnection = {
  id: string;
  nodeId: string;
  nodeType: string;
  nodeName: string;
  busId: string;
  busName: string;
  fromPosition: [number, number]; // node position
  toPosition: [number, number]; // bus position
};

/**
 * Extract geodata from bus node
 */
function getBusGeodata(node: Node): { lat: number; long: number } | null {
  if (node.type !== 'bus' && node.type !== 'dc_bus') {
    return null;
  }

  const data = node.data as BusData | DcBusData;
  if (!data.geodata) {
    return null;
  }

  const { lat, long } = data.geodata;
  if (typeof lat !== 'number' || typeof long !== 'number') {
    return null;
  }

  if (!isFinite(lat) || !isFinite(long)) {
    return null;
  }

  // Validate latitude range [-90, 90]
  if (lat < -90 || lat > 90) {
    return null;
  }

  // Validate longitude range [-180, 180]
  if (long < -180 || long > 180) {
    return null;
  }

  return { lat, long };
}

/**
 * Filter nodes to get only buses with valid geodata
 */
export function getBusesWithGeodata(nodes: Node[]): BusWithGeodata[] {
  const buses: BusWithGeodata[] = [];

  for (const node of nodes) {
    if (node.type !== 'bus' && node.type !== 'dc_bus') {
      continue;
    }

    const geodata = getBusGeodata(node);
    if (!geodata) {
      continue;
    }

    const data = node.data as BusData | DcBusData;
    buses.push({
      id: node.id,
      name: data.name || node.id,
      type: node.type,
      lat: geodata.lat,
      long: geodata.long,
      data,
    });
  }

  return buses;
}

/**
 * Get lines with geodata and their connected bus information
 */
export function getLinesWithGeodata(nodes: Node[], edges: Edge[]): LineWithGeodata[] {
  const busesWithGeodata = getBusesWithGeodata(nodes);
  const busMap = new Map(busesWithGeodata.map((b) => [b.id, b]));
  const nodeById = new Map(nodes.map((n) => [n.id, n]));

  const lines: LineWithGeodata[] = [];

  for (const edge of edges) {
    const sourceNode = nodeById.get(edge.source);
    const targetNode = nodeById.get(edge.target);

    // Only process line edges
    if (!sourceNode || !targetNode) {
      continue;
    }

    // Check if source or target is a line node
    const lineNode = sourceNode.type === 'line' ? sourceNode : targetNode.type === 'line' ? targetNode : null;
    if (!lineNode) {
      continue;
    }

    const lineData = lineNode.data as LineData;
    const fromBus = busMap.get(lineData.fromBusId);
    const toBus = busMap.get(lineData.toBusId);

    lines.push({
      id: edge.id || lineNode.id,
      name: lineData.name || edge.id || lineNode.id,
      fromBusId: lineData.fromBusId,
      toBusId: lineData.toBusId,
      geodata: lineData.geodata,
      fromBus,
      toBus,
      length_km: lineData.length_km,
      std_type: lineData.std_type,
      parallel: lineData.parallel,
      df: lineData.df,
      in_service: lineData.in_service,
      r_ohm_per_km: lineData.r_ohm_per_km,
      x_ohm_per_km: lineData.x_ohm_per_km,
      c_nf_per_km: lineData.c_nf_per_km,
      max_i_ka: lineData.max_i_ka,
    });
  }

  return lines;
}

/**
 * Calculate map bounds from buses with geodata
 * Returns array of [minLat, minLng, maxLat, maxLng] for use with Leaflet
 */
export function calculateMapBounds(buses: BusWithGeodata[]): [[number, number], [number, number]] | null {
  if (buses.length === 0) {
    return null;
  }

  let minLat = Infinity;
  let maxLat = -Infinity;
  let minLng = Infinity;
  let maxLng = -Infinity;

  for (const bus of buses) {
    minLat = Math.min(minLat, bus.lat);
    maxLat = Math.max(maxLat, bus.lat);
    minLng = Math.min(minLng, bus.long);
    maxLng = Math.max(maxLng, bus.long);
  }

  if (!isFinite(minLat) || !isFinite(maxLat) || !isFinite(minLng) || !isFinite(maxLng)) {
    return null;
  }

  // Add padding
  const latPadding = (maxLat - minLat) * 0.1 || 0.1;
  const lngPadding = (maxLng - minLng) * 0.1 || 0.1;

  return [
    [minLat - latPadding, minLng - lngPadding],
    [maxLat + latPadding, maxLng + lngPadding],
  ];
}

/**
 * Convert line geodata to Leaflet LatLng array
 */
export function lineGeodataToLatLng(geodata: LineGeodataPoint[]): [number, number][] {
  return geodata.map((point) => [point.lat, point.long]);
}

/**
 * Create polyline coordinates for a line
 * If line has geodata, use it; otherwise, create straight line between buses
 */
export function getLineCoordinates(line: LineWithGeodata): [number, number][] | null {
  // If line has geodata, use it
  if (line.geodata && line.geodata.length > 0) {
    return lineGeodataToLatLng(line.geodata);
  }

  // Otherwise, create straight line between buses if both have coordinates
  if (line.fromBus && line.toBus) {
    return [
      [line.fromBus.lat, line.fromBus.long],
      [line.toBus.lat, line.toBus.long],
    ];
  }

  return null;
}

/**
 * Get default bounds for Vietnam (if no buses with geodata)
 * Returns array of [minLat, minLng, maxLat, maxLng] for use with Leaflet
 */
export function getVietnamBounds(): [[number, number], [number, number]] {
  // Approximate bounds of Vietnam
  return [
    [8.0, 102.0],
    [23.5, 110.0],
  ];
}

/**
 * Node types that should be displayed on the map
 */
const NODE_TYPES_TO_DISPLAY = [
  'gen',
  'load',
  'ext_grid',
  'storage',
  'transformer',
  'sgen',
  'motor',
  'shunt',
  'trafo3w',
  'dc_source',
  'dc_load',
  'asymmetric_load',
  'asymmetric_sgen',
  'ward',
  'xward',
  'switch',
] as const;

/**
 * Type guard to check if busId is a valid string
 */
function isValidBusId(busId: string | undefined): busId is string {
  return typeof busId === 'string' && busId.length > 0;
}

/**
 * Offsets (in degrees) to place bus-bound equipment around a bus
 * to avoid overlapping markers on the map.
 */
const BUS_BOUND_OFFSETS: Array<{ lat: number; long: number }> = [
  { lat: 0.01, long: 0.0 },
  { lat: -0.01, long: 0.0 },
  { lat: 0.0, long: 0.01 },
  { lat: 0.0, long: -0.01 },
  { lat: 0.01, long: 0.01 },
  { lat: -0.01, long: -0.01 },
  { lat: 0.01, long: -0.01 },
  { lat: -0.01, long: 0.01 },
];

/**
 * Get nodes with geodata from their connected buses
 * Returns array of nodes that have valid geodata through bus connections
 */
export function getNodesWithGeodata(nodes: Node[], buses: BusWithGeodata[]): NodeWithGeodata[] {
  const busMap = new Map(buses.map((b) => [b.id, b]));
  const nodesWithGeodata: NodeWithGeodata[] = [];
  const busOffsetIndex = new Map<string, number>();

  for (const node of nodes) {
    // Only process node types that should be displayed
    if (!NODE_TYPES_TO_DISPLAY.includes(node.type as (typeof NODE_TYPES_TO_DISPLAY)[number])) {
      continue;
    }

    // Check if node has its own geodata first
    const nodeData = node.data as { name?: string; geodata?: { lat: number; long: number } };
    const hasOwnGeodata = nodeData.geodata && typeof nodeData.geodata.lat === 'number' && typeof nodeData.geodata.long === 'number';

    let bus: BusWithGeodata | undefined;
    let foundBusId: string | undefined;

    // Handle different node types with different busId fields
    if (node.type === 'transformer') {
      const data = node.data as TransformerData;
      // Use hvBusId for transformer (high voltage side)
      foundBusId = data.hvBusId;
      if (foundBusId) {
        bus = busMap.get(foundBusId);
      }
    } else if (node.type === 'trafo3w') {
      const data = node.data as Trafo3WData;
      // Use hvBusId for trafo3w (high voltage side)
      foundBusId = data.hvBusId;
      if (foundBusId) {
        bus = busMap.get(foundBusId);
      }
    } else {
      // All other node types use busId
      const data = node.data as { busId?: string };
      foundBusId = data.busId;
      if (foundBusId) {
        bus = busMap.get(foundBusId);
      }
    }

    // Determine node position and whether to include it
    let nodeLat: number;
    let nodeLong: number;
    let validBusId: string | undefined;

    if (hasOwnGeodata) {
      // Node has its own geodata - always display, even if bus doesn't have geodata
      nodeLat = nodeData.geodata!.lat;
      nodeLong = nodeData.geodata!.long;
      // Still try to get busId for connection display, but it's optional
      validBusId = isValidBusId(foundBusId) ? foundBusId : undefined;
    } else {
      // Node doesn't have its own geodata - need bus with geodata
      if (!bus || !isValidBusId(foundBusId)) {
        continue;
      }

      // Use bus geodata with small offset to make multiple bus-bound nodes visible
      // around the same bus (avoid overlapping markers).
      const currentIndex = busOffsetIndex.get(bus.id) ?? 0;
      busOffsetIndex.set(bus.id, currentIndex + 1);
      const pattern = BUS_BOUND_OFFSETS[currentIndex % BUS_BOUND_OFFSETS.length];

      nodeLat = bus.lat + pattern.lat;
      nodeLong = bus.long + pattern.long;
      validBusId = foundBusId;
    }
    
    nodesWithGeodata.push({
      id: node.id,
      name: nodeData.name || node.id,
      type: String(node.type),
      lat: nodeLat,
      long: nodeLong,
      busId: validBusId || '', // Use empty string if no busId (for nodes with own geodata but no bus)
      bus: bus || undefined, // Can be undefined if node has own geodata but bus doesn't exist
      data: node.data,
    });
  }

  return nodesWithGeodata;
}

/**
 * Get connections from nodes to buses
 * Returns array of connections representing lines from nodes to their connected buses
 */
export function getNodeToBusConnections(
  buses: BusWithGeodata[],
  nodesWithGeodata: NodeWithGeodata[]
): NodeToBusConnection[] {
  const busMap = new Map(buses.map((b) => [b.id, b]));
  const connections: NodeToBusConnection[] = [];

  for (const node of nodesWithGeodata) {
    // Handle transformer - can have connections to both hvBus and lvBus
    if (node.type === 'transformer') {
      const data = node.data as { hvBusId?: string; lvBusId?: string };
      
      // Connection to HV bus
      if (data.hvBusId) {
        const hvBus = busMap.get(data.hvBusId);
        if (hvBus) {
          connections.push({
            id: `${node.id}-hv-${data.hvBusId}`,
            nodeId: node.id,
            nodeType: node.type,
            nodeName: node.name,
            busId: data.hvBusId,
            busName: hvBus.name,
            fromPosition: [node.lat, node.long],
            toPosition: [hvBus.lat, hvBus.long],
          });
        }
      }

      // Connection to LV bus
      if (data.lvBusId) {
        const lvBus = busMap.get(data.lvBusId);
        if (lvBus) {
          connections.push({
            id: `${node.id}-lv-${data.lvBusId}`,
            nodeId: node.id,
            nodeType: node.type,
            nodeName: node.name,
            busId: data.lvBusId,
            busName: lvBus.name,
            fromPosition: [node.lat, node.long],
            toPosition: [lvBus.lat, lvBus.long],
          });
        }
      }
    }
    // Handle trafo3w - can have connections to hvBus, mvBus, and lvBus
    else if (node.type === 'trafo3w') {
      const data = node.data as { hvBusId?: string; mvBusId?: string; lvBusId?: string };
      
      // Connection to HV bus
      if (data.hvBusId) {
        const hvBus = busMap.get(data.hvBusId);
        if (hvBus) {
          connections.push({
            id: `${node.id}-hv-${data.hvBusId}`,
            nodeId: node.id,
            nodeType: node.type,
            nodeName: node.name,
            busId: data.hvBusId,
            busName: hvBus.name,
            fromPosition: [node.lat, node.long],
            toPosition: [hvBus.lat, hvBus.long],
          });
        }
      }

      // Connection to MV bus
      if (data.mvBusId) {
        const mvBus = busMap.get(data.mvBusId);
        if (mvBus) {
          connections.push({
            id: `${node.id}-mv-${data.mvBusId}`,
            nodeId: node.id,
            nodeType: node.type,
            nodeName: node.name,
            busId: data.mvBusId,
            busName: mvBus.name,
            fromPosition: [node.lat, node.long],
            toPosition: [mvBus.lat, mvBus.long],
          });
        }
      }

      // Connection to LV bus
      if (data.lvBusId) {
        const lvBus = busMap.get(data.lvBusId);
        if (lvBus) {
          connections.push({
            id: `${node.id}-lv-${data.lvBusId}`,
            nodeId: node.id,
            nodeType: node.type,
            nodeName: node.name,
            busId: data.lvBusId,
            busName: lvBus.name,
            fromPosition: [node.lat, node.long],
            toPosition: [lvBus.lat, lvBus.long],
          });
        }
      }
    }
    // All other node types - single connection to busId
    else {
      if (node.busId && node.bus) {
        connections.push({
          id: `${node.id}-${node.busId}`,
          nodeId: node.id,
          nodeType: node.type,
          nodeName: node.name,
          busId: node.busId,
          busName: node.bus.name,
          fromPosition: [node.lat, node.long],
          toPosition: [node.bus.lat, node.bus.long],
        });
      }
    }
  }

  return connections;
}

