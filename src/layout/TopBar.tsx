/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Flex, Space, Tooltip } from 'antd';
import { UndoOutlined, RedoOutlined, PlayCircleOutlined, CloudUploadOutlined, DownloadOutlined, SaveOutlined, CompressOutlined, CheckCircleOutlined, PlusSquareOutlined } from '@ant-design/icons';

type TopBarProps = {
  onNew?: () => void;
  onSave?: () => void;
  onExport?: () => void;
  onImport?: () => void;
  onUndo?: () => void;
  onRedo?: () => void;
  onValidate?: () => void;
  onRun?: () => void;
  onFit?: () => void;
};

export const TopBar = ({
  onNew,
  onSave,
  onExport,
  onImport,
  onUndo,
  onRedo,
  onValidate,
  onRun,
  onFit,
}: TopBarProps) => {
  return (
    <Flex justify="space-between" align="center" style={{ padding: '8px 12px', background: 'rgba(22,27,34,0.9)', borderBottom: '1px solid #1f2937' }}>
      <Space>
        <Tooltip title="Tạo mới">
          <Button size="small" icon={<PlusSquareOutlined />} onClick={onNew}>
            New
          </Button>
        </Tooltip>
        <Tooltip title="Lưu local">
          <Button size="small" icon={<SaveOutlined />} onClick={onSave}>
            Save
          </Button>
        </Tooltip>
        {/* <Tooltip title="Xuất JSON">
          <Button size="small" icon={<DownloadOutlined />} onClick={onExport}>
            Export
          </Button>
        </Tooltip>
        <Tooltip title="Nhập JSON">
          <Button size="small" icon={<CloudUploadOutlined />} onClick={onImport}>
            Import
          </Button>
        </Tooltip> */}
      </Space>
      <Space>
        {/* <Tooltip title="Hoàn tác">
          <Button size="small" icon={<UndoOutlined />} onClick={onUndo} />
        </Tooltip>
        <Tooltip title="Làm lại">
          <Button size="small" icon={<RedoOutlined />} onClick={onRedo} />
        </Tooltip> */}
        {/* <Tooltip title="Fit view">
          <Button size="small" icon={<CompressOutlined />} onClick={onFit} />
        </Tooltip> */}
      </Space>
      <Space>
        {/* <Tooltip title="Validate lưới">
          <Button size="small" icon={<CheckCircleOutlined />} onClick={onValidate}>
            Validate
          </Button>
        </Tooltip> */}
        <Tooltip title="Chạy mô phỏng">
          <Button type="primary" size="small" icon={<PlayCircleOutlined />} onClick={onRun}>
            Run
          </Button>
        </Tooltip>
      </Space>
    </Flex>
  );
};

