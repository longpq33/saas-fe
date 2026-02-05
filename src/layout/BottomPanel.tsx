import { Card, Tabs } from 'antd';

export const BottomPanel = () => {
  return (
    <Card size="small" bordered={false} styles={{ body: { padding: 8, background: '#0f1115' } }} style={{ background: '#0f1115', borderTop: '1px solid #1f2937' }}>
      <Tabs
        size="small"
        items={[
          { key: 'alerts', label: 'Alerts', children: 'Chưa có dữ liệu' },
          { key: 'buses', label: 'Bus Voltages', children: 'Chưa có dữ liệu' },
          { key: 'lines', label: 'Line Loading', children: 'Chưa có dữ liệu' },
        ]}
      />
    </Card>
  );
};

