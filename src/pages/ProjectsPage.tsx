import { PlusOutlined } from '@ant-design/icons';
import { Button, Typography } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NewDiagramDialog } from '../components/NewDiagramDialog';
import type { DiagramTemplate } from '../templates';

const { Title } = Typography;

export const ProjectsPage: React.FC = () => {
  const [isNewDiagramOpen, setIsNewDiagramOpen] = useState(true); // Mở popup khi vào trang
  const navigate = useNavigate();

  const handleCreateDiagram = (template: DiagramTemplate, filename: string) => {
    navigate('/editor', {
      state: {
        diagramData: template.data,
        filename: filename,
      },
    });
  };

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Title level={2}>Projects</Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsNewDiagramOpen(true)}>
          Create New Diagram
        </Button>
      </div>

      <NewDiagramDialog
        open={isNewDiagramOpen}
        onClose={() => setIsNewDiagramOpen(false)}
        onCreate={handleCreateDiagram}
      />
    </div>
  );
};
