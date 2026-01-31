import { Button, Form, Input, InputNumber, Switch } from 'antd';

import type { HvdcLinkData } from './types';

type HvdcLinkConfigFormProps = {
  value: HvdcLinkData;
  onSubmit: (next: HvdcLinkData) => void;
};

export const HvdcLinkConfigForm = ({ value, onSubmit }: HvdcLinkConfigFormProps) => {
  return (
    <Form
      layout="vertical"
      size="small"
      initialValues={value}
      onFinish={(values) => {
        onSubmit(values as HvdcLinkData);
      }}
    >
      <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Name is required' }]}>
        <Input />
      </Form.Item>

      <Form.Item label="fromBusId" name="fromBusId">
        <Input disabled />
      </Form.Item>

      <Form.Item label="toBusId" name="toBusId">
        <Input disabled />
      </Form.Item>

      <Form.Item label="p_mw" name="p_mw" rules={[{ required: true, message: 'p_mw is required' }]}>
        <InputNumber style={{ width: '100%' }} step={0.1} />
      </Form.Item>

      <Form.Item label="loss_percent" name="loss_percent" rules={[{ required: true, message: 'loss_percent is required' }]}>
        <InputNumber style={{ width: '100%' }} min={0} max={100} step={0.1} />
      </Form.Item>

      <Form.Item label="loss_mw" name="loss_mw" rules={[{ required: true, message: 'loss_mw is required' }]}>
        <InputNumber style={{ width: '100%' }} min={0} step={0.1} />
      </Form.Item>

      <Form.Item label="vm_from_pu" name="vm_from_pu" rules={[{ required: true, message: 'vm_from_pu is required' }]}>
        <InputNumber style={{ width: '100%' }} min={0.8} max={1.2} step={0.01} />
      </Form.Item>

      <Form.Item label="vm_to_pu" name="vm_to_pu" rules={[{ required: true, message: 'vm_to_pu is required' }]}>
        <InputNumber style={{ width: '100%' }} min={0.8} max={1.2} step={0.01} />
      </Form.Item>

      <Form.Item label="max_p_mw" name="max_p_mw" rules={[{ required: true, message: 'max_p_mw is required' }]}>
        <InputNumber style={{ width: '100%' }} min={0} step={0.1} />
      </Form.Item>

      <Form.Item label="in_service" name="in_service" valuePropName="checked">
        <Switch />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          style={{ width: '100%', backgroundColor: '#024A70', borderColor: '#024A70', height: 40 }}
        >
          Apply
        </Button>
      </Form.Item>
    </Form>
  );
};

