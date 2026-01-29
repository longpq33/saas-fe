import { Button, Flex, Space, Tooltip } from 'antd';
import { PlayCircleOutlined, PlusSquareOutlined } from '@ant-design/icons';

type TopBarProps = {
  onNew?: () => void;
  onRun?: () => void;
  isSimulating?: boolean;
};

export const TopBar = ({
  onNew,
  onRun,
  isSimulating,
}: TopBarProps) => {
  return (
    <Flex justify="center" align="center" style={{ padding: '8px 12px', background: '#024A70', borderBottom: '1px solid #1f2937', gap: 10 }}>
      <Space>
        <Tooltip title="Tạo mới">
          <Button style={{ background: '#1C69A8', height: 40 }} type="primary"   icon={<PlusSquareOutlined />} onClick={onNew}>
            New
          </Button>
        </Tooltip>
      </Space>
      <Space>
        <Tooltip title="Chạy mô phỏng">
          <Button
            style={{ background: '#2D9966', height: 40 }}
            type="primary"
            icon={<PlayCircleOutlined />}
            onClick={onRun}
            disabled={isSimulating}
            loading={isSimulating}
          >
            Run
          </Button>
        </Tooltip>
      </Space>
    </Flex>
  );
};

