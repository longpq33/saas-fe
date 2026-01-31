import { Button, Form, Input, InputNumber, Switch } from 'antd';

import type { XWardData } from './types';

type XWardConfigFormProps = {
  value: XWardData;
  onSubmit: (next: XWardData) => void;
};

export const XWardConfigForm = ({ value, onSubmit }: XWardConfigFormProps) => {
  return (
    <Form
      layout="vertical"
      size="small"
      initialValues={value}
      onFinish={(values) => {
        onSubmit(values as XWardData);
      }}
    >
      <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Name is required' }]}>
        <Input />
      </Form.Item>

      <Form.Item label="busId" name="busId">
        <Input disabled />
      </Form.Item>

      <Form.Item label="ps_mw" name="ps_mw" rules={[{ required: true, message: 'ps_mw is required' }]}>
        <InputNumber style={{ width: '100%' }} step={0.1} />
      </Form.Item>

      <Form.Item label="qs_mvar" name="qs_mvar" rules={[{ required: true, message: 'qs_mvar is required' }]}>
        <InputNumber style={{ width: '100%' }} step={0.1} />
      </Form.Item>

      <Form.Item label="vm_pu" name="vm_pu" rules={[{ required: true, message: 'vm_pu is required' }]}>
        <InputNumber style={{ width: '100%' }} min={0.8} max={1.2} step={0.01} />
      </Form.Item>

      <Form.Item label="r_ohm" name="r_ohm" rules={[{ required: true, message: 'r_ohm is required' }]}>
        <InputNumber style={{ width: '100%' }} min={0} step={0.01} />
      </Form.Item>

      <Form.Item label="x_ohm" name="x_ohm" rules={[{ required: true, message: 'x_ohm is required' }]}>
        <InputNumber style={{ width: '100%' }} min={0} step={0.01} />
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

