import { Card, Empty, Tabs } from 'antd';
import type { Edge, Node } from 'reactflow';

import { LineConfigForm } from '../edges/line/LineConfigForm';
import { createDefaultLineEdgeData } from '../edges/line/defaults';
import type { LineEdgeData } from '../edges/line/types';

import { BusConfigForm } from '../nodes/bus/BusConfigForm';
import { createDefaultBusData } from '../nodes/bus/defaults';
import type { BusData } from '../nodes/bus/types';

import { LoadConfigForm } from '../nodes/load/LoadConfigForm';
import { createDefaultLoadData } from '../nodes/load/defaults';
import type { LoadData } from '../nodes/load/types';

import { TransformerConfigForm } from '../nodes/transformer/TransformerConfigForm';
import { createDefaultTransformerData } from '../nodes/transformer/defaults';
import type { TransformerData } from '../nodes/transformer/types';

import { ExtGridConfigForm } from '../nodes/ext_grid/ExtGridConfigForm';
import { createDefaultExtGridData } from '../nodes/ext_grid/defaults';
import type { ExtGridData } from '../nodes/ext_grid/types';

import { GenConfigForm } from '../nodes/gen/GenConfigForm';
import { createDefaultGenData } from '../nodes/gen/defaults';
import type { GenData } from '../nodes/gen/types';

import { SGenConfigForm } from '../nodes/sgen/SGenConfigForm';
import { createDefaultSGenData } from '../nodes/sgen/defaults';
import type { SGenData } from '../nodes/sgen/types';

import { SwitchConfigForm } from '../nodes/switch/SwitchConfigForm';
import { createDefaultSwitchData } from '../nodes/switch/defaults';
import type { SwitchData } from '../nodes/switch/types';

import { MotorConfigForm } from '../nodes/motor/MotorConfigForm';
import { createDefaultMotorData } from '../nodes/motor/defaults';
import type { MotorData } from '../nodes/motor/types';

import { ShuntConfigForm } from '../nodes/shunt/ShuntConfigForm';
import { createDefaultShuntData } from '../nodes/shunt/defaults';
import type { ShuntData } from '../nodes/shunt/types';

import { StorageConfigForm } from '../nodes/storage/StorageConfigForm';
import { createDefaultStorageData } from '../nodes/storage/defaults';
import type { StorageData } from '../nodes/storage/types';

import { Trafo3WConfigForm } from '../nodes/trafo3w/Trafo3WConfigForm';
import { createDefaultTrafo3WData } from '../nodes/trafo3w/defaults';
import type { Trafo3WData } from '../nodes/trafo3w/types';

type RightInspectorProps = {
  selectionNode?: Node;
  selectionEdge?: Edge;
  nodes: Node[];
  edges: Edge[];
  onUpdateNodes: (nodes: Node[]) => void;
  onUpdateEdges: (edges: Edge[]) => void;
};

export const RightInspector = ({
  selectionNode,
  selectionEdge,
  nodes,
  edges,
  onUpdateNodes,
  onUpdateEdges,
}: RightInspectorProps) => {
  return (
    <Card
      title=""
      size="small"
      bordered={false}
      bodyStyle={{ padding: 12, background: '#fff' }}
      style={{ background: '#fff', height: '100%' }}
    >
      <Tabs
        size="small"
        items={[
          {
            key: 'props',
            label: 'Parameters',
            children: (() => {
              if (selectionEdge) {
                return (
                  <LineConfigForm
                    key={selectionEdge.id}
                    value={(selectionEdge.data as LineEdgeData) ?? createDefaultLineEdgeData()}
                    onSubmit={(next) => {
                      onUpdateEdges(edges.map((e) => (e.id === selectionEdge.id ? { ...e, data: next } : e)));
                    }}
                  />
                );
              }

              if (!selectionNode) return <Empty description="Chọn một phần tử" />;

              const updateNode = (next: unknown) => {
                onUpdateNodes(nodes.map((n) => (n.id === selectionNode.id ? { ...n, data: next } : n)));
              };

              switch (selectionNode.type) {
                case 'bus':
                  return (
                    <BusConfigForm
                      key={selectionNode.id}
                      value={(selectionNode.data as BusData) ?? createDefaultBusData()}
                      onSubmit={updateNode as (v: BusData) => void}
                    />
                  );
                case 'load':
                  return (
                    <LoadConfigForm
                      key={selectionNode.id}
                      value={(selectionNode.data as LoadData) ?? createDefaultLoadData()}
                      onSubmit={updateNode as (v: LoadData) => void}
                    />
                  );
                case 'transformer':
                  return (
                    <TransformerConfigForm
                      key={selectionNode.id}
                      value={(selectionNode.data as TransformerData) ?? createDefaultTransformerData()}
                      onSubmit={updateNode as (v: TransformerData) => void}
                    />
                  );
                case 'ext_grid':
                  return (
                    <ExtGridConfigForm
                      key={selectionNode.id}
                      value={(selectionNode.data as ExtGridData) ?? createDefaultExtGridData()}
                      onSubmit={updateNode as (v: ExtGridData) => void}
                    />
                  );
                case 'gen':
                  return (
                    <GenConfigForm
                      key={selectionNode.id}
                      value={(selectionNode.data as GenData) ?? createDefaultGenData()}
                      onSubmit={updateNode as (v: GenData) => void}
                    />
                  );
                case 'sgen':
                  return (
                    <SGenConfigForm
                      key={selectionNode.id}
                      value={(selectionNode.data as SGenData) ?? createDefaultSGenData()}
                      onSubmit={updateNode as (v: SGenData) => void}
                    />
                  );
                case 'switch':
                  return (
                    <SwitchConfigForm
                      key={selectionNode.id}
                      value={(selectionNode.data as SwitchData) ?? createDefaultSwitchData()}
                      onSubmit={updateNode as (v: SwitchData) => void}
                    />
                  );
                case 'motor':
                  return (
                    <MotorConfigForm
                      key={selectionNode.id}
                      value={(selectionNode.data as MotorData) ?? createDefaultMotorData()}
                      onSubmit={updateNode as (v: MotorData) => void}
                    />
                  );
                case 'shunt':
                  return (
                    <ShuntConfigForm
                      key={selectionNode.id}
                      value={(selectionNode.data as ShuntData) ?? createDefaultShuntData()}
                      onSubmit={updateNode as (v: ShuntData) => void}
                    />
                  );
                case 'storage':
                  return (
                    <StorageConfigForm
                      key={selectionNode.id}
                      value={(selectionNode.data as StorageData) ?? createDefaultStorageData()}
                      onSubmit={updateNode as (v: StorageData) => void}
                    />
                  );
                case 'trafo3w':
                  return (
                    <Trafo3WConfigForm
                      key={selectionNode.id}
                      value={(selectionNode.data as Trafo3WData) ?? createDefaultTrafo3WData()}
                      onSubmit={updateNode as (v: Trafo3WData) => void}
                    />
                  );
                default:
                  return <Empty description="Chưa có form cho loại này" />;
              }
            })(),
          },
        ]}
      />
    </Card>
  );
};

