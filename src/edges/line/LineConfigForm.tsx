import { Button, Form, Input, InputNumber, Select, Switch } from 'antd';

import { LINE_STD_TYPES } from './defaults';
import type { LineEdgeData } from './types';

type LineConfigFormProps = {
  value: LineEdgeData;
  onSubmit: (next: LineEdgeData) => void;
};

type LineFormValues = LineEdgeData & {
  use_custom_params?: boolean;
};

export const LineConfigForm = ({ value, onSubmit }: LineConfigFormProps) => {
  const initialValues: LineFormValues = {
    ...value,
    use_custom_params: !(value.std_type && String(value.std_type).trim().length > 0),
  };

  return (
    <Form<LineFormValues>
      layout="vertical"
      size="small"
      initialValues={initialValues}
      onFinish={(values) => {
        const { use_custom_params, ...rest } = values;

        // Normalize payload to match backend expectations
        // - If custom: std_type must be empty so BE uses create_line_from_parameters
        // - If std_type: ensure custom fields are not required
        const next: LineEdgeData = {
          ...rest,
          std_type: use_custom_params ? '' : (rest.std_type ?? ''),
        };

        onSubmit(next);
      }}
    >
      <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Name is required' }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Use custom parameters" name="use_custom_params" valuePropName="checked">
        <Switch />
      </Form.Item>

      <Form.Item noStyle shouldUpdate={(prev, cur) => prev.use_custom_params !== cur.use_custom_params}>
        {({ getFieldValue }) => {
          const useCustom = Boolean(getFieldValue('use_custom_params'));

          return (
            <>
              {!useCustom && (
                <Form.Item
                  label="std_type"
                  name="std_type"
                  rules={[{ required: true, message: 'std_type is required' }]}
                >
                  <Select options={LINE_STD_TYPES.map((t) => ({ value: t, label: t }))} showSearch />
                </Form.Item>
              )}

              <Form.Item
                label="length_km"
                name="length_km"
                rules={[{ required: true, message: 'length_km is required' }]}
              >
                <InputNumber style={{ width: '100%' }} min={0} step={0.1} />
              </Form.Item>

              <Form.Item label="parallel" name="parallel">
                <InputNumber style={{ width: '100%' }} min={1} step={1} />
              </Form.Item>

              <Form.Item label="df" name="df">
                <InputNumber style={{ width: '100%' }} min={0} step={0.1} />
              </Form.Item>

              {useCustom && (
                <>
                  <Form.Item
                    label="r_ohm_per_km"
                    name="r_ohm_per_km"
                    rules={[{ required: true, message: 'r_ohm_per_km is required' }]}
                  >
                    <InputNumber style={{ width: '100%' }} min={0} step={0.001} />
                  </Form.Item>

                  <Form.Item
                    label="x_ohm_per_km"
                    name="x_ohm_per_km"
                    rules={[{ required: true, message: 'x_ohm_per_km is required' }]}
                  >
                    <InputNumber style={{ width: '100%' }} min={0} step={0.001} />
                  </Form.Item>

                  <Form.Item
                    label="c_nf_per_km"
                    name="c_nf_per_km"
                    rules={[{ required: true, message: 'c_nf_per_km is required' }]}
                  >
                    <InputNumber style={{ width: '100%' }} min={0} step={1} />
                  </Form.Item>

                  <Form.Item
                    label="max_i_ka"
                    name="max_i_ka"
                    rules={[{ required: true, message: 'max_i_ka is required' }]}
                  >
                    <InputNumber style={{ width: '100%' }} min={0} step={0.01} />
                  </Form.Item>
                </>
              )}

              <Form.Item label="in_service" name="in_service" valuePropName="checked">
                <Switch />
              </Form.Item>
            </>
          );
        }}
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ width: '100%',  backgroundColor: '#024A70', borderColor: '#024A70', height: 40 }}>
          Apply
        </Button>
      </Form.Item>
    </Form>
  );
};

