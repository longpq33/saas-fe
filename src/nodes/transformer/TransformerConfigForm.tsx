import { Button, Form, Input, Select, Switch } from 'antd';

import { TRANSFORMER_STD_TYPES } from './defaults';
import type { TransformerData } from './types';

type TransformerConfigFormProps = {
  value: TransformerData;
  onSubmit: (value: TransformerData) => void;
};

export const TransformerConfigForm = ({ value, onSubmit }: TransformerConfigFormProps) => {
  return (
    <Form layout="vertical" initialValues={value} onFinish={onSubmit}>
      <Form.Item name="name" label="Name" rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item name="std_type" label="Std type" rules={[{ required: true }]}>
        <Select
          options={TRANSFORMER_STD_TYPES.map((t) => ({ value: t, label: t }))}
          showSearch
        />
      </Form.Item>

      <Form.Item name="in_service" label="In service" valuePropName="checked">
        <Switch />
      </Form.Item>

      <Form.Item name="hvBusId" label="HV bus id">
        <Input disabled />
      </Form.Item>

      <Form.Item name="lvBusId" label="LV bus id">
        <Input disabled />
      </Form.Item>

      <Button htmlType="submit" type="primary" block>
        Apply
      </Button>
    </Form>
  );
};

