import type { Node } from 'reactflow';

import { createDefaultLineEdgeData } from '../edges/line/defaults';
import { isBus, isLineNode, isBusBound } from './nodeTypeHelpers';

/**
 * Strategy function type for edge creation
 */
type EdgeCreationStrategy = (source: Node, target: Node) => Record<string, unknown> | null;

/**
 * Strategy 1: Bus to Bus connection
 * Creates a line edge between two buses
 */
const busToBusStrategy: EdgeCreationStrategy = (source, target) => {
  if (isBus(source) && isBus(target)) {
    return { ...createDefaultLineEdgeData(), kind: 'line' };
  }
  return null;
};

/**
 * Strategy 2: One-way connections
 * Handles one-way connections like ext_grid -> bus, dc_source -> dc_bus
 */
const oneWayConnectionStrategy: EdgeCreationStrategy = (source, target) => {
  const oneWayMap: Record<string, string[]> = {
    ext_grid: ['bus', 'dc_bus'],
    dc_source: ['dc_bus'],
  };

  if (source.type && target.type) {
    const allowedTargets = oneWayMap[source.type];
    if (allowedTargets && allowedTargets.includes(target.type)) {
      return { kind: 'attach', attach_type: source.type };
    }
  }
  return null;
};

/**
 * Strategy 3: Bus to Line connection
 * Handles connections between bus and line nodes (line, dcline, impedance, hvdc_link)
 */
const busToLineStrategy: EdgeCreationStrategy = (source, target) => {
  if (isBus(source) && isLineNode(target)) {
    // For regular line, use 'line' as attach_type, otherwise use the line type
    const attachType = target.type === 'line' ? 'line' : target.type;
    return { kind: 'attach', attach_type: attachType };
  }
  if (isBus(target) && isLineNode(source)) {
    const attachType = source.type === 'line' ? 'line' : source.type;
    return { kind: 'attach', attach_type: attachType };
  }
  return null;
};

/**
 * Strategy 4: DC Bus to DC Equipment connection
 * Handles connections between dc_bus and dc_load/dc_source
 */
const dcBusToEquipmentStrategy: EdgeCreationStrategy = (source, target) => {
  if (
    (source.type === 'dc_bus' && (target.type === 'dc_load' || target.type === 'dc_source')) ||
    (target.type === 'dc_bus' && (source.type === 'dc_load' || source.type === 'dc_source'))
  ) {
    return { kind: 'attach', attach_type: target.type === 'dc_bus' ? source.type : target.type };
  }
  return null;
};

/**
 * Strategy 5: Bus to Bus-bound Equipment connection
 * Handles connections between bus and bus-bound equipment (loads, generators, etc.)
 */
const busToEquipmentStrategy: EdgeCreationStrategy = (source, target) => {
  if (isBus(source) && isBusBound(target)) {
    return { kind: 'attach', attach_type: target.type };
  }
  if (isBus(target) && isBusBound(source)) {
    return { kind: 'attach', attach_type: source.type };
  }
  return null;
};

/**
 * All edge creation strategies in priority order
 */
const strategies: EdgeCreationStrategy[] = [
  busToBusStrategy,
  oneWayConnectionStrategy,
  busToLineStrategy,
  dcBusToEquipmentStrategy,
  busToEquipmentStrategy,
];

/**
 * Create edge data based on source and target nodes
 * Uses strategy pattern to determine the appropriate edge type
 */
export const createEdgeData = (source: Node, target: Node): Record<string, unknown> => {
  for (const strategy of strategies) {
    const result = strategy(source, target);
    if (result) {
      return result;
    }
  }

  // Default: UI edge (no special connection)
  return { kind: 'ui' };
};

