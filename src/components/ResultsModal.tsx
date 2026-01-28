import { Modal, Tabs, Badge } from 'antd';

import type { SimulateResponse } from '../api/simulate';
import { ErrorDisplayContent } from './ErrorDisplayContent';
import { NetworkCharts } from './NetworkCharts';
import { NetworkResults } from './NetworkResults';

type ResultsModalProps = {
  response: SimulateResponse;
  open: boolean;
  onClose: () => void;
};

export const ResultsModal = ({ response, open, onClose }: ResultsModalProps) => {
  const totalErrors =
    (response.errors?.validation?.length ?? 0) +
    (response.errors?.powerflow?.length ?? 0) +
    (response.errors?.network?.length ?? 0);

  const hasIssues = totalErrors > 0 || !response.summary.converged;

  const defaultActiveKey = hasIssues ? 'errors' : 'charts';

  return (
    <Modal
      title={'Kết quả mô phỏng'}
      open={open}
      onCancel={onClose}
      footer={null}
      width={1200}
      style={{ top: 20 }}
      destroyOnClose
    >
      <Tabs
        defaultActiveKey={defaultActiveKey}
        items={[
          {
            key: 'charts',
            label: 'Charts',
            children: <NetworkCharts response={response} topN={30} />,
          },
          {
            key: 'network',
            label: 'Network',
            children: <NetworkResults response={response} />,
          },
          {
            key: 'errors',
            label: (
              <span>
                Errors <Badge count={totalErrors} size="small" />
              </span>
            ),
            children: <ErrorDisplayContent response={response} />,
          },
        ]}
      />
    </Modal>
  );
};

