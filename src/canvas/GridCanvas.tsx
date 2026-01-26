import { useCallback, useMemo } from 'react';
import ReactFlow, {
  Background,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  useReactFlow,
  ReactFlowProvider,
} from 'reactflow';
import type { Connection, Edge, Node, NodeChange, EdgeChange } from 'reactflow';

import { createDefaultBusData } from '../nodes/bus/defaults';
import { BusNode } from '../nodes/bus/BusNode';
import { createDefaultLoadData } from '../nodes/load/defaults';
import { LoadNode } from '../nodes/load/LoadNode';
import { createDefaultTransformerData } from '../nodes/transformer/defaults';
import { TransformerNode } from '../nodes/transformer/TransformerNode';
import { createDefaultExtGridData } from '../nodes/ext_grid/defaults';
import { ExtGridNode } from '../nodes/ext_grid/ExtGridNode';
import { createDefaultGenData } from '../nodes/gen/defaults';
import { GenNode } from '../nodes/gen/GenNode';
import { createDefaultSGenData } from '../nodes/sgen/defaults';
import { SGenNode } from '../nodes/sgen/SGenNode';
import { createDefaultSwitchData } from '../nodes/switch/defaults';
import { SwitchNode } from '../nodes/switch/SwitchNode';
import { createDefaultMotorData } from '../nodes/motor/defaults';
import { MotorNode } from '../nodes/motor/MotorNode';
import { createDefaultShuntData } from '../nodes/shunt/defaults';
import { ShuntNode } from '../nodes/shunt/ShuntNode';
import { createDefaultStorageData } from '../nodes/storage/defaults';
import { StorageNode } from '../nodes/storage/StorageNode';
import { createDefaultTrafo3WData } from '../nodes/trafo3w/defaults';
import { Trafo3WNode } from '../nodes/trafo3w/Trafo3WNode';
import 'reactflow/dist/style.css';
import styled from 'styled-components';

const CanvasWrapper = styled.div`
  height: 100%;
  width: 100%;
  background: #fff;
  border: 1px solid #1f2937;
  border-radius: 8px;
  overflow: hidden;
`;


type GridCanvasProps = {
  nodes: Node[];
  edges: Edge[];
  onUpdateNodes: (nodes: Node[]) => void;
  onUpdateEdges: (edges: Edge[]) => void;
  onSelect?: (selection?: { kind: 'node'; id: string } | { kind: 'edge'; id: string }) => void;
};

