import { addEdge } from 'reactflow';
import type { Connection, Edge, Node } from 'reactflow';

import {
  isBus,
  isLineNode,
  isDcLineNode,
  isBusBound,
  isSwitch,
  isElement,
  isTrafo3W,
} from './nodeTypeHelpers';
import { bindBusToLine, bindBusToDcLine, bindBusToEquipment, updateNodeData } from './bindingHelpers';

/**
 * Extract connection parameters from Edge or Connection
 */
export const extractConnectionParams = (
  params: Edge | Connection,
  nodes: Node[],
): {
  sourceNode: Node | undefined;
  targetNode: Node | undefined;
  sourceHandle: string | null | undefined;
  targetHandle: string | null | undefined;
} => {
  const source = (params as Connection).source ?? (params as Edge).source;
  const target = (params as Connection).target ?? (params as Edge).target;
  const sourceHandle = (params as Connection).sourceHandle ?? (params as Edge).sourceHandle;
  const targetHandle = (params as Connection).targetHandle ?? (params as Edge).targetHandle;

  const sourceNode = nodes.find((n) => n.id === source);
  const targetNode = nodes.find((n) => n.id === target);

  return { sourceNode, targetNode, sourceHandle, targetHandle };
};

/**
 * Handle auto-binding between bus and line nodes
 */
export const handleBusToLineAutoBind = (
  source: Node,
  target: Node,
  sourceHandle: string | null | undefined,
  targetHandle: string | null | undefined,
  nodes: Node[],
  onUpdateNodes: (nodes: Node[]) => void,
): void => {
  if (isBus(source) && isLineNode(target)) {
    if (isDcLineNode(target)) {
      bindBusToDcLine(nodes, source, target, targetHandle, onUpdateNodes);
    } else {
      bindBusToLine(nodes, source, target, targetHandle, onUpdateNodes);
    }
  } else if (isBus(target) && isLineNode(source)) {
    if (isDcLineNode(source)) {
      bindBusToDcLine(nodes, target, source, sourceHandle, onUpdateNodes);
    } else {
      bindBusToLine(nodes, target, source, sourceHandle, onUpdateNodes);
    }
  }
};

/**
 * Handle auto-binding between bus and bus-bound equipment
 */
export const handleBusToEquipmentAutoBind = (
  source: Node,
  target: Node,
  nodes: Node[],
  onUpdateNodes: (nodes: Node[]) => void,
): void => {
  let busId: string | undefined;
  let equipmentId: string | undefined;

  if (isBus(source) && isBusBound(target)) {
    busId = source.id;
    equipmentId = target.id;
  } else if (isBus(target) && isBusBound(source)) {
    busId = target.id;
    equipmentId = source.id;
  }

  if (busId && equipmentId) {
    const bus = nodes.find((n) => n.id === busId);
    const equipment = nodes.find((n) => n.id === equipmentId);
    if (bus && equipment) {
      bindBusToEquipment(nodes, bus, equipment, onUpdateNodes);
    }
  }
};

/**
 * Handle auto-binding for switch connections
 */
export const handleSwitchAutoBind = (
  source: Node,
  target: Node,
  sourceHandle: string | null | undefined,
  targetHandle: string | null | undefined,
  params: Edge | Connection,
  edges: Edge[],
  nodes: Node[],
  onUpdateEdges: (edges: Edge[]) => void,
  onUpdateNodes: (nodes: Node[]) => void,
): void => {
  // Bus <-> Switch (attach + bind busId)
  if (isBus(source) && isSwitch(target) && targetHandle === 'bus') {
    const nextEdges = addEdge(
      {
        ...params,
        animated: false,
        data: { kind: 'attach', attach_type: 'switch' },
      },
      edges,
    );
    onUpdateEdges(nextEdges);
    onUpdateNodes(updateNodeData(nodes, target.id, { busId: source.id }));
  } else if (isBus(target) && isSwitch(source) && sourceHandle === 'bus') {
    const nextEdges = addEdge(
      {
        ...params,
        animated: false,
        data: { kind: 'attach', attach_type: 'switch' },
      },
      edges,
    );
    onUpdateEdges(nextEdges);
    onUpdateNodes(updateNodeData(nodes, source.id, { busId: target.id }));
  }

  // Switch <-> Element (switch -> element via "element" handle)
  // NOTE: In this app, "line" is a ReactFlow EDGE, not a NODE.
  // So we can only auto-bind to transformer/bus nodes here. Binding a switch to a line-edge
  // must be done using the currently selected edge (handled outside this onConnect flow).
  if (isSwitch(source) && isElement(target) && sourceHandle === 'element') {
    const elementType = target.type === 'transformer' ? 'trafo' : 'bus';
    onUpdateNodes(
      updateNodeData(nodes, source.id, {
        elementId: target.id,
        elementType,
      }),
    );
  } else if (isSwitch(target) && isElement(source) && targetHandle === 'element') {
    const elementType = source.type === 'transformer' ? 'trafo' : 'bus';
    onUpdateNodes(
      updateNodeData(nodes, target.id, {
        elementId: source.id,
        elementType,
      }),
    );
  }
};

/**
 * Handle auto-binding for three-winding transformer connections
 */
export const handleTrafo3WAutoBind = (
  source: Node,
  target: Node,
  sourceHandle: string | null | undefined,
  targetHandle: string | null | undefined,
  nodes: Node[],
  onUpdateNodes: (nodes: Node[]) => void,
): void => {
  // Auto-bind hvBusId/mvBusId/lvBusId for trafo3w
  if (isBus(source) && isTrafo3W(target)) {
    if (targetHandle?.startsWith('hv_')) {
      onUpdateNodes(updateNodeData(nodes, target.id, { hvBusId: source.id }));
    } else if (targetHandle?.startsWith('mv_')) {
      onUpdateNodes(updateNodeData(nodes, target.id, { mvBusId: source.id }));
    } else if (targetHandle?.startsWith('lv_')) {
      onUpdateNodes(updateNodeData(nodes, target.id, { lvBusId: source.id }));
    }
  } else if (isBus(target) && isTrafo3W(source)) {
    if (sourceHandle?.startsWith('hv_')) {
      onUpdateNodes(updateNodeData(nodes, source.id, { hvBusId: target.id }));
    } else if (sourceHandle?.startsWith('mv_')) {
      onUpdateNodes(updateNodeData(nodes, source.id, { mvBusId: target.id }));
    } else if (sourceHandle?.startsWith('lv_')) {
      onUpdateNodes(updateNodeData(nodes, source.id, { lvBusId: target.id }));
    }
  }
};

