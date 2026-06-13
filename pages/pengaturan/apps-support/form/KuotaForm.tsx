"use client";

import { useEffect, useState } from "react";
import { Form, Input, Button } from "antd";

interface Props {
  mode?: "create" | "edit";
  initialValues?: any;
  onSuccess?: () => void;
  onSubmit?: (data: any) => Promise<boolean>;
}

export default function KuotaForm({
  initialValues,
  onSuccess,
  onSubmit,
}: Props) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        kuota: initialValues.kuota || "",
      });
    }
  }, [initialValues, form]);

  const handleFinish = async (values: any) => {
    setLoading(true);

    const payload = {
      kuota: values.kuota,
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
      {/* NO HP */}
      <Form.Item
        label="Kuota"
        name="kuota"
        rules={[
          { required: true, message: "Kuota is required" },
          {
            pattern: /^[0-9]+$/,
            message: "Only numbers allowed",
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
