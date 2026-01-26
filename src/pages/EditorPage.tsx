import { message } from 'antd';
import type { Edge, Node } from 'reactflow';

import { simulate } from '../api/simulate';
import { EditorLayout } from '../layout/EditorLayout';

export const EditorPage = () => {
  const handleStub = (action: string) => () => {
    message.info(`${action} (stub)`);
  };

  const handleRun = async (payload: { nodes: Node[]; edges: Edge[] }) => {
    try {
      message.loading({ content: 'Running simulation...', key: 'sim' });

      const res = await simulate({
        nodes: payload.nodes.map((n) => ({ id: n.id, type: n.type ?? '', data: n.data })),
        edges: payload.edges.map((e) => ({
          id: e.id,
          source: e.source,
          target: e.target,
          data: e.data,
        })),
      });

      if (!res.summary.converged) {
        message.warning({ content: `Simulation did not converge`, key: 'sim', duration: 4 });
      } else {
        message.success({ content: `Simulation succeeded in ${res.summary.runtime_ms}ms`, key: 'sim', duration: 3 });
      }

      if (res.warnings?.length) {
        message.warning({ content: res.warnings[0], duration: 4 });
      }
    } catch (err) {
      message.error({ content: `Simulation failed`, key: 'sim', duration: 4 });
    }
  };

  return (
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
  );
};

