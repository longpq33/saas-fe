import { Button, Form, Input, InputNumber, Switch } from 'antd';

import type { ExtGridData } from './types';

type ExtGridConfigFormProps = {
  value: ExtGridData;
  onSubmit: (value: ExtGridData) => void;
};

export const ExtGridConfigForm = ({ value, onSubmit }: ExtGridConfigFormProps) => {
  return (
    <Form
      layout="vertical"
      size="small"
      initialValues={value}
      onFinish={(values) => {
        onSubmit(values as ExtGridData);
      }}
    >
      <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Name is required' }]}>
        <Input />
      </Form.Item>

      <Form.Item label="busId" name="busId" rules={[{ required: true, message: 'busId is required' }]}>
        <Input placeholder="bus-..." />
      </Form.Item>

      <Form.Item label="vm_pu" name="vm_pu" rules={[{ required: true, message: 'vm_pu is required' }]}>
        <InputNumber style={{ width: '100%' }} min={0.8} max={1.2} step={0.01} />
      </Form.Item>

      <Form.Item label="va_degree" name="va_degree" rules={[{ required: true, message: 'va_degree is required' }]}>
        <InputNumber style={{ width: '100%' }} min={-180} max={180} step={1} />
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


