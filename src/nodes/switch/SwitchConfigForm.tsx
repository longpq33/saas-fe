import { Button, Form, Input, InputNumber, Select, Switch } from 'antd';

import type { SwitchData, SwitchElementType, SwitchType } from './types';

type SwitchConfigFormProps = {
  value: SwitchData;
  onSubmit: (value: SwitchData) => void;
};

export const SwitchConfigForm = ({ value, onSubmit }: SwitchConfigFormProps) => {
  return (
    <Form
      layout="vertical"
      size="small"
      initialValues={value}
      onFinish={(values) => {
        onSubmit(values as SwitchData);
      }}
    >
      <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Name is required' }]}>
        <Input />
      </Form.Item>

      <Form.Item label="busId" name="busId">
        <Input disabled />
      </Form.Item>

      <Form.Item label="elementId" name="elementId">
        <Input disabled />
      </Form.Item>

      <Form.Item label="elementType" name="elementType" rules={[{ required: true }]}>
        <Select
          options={[
            { value: 'line', label: 'Line' },
            { value: 'trafo', label: 'Transformer' },
            { value: 'bus', label: 'Bus' },
          ]}
        />
      </Form.Item>

      <Form.Item label="closed" name="closed" valuePropName="checked">
        <Switch />
      </Form.Item>

      <Form.Item label="type" name="type">
        <Select
          allowClear
          options={[
            { value: 'LBS', label: 'LBS' },
            { value: 'CB', label: 'CB' },
            { value: 'DS', label: 'DS' },
          ]}
        />
      </Form.Item>

      <Form.Item label="z_ohm" name="z_ohm">
        <InputNumber style={{ width: '100%' }} min={0} step={0.01} />
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

