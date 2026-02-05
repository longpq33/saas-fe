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
import { createDefaultLineData } from '../nodes/line/defaults';
import { LineNode } from '../nodes/line/LineNode';
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
import { DcBusNode } from '../nodes/dc_bus/DcBusNode';
import { DcLineNode } from '../nodes/dcline/DcLineNode';
import { DcLoadNode } from '../nodes/dc_load/DcLoadNode';
import { DcSourceNode } from '../nodes/dc_source/DcSourceNode';
import { AsymmetricLoadNode } from '../nodes/asymmetric_load/AsymmetricLoadNode';
import { AsymmetricSGenNode } from '../nodes/asymmetric_sgen/AsymmetricSGenNode';
import { ImpedanceNode } from '../nodes/impedance/ImpedanceNode';
import { WardNode } from '../nodes/ward/WardNode';
import { XWardNode } from '../nodes/xward/XWardNode';
import { MeasurementNode } from '../nodes/measurement/MeasurementNode';
import { HvdcLinkNode } from '../nodes/hvdc_link/HvdcLinkNode';
import { createEdgeData } from './edgeCreationStrategies';
import {
  extractConnectionParams,
  handleBusToLineAutoBind,
  handleBusToEquipmentAutoBind,
  handleSwitchAutoBind,
  handleTrafo3WAutoBind,
} from './autoBindHandlers';
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
      line: LineNode,
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
      dc_bus: DcBusNode,
      dcline: DcLineNode,
      dc_load: DcLoadNode,
      dc_source: DcSourceNode,
      asymmetric_load: AsymmetricLoadNode,
      asymmetric_sgen: AsymmetricSGenNode,
      impedance: ImpedanceNode,
      ward: WardNode,
      xward: XWardNode,
      measurement: MeasurementNode,
      hvdc_link: HvdcLinkNode,
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
      const removedEdgeIds = changes.filter((c) => c.type === 'remove').map((c) => c.id);
      const removedEdges = removedEdgeIds.length ? edges.filter((e) => removedEdgeIds.includes(e.id)) : [];

      const attachTypes = new Set([
        'ext_grid',
        'load',
        'gen',
        'sgen',
        'motor',
        'shunt',
        'storage',
        'switch',
        'line',
        'dc_bus',
        'dcline',
        'dc_load',
        'dc_source',
        'asymmetric_load',
        'asymmetric_sgen',
        'impedance',
        'ward',
        'xward',
        'measurement',
        'hvdc_link',
      ]);

      // For each removed attach edge, clear binding fields on the node if it no longer
      // has any remaining attach edge connected to a bus.
      const equipmentIdsToMaybeClear = new Set<string>();

      for (const e of removedEdges) {
        const data = (e.data ?? {}) as Record<string, unknown>;
        if (String(data.kind) !== 'attach') continue;
        const attachType = String(data.attach_type ?? '');
        if (!attachTypes.has(attachType)) continue;

        const srcNode = nodes.find((n) => n.id === e.source);
        const tgtNode = nodes.find((n) => n.id === e.target);
        if (!srcNode || !tgtNode) continue;

        // identify equipment endpoint by attach_type
        if (srcNode.type === attachType) {
          equipmentIdsToMaybeClear.add(srcNode.id);
        } else if (tgtNode.type === attachType) {
          equipmentIdsToMaybeClear.add(tgtNode.id);
        }
      }

      if (equipmentIdsToMaybeClear.size > 0) {
        const edgesAfterRemoval = applyEdgeChanges(changes, edges);

        const shouldClear = (equipmentId: string) => {
          // If there is any remaining attach edge between this equipment and a bus, keep busId.
          return !edgesAfterRemoval.some((e) => {
            const data = (e.data ?? {}) as Record<string, unknown>;
            if (String(data.kind) !== 'attach') return false;
            const attachType = String(data.attach_type ?? '');
            const n1 = nodes.find((n) => n.id === e.source);
            const n2 = nodes.find((n) => n.id === e.target);
            if (!n1 || !n2) return false;
            if (attachType !== n1.type && attachType !== n2.type) return false;
            const hasEquipment = e.source === equipmentId || e.target === equipmentId;
            const hasBus = n1.type === 'bus' || n2.type === 'bus';
            return hasEquipment && hasBus;
          });
        };

        const nextNodes = nodes.map((n) => {
          if (!equipmentIdsToMaybeClear.has(n.id)) return n;
          if (!shouldClear(n.id)) return n;
          return { ...n, data: { ...(n.data as Record<string, unknown>), busId: '' } };
        });

        onUpdateNodes(nextNodes);
        onUpdateEdges(edgesAfterRemoval);
        return;
      }

      onUpdateEdges(applyEdgeChanges(changes, edges));
    },
    [edges, nodes, onUpdateEdges, onUpdateNodes],
  );

  const onConnect = useCallback(
    (params: Edge | Connection) => {
      const { sourceNode, targetNode, sourceHandle, targetHandle } = extractConnectionParams(params, nodes);
      if (!sourceNode || !targetNode) return;

      // Create edge using strategy pattern
      const edgeData = createEdgeData(sourceNode, targetNode);
      const nextEdges = addEdge(
        {
          ...params,
          animated: false,
          data: edgeData,
        },
        edges,
      );
      onUpdateEdges(nextEdges);

      // Auto-bind handlers (lightweight, do not block edge creation)
      handleBusToLineAutoBind(sourceNode, targetNode, sourceHandle, targetHandle, nodes, onUpdateNodes);
      handleBusToEquipmentAutoBind(sourceNode, targetNode, nodes, onUpdateNodes);
      handleSwitchAutoBind(sourceNode, targetNode, sourceHandle, targetHandle, params, edges, nodes, onUpdateEdges, onUpdateNodes);
      handleTrafo3WAutoBind(sourceNode, targetNode, sourceHandle, targetHandle, nodes, onUpdateNodes);
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
        case 'line':
          defaultData = createDefaultLineData();
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

