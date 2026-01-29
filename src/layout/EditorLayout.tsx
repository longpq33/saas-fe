/* eslint-disable @typescript-eslint/no-unused-vars */
import { Layout } from 'antd';
import styled from 'styled-components';
import { LeftPalette } from './LeftPalette';
import { TopBar } from './TopBar';
import { GridCanvas } from '../canvas/GridCanvas';
import { RightInspector } from './RightInspector';
import { useCallback, useState } from 'react';
import type { Edge, Node } from 'reactflow';

const { Header, Sider, Content, 
} = Layout;

const StyledLayout = styled(Layout)`
  min-height: 100vh;
  background: #fff;
  color: #e6e9f0;
`;

const PanelWrapper = styled.div`
  height: calc(100vh - 55px);
  padding: 8px;
`;

type EditorLayoutProps = {
  initialNodes?: Node[];
  initialEdges?: Edge[];
  resetKey?: number;
  resultsPanel?: React.ReactNode;
  isSimulating?: boolean;
  onNew?: () => void;
  onSave?: () => void;
  onExport?: () => void;
  onImport?: () => void;
  onUndo?: () => void;
  onRedo?: () => void;
  onValidate?: () => void;
  onRun?: (payload: { nodes: Node[]; edges: Edge[] }) => void;
  onFit?: () => void;
};

export const EditorLayout = (props: EditorLayoutProps) => {
  const { initialNodes = [], initialEdges = [] } = props;
  const [selection, setSelection] = useState<{ kind: 'node'; id: string } | { kind: 'edge'; id: string }>();
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  const handleNew = useCallback(() => {
    setSelection(undefined);
    setNodes([]);
    setEdges([]);
    props.onNew?.();
  }, [props]);

  const selectedNode = selection?.kind === 'node' ? nodes.find((n) => n.id === selection.id) : undefined;
  const selectedEdge = selection?.kind === 'edge' ? edges.find((e) => e.id === selection.id) : undefined;

  const updateSelection = useCallback((next?: { kind: 'node'; id: string } | { kind: 'edge'; id: string }) => {
    setSelection(next);
  }, []);

  const updateNodes = useCallback((next: Node[]) => {
    setNodes(next);
  }, []);

  const updateEdges = useCallback((next: Edge[]) => {
    setEdges(next);
  }, []);

  return (
    <StyledLayout>
      <Header style={{ padding: 0, background: '#0f1115' }}>
        <TopBar
          {...props}
          onNew={handleNew}
          onRun={
            props.onRun
              ? () => {
                  props.onRun?.({ nodes, edges });
                }
              : undefined
          }
          isSimulating={props.isSimulating}
        />
      </Header>
      <Layout style={{ background: '#024A70' }}>
        <Sider width={250} style={{ background: '#024A70', padding: '8px', overflow: 'hidden', height: 'calc(100vh - 70px)' }}>
          <LeftPalette />
        </Sider>
        <Content style={{ background: '#024A70'}}>
          <PanelWrapper>
            <GridCanvas 
                nodes={nodes}
                edges={edges}
                onUpdateNodes={updateNodes}
                onUpdateEdges={updateEdges}
                onSelect={updateSelection}
              />
          </PanelWrapper>
        </Content>
        <Sider width={250} style={{ background: '#024A70', padding: '8px', height: 'calc(100vh - 70px)',  overflow: 'hidden', }}>
          <RightInspector
            selectionNode={selectedNode}
            selectionEdge={selectedEdge}
            nodes={nodes}
            edges={edges}
            onUpdateNodes={updateNodes}
            onUpdateEdges={updateEdges}
          />
        </Sider>
      </Layout>
    </StyledLayout>
  );
};

