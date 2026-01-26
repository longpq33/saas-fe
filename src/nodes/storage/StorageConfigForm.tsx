import { Button, Form, Input, InputNumber, Switch } from 'antd';

import type { StorageData } from './types';

type StorageConfigFormProps = {
  value: StorageData;
  onSubmit: (value: StorageData) => void;
};

export const StorageConfigForm = ({ value, onSubmit }: StorageConfigFormProps) => {
  return (
    <Form
      layout="vertical"
      size="small"
      initialValues={value}
      onFinish={(values) => {
        onSubmit(values as StorageData);
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

      <Form.Item label="max_e_mwh" name="max_e_mwh" rules={[{ required: true, message: 'max_e_mwh is required' }]}>
        <InputNumber style={{ width: '100%' }} min={0} step={0.1} />
      </Form.Item>

      <Form.Item label="min_e_mwh" name="min_e_mwh" rules={[{ required: true, message: 'min_e_mwh is required' }]}>
        <InputNumber style={{ width: '100%' }} min={0} step={0.1} />
      </Form.Item>

      <Form.Item label="max_p_mw" name="max_p_mw" rules={[{ required: true, message: 'max_p_mw is required' }]}>
        <InputNumber style={{ width: '100%' }} step={0.1} />
      </Form.Item>

      <Form.Item label="min_p_mw" name="min_p_mw" rules={[{ required: true, message: 'min_p_mw is required' }]}>
        <InputNumber style={{ width: '100%' }} step={0.1} />
      </Form.Item>

      <Form.Item label="soc_percent" name="soc_percent" rules={[{ required: true, message: 'soc_percent is required' }]}>
        <InputNumber style={{ width: '100%' }} min={0} max={100} step={1} />
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

