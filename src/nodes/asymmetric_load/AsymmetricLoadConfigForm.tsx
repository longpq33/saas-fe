import { Button, Form, Input, InputNumber, Switch } from 'antd';

import type { AsymmetricLoadData } from './types';

type AsymmetricLoadConfigFormProps = {
  value: AsymmetricLoadData;
  onSubmit: (next: AsymmetricLoadData) => void;
};

export const AsymmetricLoadConfigForm = ({ value, onSubmit }: AsymmetricLoadConfigFormProps) => {
  return (
    <Form
      layout="vertical"
      size="small"
      initialValues={value}
      onFinish={(values) => {
        onSubmit(values as AsymmetricLoadData);
      }}
    >
      <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Name is required' }]}>
        <Input />
      </Form.Item>

      <Form.Item label="busId" name="busId">
        <Input disabled />
      </Form.Item>

      <Form.Item label="Phase A - p_a_mw" name="p_a_mw" rules={[{ required: true, message: 'p_a_mw is required' }]}>
        <InputNumber style={{ width: '100%' }} min={0} step={0.1} />
      </Form.Item>

      <Form.Item label="Phase A - q_a_mvar" name="q_a_mvar" rules={[{ required: true, message: 'q_a_mvar is required' }]}>
        <InputNumber style={{ width: '100%' }} step={0.1} />
      </Form.Item>

      <Form.Item label="Phase B - p_b_mw" name="p_b_mw" rules={[{ required: true, message: 'p_b_mw is required' }]}>
        <InputNumber style={{ width: '100%' }} min={0} step={0.1} />
      </Form.Item>

      <Form.Item label="Phase B - q_b_mvar" name="q_b_mvar" rules={[{ required: true, message: 'q_b_mvar is required' }]}>
        <InputNumber style={{ width: '100%' }} step={0.1} />
      </Form.Item>

      <Form.Item label="Phase C - p_c_mw" name="p_c_mw" rules={[{ required: true, message: 'p_c_mw is required' }]}>
        <InputNumber style={{ width: '100%' }} min={0} step={0.1} />
      </Form.Item>

      <Form.Item label="Phase C - q_c_mvar" name="q_c_mvar" rules={[{ required: true, message: 'q_c_mvar is required' }]}>
        <InputNumber style={{ width: '100%' }} step={0.1} />
      </Form.Item>

      <Form.Item label="in_service" name="in_service" valuePropName="checked">
        <Switch />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ width: '100%', backgroundColor: '#024A70', borderColor: '#024A70', height: 40 }}>
          Apply
        </Button>
      </Form.Item>
    </Form>
  );
};

