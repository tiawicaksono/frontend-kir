"use client";

import { Form, Input, InputNumber, DatePicker, Select } from "antd";

import { FieldSchema } from "@/schema/type";

import { generateRules } from "@/utils/for-schema/generateRules";
import Search from "antd/es/input/Search";

type Props = {
  field?: FieldSchema;
  extra?: any;
  values?: any;
  form?: any;
};

export default function FieldRenderer({ field, extra, values, form }: Props) {
  // ====================================
  // SSR SAFETY
  // IMPORTANT
  // ====================================

  if (!field) return null;

  // ====================================
  // HIDDEN FIELD
  // ====================================

  if (field.hidden) return null;

  // ====================================
  // COMMON PROPS
  // ====================================

  const commonProps = {
    name: field.name,
    label: field.label,

    rules: generateRules(field),

    initialValue: field.default,
  };

  // ====================================
  // COMMON INPUT PROPS
  // ====================================

  const inputProps = {
    disabled: field.disabled || extra?.disabled,

    placeholder: extra?.placeholder || `Masukkan ${field.label || ""}`,
  };

  // ====================================
  // TEXT
  // ====================================

  if (field.type === "text") {
    return (
      <Form.Item
        {...commonProps}
        normalize={(value) =>
          field.uppercase && value ? String(value).toUpperCase() : value
        }
      >
        <Input
          {...inputProps}
          readOnly={field.readonly}
          suffix={field.suffix}
        />
      </Form.Item>
    );
  }

  // ====================================
  // TEXTAREA
  // ====================================

  if (field.type === "textarea") {
    return (
      <Form.Item
        {...commonProps}
        normalize={(value) =>
          field.uppercase && value ? String(value).toUpperCase() : value
        }
      >
        <Input.TextArea {...inputProps} rows={field.rows || 3} />
      </Form.Item>
    );
  }

  // ====================================
  // INTEGER
  // ====================================

  if (field.type === "integer") {
    return (
      <Form.Item {...commonProps}>
        <div className="flex w-full">
          <InputNumber
            style={{
              width: "100%",
              borderTopRightRadius: field.suffix ? 0 : undefined,
              borderBottomRightRadius: field.suffix ? 0 : undefined,
            }}
            precision={0}
            controls={false}
            disabled={field.disabled || extra?.disabled}
            placeholder={extra?.placeholder || `Masukkan ${field.label}`}
            formatter={(value) =>
              value ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : ""
            }
            parser={(value) => (value ? Number(value.replace(/,/g, "")) : 0)}
          />

          {field.suffix && (
            <div
              className="
              h-[32px]
              min-w-[70px]
              px-3
              border
              border-l-0
              rounded-r-md
              bg-gray-50
              flex
              items-center
              justify-center
              whitespace-nowrap
            "
            >
              {field.suffix}
            </div>
          )}
        </div>
      </Form.Item>
    );
  }

  // ====================================
  // DECIMAL
  // ====================================

  if (field.type === "decimal") {
    return (
      <Form.Item {...commonProps}>
        <div className="flex w-full">
          <InputNumber
            style={{
              width: "100%",
              borderTopRightRadius: field.suffix ? 0 : undefined,
              borderBottomRightRadius: field.suffix ? 0 : undefined,
            }}
            step={field.step || 0.01}
            precision={2}
            controls={false}
            disabled={field.disabled || extra?.disabled}
            placeholder={extra?.placeholder || `Masukkan ${field.label}`}
          />

          {field.suffix && (
            <div
              className="
              h-[32px]
              min-w-[70px]
              px-3
              border
              border-l-0
              rounded-r-md
              bg-gray-50
              flex
              items-center
              justify-center
              whitespace-nowrap
            "
            >
              {field.suffix}
            </div>
          )}
        </div>
      </Form.Item>
    );
  }

  // ====================================
  // DATE
  // ====================================

  if (field.type === "date") {
    return (
      <Form.Item {...commonProps}>
        <DatePicker
          style={{ width: "100%" }}
          format="DD/MM/YYYY"
          disabled={field.disabled || extra?.disabled}
        />
      </Form.Item>
    );
  }

  // ====================================
  // SELECT
  // ====================================

  if (field.type === "select") {
    return (
      <Form.Item {...commonProps}>
        <Select
          showSearch
          optionFilterProp="label"
          options={extra?.options ?? field.options ?? []}
          fieldNames={{
            label: "label",
            value: "value",
          }}
          onChange={extra?.onChange}
          loading={extra?.loading}
          disabled={field.disabled || extra?.disabled}
          placeholder={extra?.placeholder || "Pilih"}
          allowClear
        />
      </Form.Item>
    );
  }

  // ====================================
  // SEARCH
  // ====================================

  if (field.type === "search") {
    return (
      <Form.Item {...commonProps}>
        <Search
          enterButton="Search"
          loading={extra?.loading}
          onSearch={extra?.onSearch}
          disabled={field.disabled || extra?.disabled}
          placeholder={extra?.placeholder || `Masukkan ${field.label || ""}`}
        />
      </Form.Item>
    );
  }

  return null;
}
