import { Card, List, Typography } from 'antd';
import styled from 'styled-components';

import { getPaletteItems } from '../nodes';

const DraggableItem = styled.div`
  padding: 8px 10px;
  background: #1c212b;
  border: 1px solid #1f2937;
  border-radius: 6px;
  color: #e6e9f0;
  cursor: grab;
  &:hover {
    background: #202635;
  }
`;

export const LeftPalette = () => {
  const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <Card title="Elements" size="small" bordered={false} bodyStyle={{ padding: 8, background: '#fff' }} style={{ background: '#fff' }}>
      <List
        size="small"
        dataSource={getPaletteItems()}
        renderItem={(item) => (
          <List.Item style={{ padding: '4px 0' }}>
            <DraggableItem draggable onDragStart={(e) => onDragStart(e, item.key)}>
              <Typography.Text style={{ color: '#e6e9f0' }}>{item.label}</Typography.Text>
            </DraggableItem>
          </List.Item>
        )}
      />
    </Card>
  );
};

