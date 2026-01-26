import { Button, Form, Input, InputNumber, Select, Switch } from 'antd';

import { LINE_STD_TYPES } from './defaults';
import type { LineEdgeData } from './types';

type LineConfigFormProps = {
  value: LineEdgeData;
  onSubmit: (next: LineEdgeData) => void;
};

export const LineConfigForm = ({ value, onSubmit }: LineConfigFormProps) => {
  return (
    <Form
      layout="vertical"
      size="small"
      initialValues={value}
      onFinish={(values) => {
        onSubmit(values as LineEdgeData);
      }}
    >
      <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Name is required' }]}>
        <Input />
      </Form.Item>

      <Form.Item label="std_type" name="std_type" rules={[{ required: true, message: 'std_type is required' }]}>
        <Select options={LINE_STD_TYPES.map((t) => ({ value: t, label: t }))} showSearch />
      </Form.Item>

      <Form.Item label="length_km" name="length_km" rules={[{ required: true, message: 'length_km is required' }]}>
        <InputNumber style={{ width: '100%' }} min={0} step={0.1} />
      </Form.Item>

      <Form.Item label="in_service" name="in_service" valuePropName="checked">
        <Switch />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
          Apply
        </Button>
      </Form.Item>
    </Form>
  );
};

