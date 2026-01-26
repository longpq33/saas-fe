import { Button, Form, Input, InputNumber, Switch } from 'antd';

import type { GenData } from './types';

type GenConfigFormProps = {
  value: GenData;
  onSubmit: (value: GenData) => void;
};

export const GenConfigForm = ({ value, onSubmit }: GenConfigFormProps) => {
  return (
    <Form
      layout="vertical"
      size="small"
      initialValues={value}
      onFinish={(values) => {
        onSubmit(values as GenData);
      }}
    >
      <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Name is required' }]}>
        <Input />
      </Form.Item>

      <Form.Item label="busId" name="busId">
        <Input disabled />
      </Form.Item>

      <Form.Item label="p_mw" name="p_mw" rules={[{ required: true, message: 'p_mw is required' }]}>
        <InputNumber style={{ width: '100%' }} step={0.1} />
      </Form.Item>

      <Form.Item label="vm_pu" name="vm_pu" rules={[{ required: true, message: 'vm_pu is required' }]}>
        <InputNumber style={{ width: '100%' }} min={0.8} max={1.2} step={0.01} />
      </Form.Item>

      <Form.Item label="min_q_mvar" name="min_q_mvar">
        <InputNumber style={{ width: '100%' }} step={0.1} />
      </Form.Item>

      <Form.Item label="max_q_mvar" name="max_q_mvar">
        <InputNumber style={{ width: '100%' }} step={0.1} />
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

