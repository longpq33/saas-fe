import { Button, Card, Empty, Flex, Typography } from 'antd';
import { Link } from 'react-router-dom';

export const ProjectsPage = () => {
  return (
    <Flex vertical gap={12} style={{ padding: 16 }}>
      <Flex align="center" justify="space-between">
        <Typography.Title level={4} style={{ margin: 0, color: '#e6e9f0' }}>
          Projects
        </Typography.Title>
        <Button type="primary">
          <Link to="/editor">Tạo sơ đồ mới</Link>
        </Button>
      </Flex>
      <Card style={{ background: '#0f1115', color: '#e6e9f0' }} bodyStyle={{ background: '#0f1115' }}>
        <Empty description="Chưa có project" />
      </Card>
    </Flex>
  );
};

