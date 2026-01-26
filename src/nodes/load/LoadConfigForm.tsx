import { Button, Form, Input, InputNumber, Switch } from 'antd';

import type { LoadData } from './types';

type LoadConfigFormProps = {
  value: LoadData;
  onSubmit: (next: LoadData) => void;
};

export const LoadConfigForm = ({ value, onSubmit }: LoadConfigFormProps) => {
  return (
    <Form
      layout="vertical"
      size="small"
      initialValues={value}
      onFinish={(values) => {
        onSubmit(values as LoadData);
      }}
    >
      <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Name is required' }]}>
        <Input />
      </Form.Item>

      <Form.Item label="busId" name="busId">
        <Input disabled />
      </Form.Item>

      <Form.Item label="p_mw" name="p_mw" rules={[{ required: true, message: 'p_mw is required' }]}>
        <InputNumber style={{ width: '100%' }} min={0} step={0.1} />
      </Form.Item>

      <Form.Item label="q_mvar" name="q_mvar" rules={[{ required: true, message: 'q_mvar is required' }]}>
        <InputNumber style={{ width: '100%' }} step={0.1} />
      </Form.Item>

      <Form.Item label="scaling" name="scaling" rules={[{ required: true, message: 'scaling is required' }]}>
        <InputNumber style={{ width: '100%' }} min={0} step={0.01} />
      </Form.Item>

      <Form.Item label="type" name="type">
        <Input />
      </Form.Item>

      <Form.Item label="in_service" name="in_service" valuePropName="checked">
        <Switch />
      </Form.Item>

      <Form.Item label="controllable" name="controllable" valuePropName="checked">
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

