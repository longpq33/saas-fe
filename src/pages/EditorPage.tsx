import { message } from 'antd';
import { useState } from 'react';
import type { Edge, Node } from 'reactflow';

import { simulate, type SimulateResponse } from '../api/simulate';
import { ErrorDisplay } from '../components/ErrorDisplay';
import { EditorLayout } from '../layout/EditorLayout';

export const EditorPage = () => {
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [lastResponse, setLastResponse] = useState<SimulateResponse | null>(null);

  const handleStub = (action: string) => () => {
    message.info(`${action} (stub)`);
  };

  const handleRun = async (payload: { nodes: Node[]; edges: Edge[] }) => {
    try {
      message.loading({ content: 'Đang chạy mô phỏng...', key: 'sim' });

      const res = await simulate({
        nodes: payload.nodes.map((n) => ({ id: n.id, type: n.type ?? '', data: n.data })),
        edges: payload.edges.map((e) => ({
          id: e.id,
          source: e.source,
          target: e.target,
          data: e.data,
        })),
      });

      // Đợi API call hoàn thành và set response trước
      setLastResponse(res);

      // Tính toán các chỉ số sau khi có response
      const totalErrors = res.errors?.validation?.length ?? 0;
      const failedElements = Object.values(res.element_status || {}).filter((s) => !s.success).length;
      const hasIssues = totalErrors > 0 || failedElements > 0 || !res.summary.converged || (res.warnings?.length ?? 0) > 0;

      if (hasIssues) {
        const issueCount = totalErrors;
        message.warning({
          content: (
            <span>
              Mô phỏng hoàn thành với {issueCount} vấn đề.{' '}
            </span>
          ),
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
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Lỗi không xác định';
      message.error({
        content: `Mô phỏng thất bại: ${errorMessage}`,
        key: 'sim',
        duration: 6,
      });
      console.error('Simulation error:', err);
    }
  };

  return (
    <>
      <EditorLayout
        onNew={handleStub('New')}
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

