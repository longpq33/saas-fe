import { Card, List, Typography } from 'antd';
import styled from 'styled-components';

import { getPaletteGroups } from '../nodes';

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

const GroupTitle = styled(Typography.Text)`
  font-size: 12px;
  font-weight: 600;
  color: #8b949e;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const GroupContainer = styled.div`
  margin-bottom: 16px;
  &:last-child {
    margin-bottom: 0;
  }
`;

export const LeftPalette = () => {
  const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  const groups = getPaletteGroups();

  return (
    <Card title="Elements" size="small" bordered={false} bodyStyle={{ padding: 8, background: '#fff', height: '100%', overflow: 'auto' }} style={{ background: '#fff', height: '100%', paddingBottom: 30 }}>
      {groups.map((group) => (
        <GroupContainer key={group.key}>
          <GroupTitle>{group.label}</GroupTitle>
          <List
            size="small"
            dataSource={group.items}
            renderItem={(item) => (
              <List.Item style={{ padding: '4px 0', marginTop: '4px' }}>
                <DraggableItem draggable onDragStart={(e) => onDragStart(e, item.key)}>
                  <Typography.Text style={{ color: '#e6e9f0' }}>{item.label}</Typography.Text>
                </DraggableItem>
              </List.Item>
            )}
          />
        </GroupContainer>
      ))}
    </Card>
  );
};

