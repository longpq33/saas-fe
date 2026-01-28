import { Button, Form, Input, InputNumber, Switch } from 'antd';

import type { ShuntData } from './types';

type ShuntConfigFormProps = {
  value: ShuntData;
  onSubmit: (value: ShuntData) => void;
};

export const ShuntConfigForm = ({ value, onSubmit }: ShuntConfigFormProps) => {
  return (
    <Form
      layout="vertical"
      size="small"
      initialValues={value}
      onFinish={(values) => {
        onSubmit(values as ShuntData);
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

      <Form.Item label="q_mvar" name="q_mvar" rules={[{ required: true, message: 'q_mvar is required' }]}>
        <InputNumber style={{ width: '100%' }} step={0.1} />
      </Form.Item>

      <Form.Item label="vn_kv" name="vn_kv" rules={[{ required: true, message: 'vn_kv is required' }]}>
        <InputNumber style={{ width: '100%' }} min={0} step={0.1} />
      </Form.Item>

      <Form.Item label="step" name="step">
        <InputNumber style={{ width: '100%' }} min={0} step={1} />
      </Form.Item>

      <Form.Item label="max_step" name="max_step">
        <InputNumber style={{ width: '100%' }} min={0} step={1} />
      </Form.Item>

      <Form.Item label="in_service" name="in_service" valuePropName="checked">
        <Switch />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ width: '100%',  backgroundColor: '#024A70', borderColor: '#024A70', height: 40 }}>
          Apply
        </Button>
      </Form.Item>
    </Form>
  );
};

