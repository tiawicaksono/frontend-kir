"use client";

import { Form, Input, InputNumber, DatePicker, Select } from "antd";
import { FieldSchema } from "@/utils/kendaraan/type";
import { generateRules } from "@/utils/kendaraan/generateRules";

type Props = {
  field?: FieldSchema;
  extra?: any;
};

export default function FieldRenderer({ field, extra }: Props) {
  // 🛡️ SAFETY GUARD (WAJIB biar SSR gak crash)
  if (!field) return null;

  const commonProps = {
    name: field?.name,
    label: field?.label,
    rules: generateRules(field),
  };

  switch (field?.type) {
    case "text":
      return (
        <Form.Item
          {...commonProps}
          normalize={(value) =>
            field?.uppercase && value ? String(value).toUpperCase() : value
          }
        >
          <Input placeholder={`Masukkan ${field?.label || ""}`} />
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
            suffix={field?.suffix || ""}
          />
        </Form.Item>
      );

    case "decimal":
      return (
        <Form.Item {...commonProps}>
          <InputNumber
            style={{ width: "100%" }}
            step={0.01}
            precision={2}
            suffix={field?.suffix || ""}
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
            options={extra?.options ?? field?.options ?? []}
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