const GridCanvasInner = ({ nodes, edges, onUpdateNodes, onUpdateEdges, onSelect }: GridCanvasProps) => {
  const { screenToFlowPosition } = useReactFlow();

  const nodeTypes = useMemo(
    () => ({
      bus: BusNode,
      load: LoadNode,
      transformer: TransformerNode,
      ext_grid: ExtGridNode,
      gen: GenNode,
      sgen: SGenNode,
      switch: SwitchNode,
      motor: MotorNode,
      shunt: ShuntNode,
      storage: StorageNode,
      trafo3w: Trafo3WNode,
    }),
    [],
  );

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      onUpdateNodes(applyNodeChanges(changes, nodes));
    },
    [nodes, onUpdateNodes],
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      onUpdateEdges(applyEdgeChanges(changes, edges));
    },
    [edges, onUpdateEdges],
  );

  const onConnect = useCallback(
    (params: Edge | Connection) => {
      const nextEdges = addEdge({ ...params, animated: true }, edges);
      onUpdateEdges(nextEdges);

      const source = (params as Connection).source ?? (params as Edge).source;
      const target = (params as Connection).target ?? (params as Edge).target;
      if (!source || !target) return;

      const sourceNode = nodes.find((n) => n.id === source);
      const targetNode = nodes.find((n) => n.id === target);
      if (!sourceNode || !targetNode) return;

      const sourceHandle = (params as Connection).sourceHandle ?? (params as Edge).sourceHandle;
      const targetHandle = (params as Connection).targetHandle ?? (params as Edge).targetHandle;

      const isBus = (n: Node) => n.type === 'bus';
      const isBusBound = (n: Node) => n.type === 'load' || n.type === 'gen' || n.type === 'sgen' || n.type === 'ext_grid' || n.type === 'motor' || n.type === 'shunt' || n.type === 'storage';
      const isSwitch = (n: Node) => n.type === 'switch';
      const isElement = (n: Node) => n.type === 'line' || n.type === 'trafo' || n.type === 'bus';
      const isTrafo3W = (n: Node) => n.type === 'trafo3w';

      // Auto-bind busId for load/gen/sgen/ext_grid
      let busId: string | undefined;
      let otherId: string | undefined;

      if (isBus(sourceNode) && isBusBound(targetNode)) {
        busId = sourceNode.id;
        otherId = targetNode.id;
      } else if (isBus(targetNode) && isBusBound(sourceNode)) {
        busId = targetNode.id;
        otherId = sourceNode.id;
      }

      if (busId && otherId) {
        onUpdateNodes(
          nodes.map((n) => {
            if (n.id !== otherId) return n;
            return { ...n, data: { ...(n.data as Record<string, unknown>), busId } };
          }),
        );
      }

      // Auto-bind busId for switch (bus -> switch via "bus" handle)
      if (isBus(sourceNode) && isSwitch(targetNode) && targetHandle === 'bus') {
        onUpdateNodes(
          nodes.map((n) => {
            if (n.id !== targetNode.id) return n;
            return { ...n, data: { ...(n.data as Record<string, unknown>), busId: sourceNode.id } };
          }),
        );
      } else if (isBus(targetNode) && isSwitch(sourceNode) && sourceHandle === 'bus') {
        onUpdateNodes(
          nodes.map((n) => {
            if (n.id !== sourceNode.id) return n;
            return { ...n, data: { ...(n.data as Record<string, unknown>), busId: targetNode.id } };
          }),
        );
      }

      // Auto-bind elementId + elementType for switch (switch -> element via "element" handle)
      if (isSwitch(sourceNode) && isElement(targetNode) && sourceHandle === 'element') {
        const elementType = targetNode.type === 'line' ? 'line' : targetNode.type === 'trafo' ? 'trafo' : 'bus';
        onUpdateNodes(
          nodes.map((n) => {
            if (n.id !== sourceNode.id) return n;
            return {
              ...n,
              data: {
                ...(n.data as Record<string, unknown>),
                elementId: targetNode.id,
                elementType,
              },
            };
          }),
        );
      } else if (isSwitch(targetNode) && isElement(sourceNode) && targetHandle === 'element') {
        const elementType = sourceNode.type === 'line' ? 'line' : sourceNode.type === 'trafo' ? 'trafo' : 'bus';
        onUpdateNodes(
          nodes.map((n) => {
            if (n.id !== targetNode.id) return n;
            return {
              ...n,
              data: {
                ...(n.data as Record<string, unknown>),
                elementId: sourceNode.id,
                elementType,
              },
            };
          }),
        );
      }

      // Auto-bind hvBusId/mvBusId/lvBusId for trafo3w
      if (isBus(sourceNode) && isTrafo3W(targetNode)) {
        if (targetHandle?.startsWith('hv_')) {
          onUpdateNodes(
            nodes.map((n) => {
              if (n.id !== targetNode.id) return n;
              return { ...n, data: { ...(n.data as Record<string, unknown>), hvBusId: sourceNode.id } };
            }),
          );
        } else if (targetHandle?.startsWith('mv_')) {
          onUpdateNodes(
            nodes.map((n) => {
              if (n.id !== targetNode.id) return n;
              return { ...n, data: { ...(n.data as Record<string, unknown>), mvBusId: sourceNode.id } };
            }),
          );
        } else if (targetHandle?.startsWith('lv_')) {
          onUpdateNodes(
            nodes.map((n) => {
              if (n.id !== targetNode.id) return n;
              return { ...n, data: { ...(n.data as Record<string, unknown>), lvBusId: sourceNode.id } };
            }),
          );
        }
      } else if (isBus(targetNode) && isTrafo3W(sourceNode)) {
        if (sourceHandle?.startsWith('hv_')) {
          onUpdateNodes(
            nodes.map((n) => {
              if (n.id !== sourceNode.id) return n;
              return { ...n, data: { ...(n.data as Record<string, unknown>), hvBusId: targetNode.id } };
            }),
          );
        } else if (sourceHandle?.startsWith('mv_')) {
          onUpdateNodes(
            nodes.map((n) => {
              if (n.id !== sourceNode.id) return n;
              return { ...n, data: { ...(n.data as Record<string, unknown>), mvBusId: targetNode.id } };
            }),
          );
        } else if (sourceHandle?.startsWith('lv_')) {
          onUpdateNodes(
            nodes.map((n) => {
              if (n.id !== sourceNode.id) return n;
              return { ...n, data: { ...(n.data as Record<string, unknown>), lvBusId: targetNode.id } };
            }),
          );
        }
      }
    },
    [edges, nodes, onUpdateEdges, onUpdateNodes],
  );

  const onSelectionChange = useCallback(
    ({ nodes: selectedNodes, edges: selectedEdges }: { nodes: Node[]; edges: Edge[] }) => {
      const firstEdge = selectedEdges?.[0];
      if (firstEdge) {
        onSelect?.({ kind: 'edge', id: firstEdge.id });
        return;
      }

      const firstNode = selectedNodes?.[0];
      if (firstNode) {
        onSelect?.({ kind: 'node', id: firstNode.id });
        return;
      }

      onSelect?.(undefined);
    },
    [onSelect],
  );

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      const type = event.dataTransfer.getData('application/reactflow');
      if (!type) return;

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const id = `${type}-${Date.now()}`;
      
      let defaultData;
      switch (type) {
        case 'bus':
          defaultData = createDefaultBusData();
          break;
        case 'load':
          defaultData = createDefaultLoadData();
          break;
        case 'transformer':
          defaultData = createDefaultTransformerData();
          break;
        case 'ext_grid':
          defaultData = createDefaultExtGridData();
          break;
        case 'gen':
          defaultData = createDefaultGenData();
          break;
        case 'sgen':
          defaultData = createDefaultSGenData();
          break;
        case 'switch':
          defaultData = createDefaultSwitchData();
          break;
        case 'motor':
          defaultData = createDefaultMotorData();
          break;
        case 'shunt':
          defaultData = createDefaultShuntData();
          break;
        case 'storage':
          defaultData = createDefaultStorageData();
          break;
        case 'trafo3w':
          defaultData = createDefaultTrafo3WData();
          break;
        default:
          defaultData = { label: type };
      }

      const newNode = {
        id,
        type,
        position,
        data: defaultData,
      };
      onUpdateNodes([...nodes, newNode]);
    },
    [nodes, onUpdateNodes, screenToFlowPosition],
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  return (
    <CanvasWrapper>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onSelectionChange={onSelectionChange}
        nodeTypes={nodeTypes}
        fitView
        onDrop={onDrop}
        onDragOver={onDragOver}
        proOptions={{ hideAttribution: true }}
      >
        <Background gap={16} size={1} color="#1469df" />
      </ReactFlow>
    </CanvasWrapper>
  );
};

export const GridCanvas = (props: GridCanvasProps) => {
  return (
    <ReactFlowProvider>
      <GridCanvasInner {...props} />
    </ReactFlowProvider>
  );
};

