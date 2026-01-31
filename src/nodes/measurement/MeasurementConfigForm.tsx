import { Button, Form, Input, Select, Switch } from 'antd';

import type { MeasurementData } from './types';
import { MEASUREMENT_ELEMENT_TYPES, MEASUREMENT_TYPES, MEASUREMENT_SIDES } from './types';

type MeasurementConfigFormProps = {
  value: MeasurementData;
  onSubmit: (next: MeasurementData) => void;
};

export const MeasurementConfigForm = ({ value, onSubmit }: MeasurementConfigFormProps) => {
  return (
    <Form
      layout="vertical"
      size="small"
      initialValues={value}
      onFinish={(values) => {
        onSubmit(values as MeasurementData);
      }}
    >
      <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Name is required' }]}>
        <Input />
      </Form.Item>

      <Form.Item label="element" name="element" rules={[{ required: true, message: 'element is required' }]}>
        <Input placeholder="Element ID" />
      </Form.Item>

      <Form.Item label="element_type" name="element_type" rules={[{ required: true, message: 'element_type is required' }]}>
        <Select options={MEASUREMENT_ELEMENT_TYPES} />
      </Form.Item>

      <Form.Item label="measurement_type" name="measurement_type" rules={[{ required: true, message: 'measurement_type is required' }]}>
        <Select options={MEASUREMENT_TYPES} />
      </Form.Item>

      <Form.Item label="side" name="side">
        <Select allowClear options={MEASUREMENT_SIDES} placeholder="Optional" />
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

