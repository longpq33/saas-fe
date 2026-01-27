import { Button, Flex, Space, Tooltip } from 'antd';
import { PlayCircleOutlined, PlusSquareOutlined } from '@ant-design/icons';

type TopBarProps = {
  onNew?: () => void;
  onRun?: () => void;
};

export const TopBar = ({
  onNew,
  onRun,
}: TopBarProps) => {
  return (
    <Flex justify="space-between" align="center" style={{ padding: '8px 12px', background: 'rgba(22,27,34,0.9)', borderBottom: '1px solid #1f2937' }}>
      <Space>
        <Tooltip title="Tạo mới">
          <Button size="small" icon={<PlusSquareOutlined />} onClick={onNew}>
            New
          </Button>
        </Tooltip>
      </Space>
      <Space>
        <Tooltip title="Chạy mô phỏng">
          <Button type="primary" size="small" icon={<PlayCircleOutlined />} onClick={onRun}>
            Run
          </Button>
        </Tooltip>
      </Space>
    </Flex>
  );
};

