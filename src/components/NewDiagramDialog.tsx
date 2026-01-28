import { QuestionCircleOutlined } from '@ant-design/icons';
import { Button, Card, Col, Layout, Menu, Modal, Row, Space, Typography } from 'antd';
import React, { useMemo, useState } from 'react';
import { diagramTemplates, getCategories, getTemplatesByCategory } from '../templates';
import type { DiagramTemplate } from '../templates';

const { Sider, Content } = Layout;
const { Text } = Typography;

interface NewDiagramDialogProps {
  open: boolean;
  onClose: () => void;
  onCreate: (template: DiagramTemplate, filename: string) => void;
}

export const NewDiagramDialog: React.FC<NewDiagramDialogProps> = ({ open, onClose, onCreate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(getCategories()[0]);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(diagramTemplates[0].id);

  const categories = useMemo(() => getCategories(), []);
  const templates = useMemo(() => getTemplatesByCategory(selectedCategory), [selectedCategory]);

  const handleCreate = () => {
    const template = diagramTemplates.find((t) => t.id === selectedTemplateId);
    if (template) {
      onCreate(template, "text.json");
      onClose();
    }
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      title="Create New Diagram"
      width={800}
      footer={[
        <Button key="help" icon={<QuestionCircleOutlined />}>
          Help
        </Button>,
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="create" type="primary" onClick={handleCreate} disabled={!selectedTemplateId}>
          Create
        </Button>,
      ]}
    >
      <Space direction="vertical" style={{ width: '100%' }}>
        <Layout style={{ background: '#fff', minHeight: 300 }}>
          <Sider width={200} style={{ background: '#fff' }}>
            <Menu
              mode="inline"
              selectedKeys={[selectedCategory]}
              style={{ height: '100%', borderRight: 0 }}
              onClick={(e) => setSelectedCategory(e.key)}
            >
              {categories.map((cat) => (
                <Menu.Item key={cat}>{cat} ({getTemplatesByCategory(cat).length})</Menu.Item>
              ))}
            </Menu>
          </Sider>
          <Content style={{ padding: '0 24px', minHeight: 280 }}>
            <Row gutter={[16, 16]}>
              {templates.map((template) => (
                <Col span={12} key={template.id}>
                  <Card
                    hoverable
                    title={template.name}
                    size="small"
                    onClick={() => setSelectedTemplateId(template.id)}
                    style={{
                      border:
                        selectedTemplateId === template.id ? '2px solid #1890ff' : '1px solid #d9d9d9',
                    }}
                  >
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      {template.description}
                    </Text>
                  </Card>
                </Col>
              ))}
            </Row>
          </Content>
        </Layout>
      </Space>
    </Modal>
  );
};

