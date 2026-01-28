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
            {(Object.entries(errors ?? {}) as Array<[string, Array<{ element_id?: string; element_type?: string; element_name?: string; field?: string; message?: string }>]>).flatMap(
              ([group, list]) => (list ?? []).map((err, idx) => ({ group, err, idx })),
            )
              .sort((a, b) => a.group.localeCompare(b.group) || a.idx - b.idx)
              .map(({ group, err }, idx) => {
                const titleParts = [
                  err?.element_name ? `${err.element_name}` : undefined,
                  err?.element_type ? `type=${err.element_type}` : undefined,
                  err?.element_id ? `id=${err.element_id}` : undefined,
                  err?.field ? `field=${err.field}` : undefined,
                ].filter(Boolean);

                const title = titleParts.length ? titleParts.join(' | ') : group;
                const description = err?.message ?? 'Unknown error';

                return (
                  <Alert
                    key={`${group}-${idx}`}
                    message={title}
                    description={description}
                    type={group === 'powerflow' ? 'error' : 'warning'}
                    showIcon
                    style={{ marginBottom: 8 }}
                  />
                );
              })}
          </>
        )}
      </div>
    </Modal>
  );
};

