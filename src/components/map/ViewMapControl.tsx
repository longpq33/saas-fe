import { useState, lazy, Suspense } from 'react';
import { Button, Modal, Tooltip, Spin } from 'antd';
import type { Edge, Node } from 'reactflow';
import { GlobalOutlined } from '@ant-design/icons';
import type { SimulateResponse } from '../../api/simulate';

// Lazy load MapView to avoid loading GeoJSON data until modal is opened
const MapView = lazy(() => import('./MapView').then((module) => ({ default: module.MapView })));

export type ViewMapControlProps = {
  nodes: Node[];
  edges: Edge[];
  response?: SimulateResponse | null;
};

export const ViewMapControl = ({ nodes, edges, response }: ViewMapControlProps) => {
  const [open, setOpen] = useState(false);
  const [mapKey, setMapKey] = useState(0);

  const handleOpen = () => {
    setOpen(true);
    // Force remount MapView by changing key
    setMapKey((prev) => prev + 1);
  };
  const handleClose = () => setOpen(false);

  return (
    <>
      <Tooltip title="Xem bản đồ">
        <Button
          style={{ background: '#BB4D1A', height: 40, borderColor: '#1f2937' }}
          type="primary"
          icon={<GlobalOutlined />}
          onClick={handleOpen}
        >
          View map
        </Button>
      </Tooltip>
      <Modal
        title="Map view"
        open={open}
        onCancel={handleClose}
        footer={null}
        width="90vw"
        centered
        styles={{ body: { height: '90vh', padding: 0 } }}
        destroyOnClose={true}
        afterOpenChange={(isOpen) => {
          // Modal animation completed, map can now initialize properly
          if (isOpen) {
            // Small delay to ensure DOM is ready
            setTimeout(() => {
              // This will be handled by MapInitializer component
            }, 100);
          }
        }}
      >
        {open && (
          <Suspense
            key={mapKey}
            fallback={
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                <Spin size="large" tip="Đang tải bản đồ..." />
              </div>
            }
          >
            <MapView key={mapKey} nodes={nodes} edges={edges} response={response ?? undefined} />
          </Suspense>
        )}
      </Modal>
    </>
  );
};


