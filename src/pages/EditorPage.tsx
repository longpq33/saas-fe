import { useMutation } from '@tanstack/react-query';
import { message } from 'antd';
import { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import type { Edge, Node } from 'reactflow';

import { simulate, type SimulateResponse } from '../api/simulate';
import { ErrorDisplay } from '../components/ErrorDisplay';
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

  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [lastResponse, setLastResponse] = useState<SimulateResponse | null>(null);

  const handleStub = (action: string) => () => {
    message.info(`${action} (stub)`);
  };

  const simulateMutation = useMutation({
    mutationFn: async (payload: { nodes: Node[]; edges: Edge[] }) => {
      return simulate({
        nodes: payload.nodes.map((n) => ({ id: n.id, type: n.type ?? '', data: n.data })),
        edges: payload.edges.map((e) => ({
          id: e.id,
          source: e.source,
          target: e.target,
          data: e.data,
        })),
      });
    },
    onMutate: () => {
      message.loading({ content: 'Đang chạy mô phỏng...', key: 'sim' });
    },
    onSuccess: (res) => {
      setLastResponse(res);

      const totalErrors = (res.errors?.validation?.length ?? 0) + (res.errors?.powerflow?.length ?? 0);
      const failedElements = Object.values(res.element_status || {}).filter((s) => !s.success).length;
      const hasIssues =
        totalErrors > 0 ||
        failedElements > 0 ||
        !res.summary.converged ||
        (res.warnings?.length ?? 0) > 0;

      if (hasIssues) {
        const issueCount = totalErrors;
        message.warning({
          content: <span>Mô phỏng hoàn thành với {issueCount} vấn đề. </span>,
          key: 'sim',
          duration: 2,
        });
        setTimeout(() => {
          setErrorModalOpen(true);
        }, 100);
      } else {
        message.success({
          content: `Mô phỏng thành công trong ${res.summary.runtime_ms}ms`,
          key: 'sim',
          duration: 3,
        });
      }
    },
    onError: (err: unknown) => {
      const errorMessage = err instanceof Error ? err.message : 'Lỗi không xác định';
      message.error({
        content: `Mô phỏng thất bại: ${errorMessage}`,
        key: 'sim',
        duration: 6,
      });
      console.error('Simulation error:', err);
    },
  });

  const [resetKey, setResetKey] = useState(0);

  const handleNew = () => {
    setResetKey((k) => k + 1);
    setLastResponse(null);
    setErrorModalOpen(false);
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
      {lastResponse && (
        <ErrorDisplay
          response={lastResponse}
          open={errorModalOpen}
          onClose={() => setErrorModalOpen(false)}
        />
      )}
    </>
  );
};

