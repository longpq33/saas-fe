import { Button, Form, Input, InputNumber, Switch } from 'antd';

import type { ImpedanceData } from './types';

type ImpedanceConfigFormProps = {
  value: ImpedanceData;
  onSubmit: (next: ImpedanceData) => void;
};

export const ImpedanceConfigForm = ({ value, onSubmit }: ImpedanceConfigFormProps) => {
  return (
    <Form
      layout="vertical"
      size="small"
      initialValues={value}
      onFinish={(values) => {
        onSubmit(values as ImpedanceData);
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

      <Form.Item label="rft_pu" name="rft_pu" rules={[{ required: true, message: 'rft_pu is required' }]}>
        <InputNumber style={{ width: '100%' }} min={0} step={0.0001} />
      </Form.Item>

      <Form.Item label="xft_pu" name="xft_pu" rules={[{ required: true, message: 'xft_pu is required' }]}>
        <InputNumber style={{ width: '100%' }} min={0} step={0.0001} />
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

