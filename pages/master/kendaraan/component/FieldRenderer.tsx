import { Form, Input, InputNumber, DatePicker, Select } from "antd";
import { FieldSchema } from "../type";
import { generateRules } from "../generateRules";

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
    rules: generateRules(field),
  };

  switch (field.type) {
    case "text":
      return (
        <Form.Item
          {...commonProps}
          normalize={(value) =>
            field.uppercase && value ? value.toUpperCase() : value
          }
        >
          <Input placeholder={`Masukkan ${field.label}`} />
        </Form.Item>
      );

    case "integer":
      return (
        <Form.Item {...commonProps}>
          <InputNumber
            style={{ width: "100%" }}
            precision={0}
            formatter={(value) =>
              value ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : ""
            }
            parser={(value) => (value ? Number(value.replace(/,/g, "")) : 0)}
            suffix={field.suffix || ""}
          />
        </Form.Item>
      );

    case "decimal":
      return (
        <Form.Item {...commonProps}>
          <InputNumber
            style={{ width: "100%" }}
            step={0.01}
            precision={2} // bisa kamu adjust
            suffix={field.suffix || ""}
          />
        </Form.Item>
      );

    case "date":
      return (
        <Form.Item {...commonProps}>
          <DatePicker style={{ width: "100%" }} format="DD-MM-YYYY" />
        </Form.Item>
      );

    case "select":
      return (
        <Form.Item {...commonProps}>
          <Select
            showSearch
            optionFilterProp="label"
            options={extra?.options || field.options || []}
            fieldNames={{ label: "label", value: "value" }}
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
