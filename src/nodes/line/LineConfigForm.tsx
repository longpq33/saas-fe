import { Button, Form, Input, InputNumber, Select, Switch } from 'antd';

import { LINE_STD_TYPES } from '../../edges/line/defaults';
import type { LineData } from './types';

type LineConfigFormProps = {
  value: LineData;
  onSubmit: (next: LineData) => void;
};

type LineFormValues = LineData & {
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
        const { use_custom_params, geodata, ...rest } = values;

        // Parse geodata if it's a string
        let parsedGeodata: LineData['geodata'] = undefined;
        if (geodata) {
          if (typeof geodata === 'string') {
            try {
              const parsed = JSON.parse(geodata);
              parsedGeodata = Array.isArray(parsed) ? parsed : undefined;
            } catch {
              // Invalid JSON, ignore
              parsedGeodata = undefined;
            }
          } else if (Array.isArray(geodata)) {
            parsedGeodata = geodata;
          }
        }

        const next: LineData = {
          ...rest,
          std_type: use_custom_params ? '' : (rest.std_type ?? ''),
          geodata: parsedGeodata,
        };

        onSubmit(next);
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

      <Form.Item label="Use custom parameters" name="use_custom_params" valuePropName="checked">
        <Switch />
      </Form.Item>

      <Form.Item noStyle shouldUpdate={(prev, cur) => prev.use_custom_params !== cur.use_custom_params}>
        {({ getFieldValue }) => {
          const useCustom = Boolean(getFieldValue('use_custom_params'));

          return (
            <>
              {!useCustom && (
                <Form.Item label="std_type" name="std_type" rules={[{ required: true, message: 'std_type is required' }]}>
                  <Select options={LINE_STD_TYPES.map((t) => ({ value: t, label: t }))} showSearch />
                </Form.Item>
              )}

              <Form.Item label="length_km" name="length_km" rules={[{ required: true, message: 'length_km is required' }]}>
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
                  <Form.Item label="r_ohm_per_km" name="r_ohm_per_km" rules={[{ required: true, message: 'r_ohm_per_km is required' }]}>
                    <InputNumber style={{ width: '100%' }} min={0} step={0.001} />
                  </Form.Item>

                  <Form.Item label="x_ohm_per_km" name="x_ohm_per_km" rules={[{ required: true, message: 'x_ohm_per_km is required' }]}>
                    <InputNumber style={{ width: '100%' }} min={0} step={0.001} />
                  </Form.Item>

                  <Form.Item label="c_nf_per_km" name="c_nf_per_km" rules={[{ required: true, message: 'c_nf_per_km is required' }]}>
                    <InputNumber style={{ width: '100%' }} min={0} step={1} />
                  </Form.Item>

                  <Form.Item label="max_i_ka" name="max_i_ka" rules={[{ required: true, message: 'max_i_ka is required' }]}>
                    <InputNumber style={{ width: '100%' }} min={0} step={0.01} />
                  </Form.Item>
                </>
              )}

              <Form.Item label="switch.enabled" name={['switch', 'enabled']} valuePropName="checked">
                <Switch />
              </Form.Item>

              <Form.Item noStyle shouldUpdate={(p, c) => p?.switch?.enabled !== c?.switch?.enabled}>
                {({ getFieldValue: get }) => {
                  const enabled = Boolean(get(['switch', 'enabled']));
                  if (!enabled) return null;

                  return (
                    <>
                      <Form.Item label="switch.closed" name={['switch', 'closed']} valuePropName="checked">
                        <Switch />
                      </Form.Item>

                      <Form.Item label="switch.side" name={['switch', 'side']} rules={[{ required: true }]}>
                        <Select options={[{ value: 'source', label: 'source' }, { value: 'target', label: 'target' }]} />
                      </Form.Item>

                      <Form.Item label="switch.type" name={['switch', 'type']}>
                        <Select
                          allowClear
                          options={[
                            { value: 'LBS', label: 'LBS' },
                            { value: 'CB', label: 'CB' },
                            { value: 'DS', label: 'DS' },
                          ]}
                        />
                      </Form.Item>

                      <Form.Item label="switch.z_ohm" name={['switch', 'z_ohm']}>
                        <InputNumber style={{ width: '100%' }} min={0} step={0.01} />
                      </Form.Item>
                    </>
                  );
                }}
              </Form.Item>

              <Form.Item label="in_service" name="in_service" valuePropName="checked">
                <Switch />
              </Form.Item>

              <Form.Item
                label="Geodata (Optional)"
                name="geodata"
                getValueFromEvent={(e) => {
                  const value = e.target.value;
                  if (!value || value.trim() === '') return undefined;
                  try {
                    return JSON.parse(value);
                  } catch {
                    return value; // Return as string for validation
                  }
                }}
                normalize={(value) => {
                  if (!value) return undefined;
                  if (typeof value === 'string') {
                    try {
                      return JSON.parse(value);
                    } catch {
                      return value;
                    }
                  }
                  return value;
                }}
                getValueProps={(value) => {
                  if (!value) return { value: '' };
                  if (typeof value === 'string') return { value };
                  return { value: JSON.stringify(value, null, 2) };
                }}
              >
                <Input.TextArea
                  rows={3}
                  placeholder='JSON array format: [{"lat": 10.0, "long": 106.0}, {"lat": 10.1, "long": 106.1}]'
                  style={{ fontFamily: 'monospace', fontSize: '12px' }}
                />
              </Form.Item>
            </>
          );
        }}
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

