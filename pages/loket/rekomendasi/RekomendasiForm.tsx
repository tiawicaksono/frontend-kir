// pages/loket/rekomendasi/RekomendasiForm.tsx

"use client";

import { useEffect, useMemo } from "react";

import { Alert, Button, Empty, Form, Input, Space, Tag } from "antd";

import { rekomendasiSchema } from "@/schema/rekomendasi.schema";

interface Props {
  data: any;
  onSubmit: (values: any) => void;
  onSync: () => void;
}

export default function RekomendasiForm({ data, onSubmit, onSync }: Props) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (!data) {
      form.resetFields();
      return;
    }

    form.setFieldsValue(data);
  }, [data]);

  const jenis = useMemo(() => {
    return data?.jenis_rekomendasi;
  }, [data]);

  const fields = useMemo(() => {
    return rekomendasiSchema[jenis] ?? [];
  }, [jenis]);

  if (!data) {
    return <Empty description="Pilih kendaraan pada table terlebih dahulu" />;
  }

  return (
    <div>
      {/* INFO */}
      <div className="mb-4 flex flex-wrap gap-2">
        <Tag color="blue">{data.kendaraan_no_uji}</Tag>

        <Tag color="purple">{data.kendaraan_no_kendaraan}</Tag>

        <Tag color="green">{jenis}</Tag>
      </div>

      {/* WARNING */}
      {data.status_sinkron && (
        <Alert
          className="mb-4"
          type="warning"
          message="Data sudah pernah sinkron ke kementerian. Perubahan memerlukan sinkronisasi ulang."
        />
      )}

      <Form layout="vertical" form={form} onFinish={onSubmit}>
        {fields.map((field) => (
          <Form.Item key={field.name} label={field.label} name={field.name}>
            {field.type === "textarea" ? (
              <Input.TextArea rows={3} />
            ) : (
              <Input />
            )}
          </Form.Item>
        ))}

        <Space>
          <Button type="primary" htmlType="submit">
            Simpan
          </Button>

          <Button onClick={onSync}>Sinkronkan</Button>
        </Space>
      </Form>
    </div>
  );
}
