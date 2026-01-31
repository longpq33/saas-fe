import { Button, Form, Input, InputNumber, Switch } from 'antd';

import type { DcSourceData } from './types';

type DcSourceConfigFormProps = {
  value: DcSourceData;
  onSubmit: (value: DcSourceData) => void;
};

export const DcSourceConfigForm = ({ value, onSubmit }: DcSourceConfigFormProps) => {
  return (
    <Form
      layout="vertical"
      size="small"
      initialValues={value}
      onFinish={(values) => {
        onSubmit(values as DcSourceData);
      }}
    >
      <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Name is required' }]}>
        <Input />
      </Form.Item>

      <Form.Item label="busId" name="busId" rules={[{ required: true, message: 'busId is required' }]}>
        <Input placeholder="dc_bus-..." />
      </Form.Item>

      <Form.Item label="vm_pu" name="vm_pu" rules={[{ required: true, message: 'vm_pu is required' }]}>
        <InputNumber style={{ width: '100%' }} min={0.8} max={1.2} step={0.01} />
      </Form.Item>

      <Form.Item label="p_mw" name="p_mw" rules={[{ required: true, message: 'p_mw is required' }]}>
        <InputNumber style={{ width: '100%' }} min={0} step={0.1} />
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

