"use client";

import { useEffect, useState } from "react";
import { Form, Input, Button } from "antd";

interface Props {
  mode?: "create" | "edit";
  initialValues?: any;
  onSuccess?: () => void;
  onSubmit?: (data: any) => Promise<boolean>;
}

export default function BahanUtamaKendaraanForm({
  initialValues,
  onSuccess,
  onSubmit,
}: Props) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        name: (initialValues.bahan_utama || "").toUpperCase(),
      });
    }
  }, [initialValues, form]);

  const handleFinish = async (values: any) => {
    setLoading(true);

    const payload = {
      name: values.name,
    };

    const success = await onSubmit?.(payload);

    setLoading(false);

    if (success) {
      onSuccess?.();
      form.resetFields();
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFinish}
      className="space-y-2"
    >
      <Form.Item
        label="Bahan Utama Kendaraan"
        name="name"
        normalize={(value) => (value || "").toUpperCase().trimStart()}
        rules={[{ required: true, message: "Bahan Utama is required" }]}
      >
        <Input size="large" />
      </Form.Item>

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
