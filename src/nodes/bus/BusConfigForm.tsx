import { Button, Form, Input, InputNumber, Select } from 'antd';

import type { BusData } from './types';
import { BUS_TYPE_OPTIONS } from './types';

type BusConfigFormProps = {
  value: BusData;
  onSubmit: (next: BusData) => void;
};

export const BusConfigForm = ({ value, onSubmit }: BusConfigFormProps) => {
  return (
    <Form
      layout="vertical"
      size="small"
      initialValues={value}
      onFinish={(values) => {
        onSubmit(values as BusData);
      }}
    >
      <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Name is required' }]}>
        <Input />
      </Form.Item>

      <Form.Item label="vn_kv" name="vn_kv" rules={[{ required: true, message: 'vn_kv is required' }]}>
        <InputNumber style={{ width: '100%' }} min={0} step={0.1} />
      </Form.Item>

      <Form.Item label="type" name="type" rules={[{ required: true, message: 'type is required' }]}>
        <Select options={BUS_TYPE_OPTIONS} />
      </Form.Item>

      <Form.Item label="min_vm_pu" name="min_vm_pu" rules={[{ required: true, message: 'min_vm_pu is required' }]}>
        <InputNumber style={{ width: '100%' }} step={0.01} />
      </Form.Item>

      <Form.Item label="max_vm_pu" name="max_vm_pu" rules={[{ required: true, message: 'max_vm_pu is required' }]}>
        <InputNumber style={{ width: '100%' }} step={0.01} />
      </Form.Item>

      <Form.Item label="Geodata - lat" name={['geodata', 'lat']} rules={[{ required: true, message: 'lat is required' }]}>
        <InputNumber style={{ width: '100%' }} step={0.000001} />
      </Form.Item>

      <Form.Item label="Geodata - long" name={['geodata', 'long']} rules={[{ required: true, message: 'long is required' }]}>
        <InputNumber style={{ width: '100%' }} step={0.000001} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ width: '100%',  backgroundColor: '#024A70', borderColor: '#024A70', height: 40 }}>
          Apply
        </Button>
      </Form.Item>
    </Form>
  );
};

