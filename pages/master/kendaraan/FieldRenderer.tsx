import { Form, Input, InputNumber, DatePicker, Select } from "antd";
import { FieldSchema } from "./type";

export default function FieldRenderer({
  field,
  extra,
}: {
  field: FieldSchema;
  extra?: any;
}) {
  const commonProps = {
    name: field.name,
    label: field.label,
    rules: [{ required: field.required }],
  };

  switch (field.type) {
    case "text":
      return (
        <Form.Item {...commonProps}>
          <Input
            onChange={(e) => {
              if (field.uppercase) {
                e.target.value = e.target.value.toUpperCase();
              }
            }}
          />
        </Form.Item>
      );

    case "number":
      return (
        <Form.Item {...commonProps}>
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>
      );

    case "date":
      return (
        <Form.Item {...commonProps}>
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
      );

    case "select":
      return (
        <Form.Item {...commonProps}>
          <Select
            showSearch
            optionFilterProp="label"
            options={extra?.options || field.options || []}
            onChange={extra?.onChange}
            loading={extra?.loading}
            disabled={extra?.disabled}
            placeholder={extra?.placeholder || "Pilih"}
          />
        </Form.Item>
      );

    default:
      return null;
  }
}
