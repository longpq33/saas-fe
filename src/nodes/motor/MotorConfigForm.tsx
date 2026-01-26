import { Button, Form, Input, InputNumber, Switch } from 'antd';

import type { MotorData } from './types';

type MotorConfigFormProps = {
  value: MotorData;
  onSubmit: (value: MotorData) => void;
};

export const MotorConfigForm = ({ value, onSubmit }: MotorConfigFormProps) => {
  return (
    <Form
      layout="vertical"
      size="small"
      initialValues={value}
      onFinish={(values) => {
        onSubmit(values as MotorData);
      }}
    >
      <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Name is required' }]}>
        <Input />
      </Form.Item>

      <Form.Item label="busId" name="busId">
        <Input disabled />
      </Form.Item>

      <Form.Item label="pn_mech_mw" name="pn_mech_mw" rules={[{ required: true, message: 'pn_mech_mw is required' }]}>
        <InputNumber style={{ width: '100%' }} min={0} step={0.1} />
      </Form.Item>

      <Form.Item label="cos_phi" name="cos_phi" rules={[{ required: true, message: 'cos_phi is required' }]}>
        <InputNumber style={{ width: '100%' }} min={0} max={1} step={0.01} />
      </Form.Item>

      <Form.Item label="efficiency" name="efficiency" rules={[{ required: true, message: 'efficiency is required' }]}>
        <InputNumber style={{ width: '100%' }} min={0} max={1} step={0.01} />
      </Form.Item>

      <Form.Item label="loading_percent" name="loading_percent" rules={[{ required: true, message: 'loading_percent is required' }]}>
        <InputNumber style={{ width: '100%' }} min={0} max={200} step={1} />
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

