/* eslint-disable @typescript-eslint/no-unused-vars */
import { Alert, Modal, Tag } from 'antd';
import type { SimulateResponse } from '../api/simulate';

interface ErrorDisplayProps {
  response: SimulateResponse;
  open: boolean;
  onClose: () => void;
}

export const ErrorDisplay = ({ response, open, onClose }: ErrorDisplayProps) => {
  const { errors, summary } = response;

  const hasErrors = errors?.validation?.length > 0 || errors?.powerflow?.length > 0;

  return (
    <Modal
      title="Chi tiết kết quả mô phỏng"
      open={open}
      onCancel={onClose}
      footer={null}
      width={800}
      style={{ top: 20 }}
    >
      <div style={{ maxHeight: '70vh', overflowY: 'auto' }}>
        <Alert
          message={
            summary.converged ? (
              <span>
                <Tag color="green">Hội tụ</Tag>
                {summary.slack_bus_id}
              </span>
            ) : (
              <span>
                <Tag color="red">Không hội tụ</Tag> 
              </span>
            )
          }
          type={summary.converged ? 'success' : 'error'}
          style={{ marginBottom: 16 }}
        />

        {hasErrors && (
          <>
              {(errors?.validation || []).concat(errors?.powerflow ?? []).map((warn, idx) => (
                <Alert key={idx} message={warn?.message} type="warning" style={{ marginBottom: 8 }} />
              ))}
              </>
        )}
      </div>
    </Modal>
  );
};

