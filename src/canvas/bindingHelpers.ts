import type { Node } from 'reactflow';

/**
 * Generic helper to update node data
 */
export const updateNodeData = (
  nodes: Node[],
  nodeId: string,
  dataUpdate: Record<string, unknown>,
): Node[] => {
  return nodes.map((n) =>
    n.id === nodeId ? { ...n, data: { ...(n.data as Record<string, unknown>), ...dataUpdate } } : n,
  );
};

/**
 * Bind a bus to a line node (sets fromBusId or toBusId)
 */
export const bindBusToLine = (
  nodes: Node[],
  bus: Node,
  line: Node,
  handleId: string | null | undefined,
  onUpdateNodes: (nodes: Node[]) => void,
): void => {
  if (handleId === 'from') {
    onUpdateNodes(updateNodeData(nodes, line.id, { fromBusId: bus.id }));
  } else if (handleId === 'to') {
    onUpdateNodes(updateNodeData(nodes, line.id, { toBusId: bus.id }));
  }
};

/**
 * Bind a bus to a DC line node (sets fromBusId or toBusId)
 */
export const bindBusToDcLine = (
  nodes: Node[],
  bus: Node,
  dcline: Node,
  handleId: string | null | undefined,
  onUpdateNodes: (nodes: Node[]) => void,
): void => {
  if (handleId === 'from') {
    onUpdateNodes(updateNodeData(nodes, dcline.id, { fromBusId: bus.id }));
  } else if (handleId === 'to') {
    onUpdateNodes(updateNodeData(nodes, dcline.id, { toBusId: bus.id }));
  }
};

/**
 * Bind a bus to bus-bound equipment (sets busId)
 */
export const bindBusToEquipment = (
  nodes: Node[],
  bus: Node,
  equipment: Node,
  onUpdateNodes: (nodes: Node[]) => void,
): void => {
  onUpdateNodes(updateNodeData(nodes, equipment.id, { busId: bus.id }));
};

