import { Modal } from 'antd';
import type { SimulateResponse } from '../api/simulate';
import { ErrorDisplayContent } from './ErrorDisplayContent';

interface ErrorDisplayProps {
  response: SimulateResponse;
  open: boolean;
  onClose: () => void;
}

export const ErrorDisplay = ({ response, open, onClose }: ErrorDisplayProps) => {
  return (
    <Modal
      title="Chi tiết kết quả mô phỏng"
      open={open}
      onCancel={onClose}
      footer={null}
      width={800}
      style={{ top: 20 }}
      destroyOnClose
    >
      <ErrorDisplayContent response={response} />
    </Modal>
  );
};

