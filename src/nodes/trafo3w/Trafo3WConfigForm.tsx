import { Button, Form, Input, Select, Switch } from 'antd';

import { TRAFO3W_STD_TYPES } from './defaults';
import type { Trafo3WData } from './types';

type Trafo3WConfigFormProps = {
  value: Trafo3WData;
  onSubmit: (value: Trafo3WData) => void;
};

export const Trafo3WConfigForm = ({ value, onSubmit }: Trafo3WConfigFormProps) => {
  return (
    <Form
      layout="vertical"
      size="small"
      initialValues={value}
      onFinish={(values) => {
        onSubmit(values as Trafo3WData);
      }}
    >
      <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Name is required' }]}>
        <Input />
      </Form.Item>

      <Form.Item label="std_type" name="std_type" rules={[{ required: true, message: 'std_type is required' }]}>
        <Select options={TRAFO3W_STD_TYPES.map((t) => ({ value: t, label: t }))} showSearch />
      </Form.Item>

      <Form.Item label="hvBusId" name="hvBusId">
        <Input disabled />
      </Form.Item>

      <Form.Item label="mvBusId" name="mvBusId">
        <Input disabled />
      </Form.Item>

      <Form.Item label="lvBusId" name="lvBusId">
        <Input disabled />
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

