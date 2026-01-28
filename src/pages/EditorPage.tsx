import { useMutation } from '@tanstack/react-query';
import { message } from 'antd';
import { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import type { Edge, Node } from 'reactflow';

import { simulate, type SimulateResponse } from '../api/simulate';
import { ResultsModal } from '../components/ResultsModal';
import { EditorLayout } from '../layout/EditorLayout';

type EditorRouteState = {
  diagramData?: {
    nodes: Node[];
    edges: Edge[];
  };
  filename?: string;
};

export const EditorPage = () => {
  const location = useLocation();
  const routeState = location.state as EditorRouteState | null;

  const initialDiagram = useMemo(() => {
    return {
      nodes: routeState?.diagramData?.nodes ?? [],
      edges: routeState?.diagramData?.edges ?? [],
    };
  }, [routeState?.diagramData?.edges, routeState?.diagramData?.nodes]);

  const [resultsModalOpen, setResultsModalOpen] = useState(false);
  const [lastResponse, setLastResponse] = useState<SimulateResponse | null>(null);

  const handleStub = (action: string) => () => {
    message.info(`${action} (stub)`);
  };

  const simulateMutation = useMutation({
    mutationFn: async (payload: { nodes: Node[]; edges: Edge[] }) => {
      setResultsModalOpen(false);
      setLastResponse(null);
      return simulate({
        nodes: payload.nodes.map((n) => ({ id: n.id, type: n.type ?? '', data: n.data })),
        edges: payload.edges.map((e) => ({
          id: e.id,
          source: e.source,
          target: e.target,
          data: e.data,
        })),
        settings: {
          return_network: 'tables',
        },
      });
    },
    onSuccess: (res) => {
      setLastResponse(res);
      setResultsModalOpen(true);
    },
    onError: (err: unknown) => {
      const errorMessage = err instanceof Error ? err.message : 'Lỗi không xác định';
      message.error({
        content: `Mô phỏng thất bại: ${errorMessage}`,
        key: 'sim',
        duration: 6,
      });
    },
  });

  const [resetKey, setResetKey] = useState(0);

  const handleNew = () => {
    setResetKey((k) => k + 1);
    setLastResponse(null);
    setResultsModalOpen(false);
  };

  const handleRun = (payload: { nodes: Node[]; edges: Edge[] }) => {
    simulateMutation.mutate(payload);
  };

  return (
    <>
      <EditorLayout
        resetKey={resetKey}
        initialNodes={initialDiagram.nodes}
        initialEdges={initialDiagram.edges}
        onNew={handleNew}
        onSave={handleStub('Save')}
        onExport={handleStub('Export')}
        onImport={handleStub('Import')}
        onUndo={handleStub('Undo')}
        onRedo={handleStub('Redo')}
        onValidate={handleStub('Validate')}
        onRun={handleRun}
        onFit={handleStub('Fit')}
      />
      {lastResponse && resultsModalOpen && (
        <ResultsModal
          response={lastResponse}
          open={resultsModalOpen}
          onClose={() => setResultsModalOpen(false)}
        />
      )}
    </>
  );
};

