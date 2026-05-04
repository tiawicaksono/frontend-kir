"use client";

import { useEffect, useState } from "react";
import { Form, Input, Button } from "antd";

interface Props {
  mode?: "create" | "edit";
  initialValues?: any;
  onSuccess?: () => void;
  onSubmit?: (data: any) => Promise<boolean>;
}

export default function BiroJasaForm({
  initialValues,
  onSuccess,
  onSubmit,
}: Props) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        name: (initialValues.name || "").toUpperCase(),
        company: (initialValues.company || "").toUpperCase(),
        no_hp: initialValues.no_hp || "",
      });
    }
  }, [initialValues, form]);

  const handleFinish = async (values: any) => {
    setLoading(true);

    const payload = {
      name: values.name,
      company: values.company,
      no_hp: values.no_hp,
    };

    const success = await onSubmit?.(payload);

    setLoading(false);

    if (success) {
      onSuccess?.();
      form.resetFields();
    }
  };

  return (
    <Form form={form} layout="vertical" className="" onFinish={handleFinish}>
      {/* NAME */}
      <Form.Item
        label="Nama Biro Jasa"
        name="name"
        rules={[{ required: true, message: "Name is required" }]}
        normalize={(value) => value?.toUpperCase().trimStart()}
      >
        <Input size="large" />
      </Form.Item>

      {/* COMPANY */}
      <Form.Item
        label="Perusahaan"
        name="company"
        rules={[{ required: true, message: "Company is required" }]}
        normalize={(value) => value?.toUpperCase().trimStart()}
      >
        <Input size="large" />
      </Form.Item>

      {/* NO HP */}
      <Form.Item
        label="No HP"
        name="no_hp"
        rules={[
          { required: true, message: "No HP is required" },
          {
            pattern: /^[0-9]+$/,
            message: "Only numbers allowed",
          },
          {
            min: 10,
            message: "Minimal 10 digits",
          },
        ]}
      >
        <Input size="large" />
      </Form.Item>

      {/* BUTTON */}
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          block
          size="large"
        >
          Save
        </Button>
      </Form.Item>
    </Form>
  );
}
