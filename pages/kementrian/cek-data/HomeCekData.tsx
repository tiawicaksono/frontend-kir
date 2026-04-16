"use client";

import { useState } from "react";
import { Form, Input, Select, Button, Card, Typography, Tag } from "antd";
import { cekDataApi } from "@/services/api-cek-data.service";

const { Title } = Typography;
const { TextArea } = Input;
/* ================= TYPES ================= */
type FormType = {
  nouji: string;
  prefix: string;
};

export default function PostmanLikeForm() {
  const [form] = Form.useForm<FormType>();
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);

  /* ================= SUBMIT ================= */
  const handleSubmit = async (values: FormType) => {
    setLoading(true);
    setResponse(null);

    try {
      const data = await cekDataApi({
        nouji: values.nouji.toUpperCase().trim(),
        prefix: values.prefix,
      });

      setResponse(data);
    } catch (error: any) {
      setResponse({
        status: false,
        message:
          error?.response?.data?.message ||
          error?.response?.data?.data ||
          error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* ================= REQUEST ================= */}
      <Card>
        <Title level={4}>Request</Title>

        <Form
          form={form}
          layout="horizontal"
          labelCol={{ span: 4 }}
          onFinish={handleSubmit}
          autoComplete="off"
        >
          {/* NO UJI */}
          <Form.Item
            layout="horizontal"
            label="No Uji"
            name="nouji"
            rules={[{ required: true, message: "No Uji wajib diisi" }]}
          >
            <Input
              size="large"
              placeholder="Contoh: SMP 4976"
              onChange={(e) =>
                form.setFieldsValue({
                  nouji: e.target.value.toUpperCase(),
                })
              }
            />
          </Form.Item>

          {/* JENIS LAYANAN */}
          <Form.Item
            layout="horizontal"
            label="Jenis Layanan"
            name="prefix"
            rules={[{ required: true, message: "Wajib pilih layanan" }]}
          >
            <Select
              size="large"
              placeholder="Pilih jenis layanan"
              allowClear
              options={[
                { value: "5", label: "Numpang Keluar" },
                { value: "6", label: "Mutasi Keluar" },
                { value: "lastexam", label: "Uji Terakhir" },
              ]}
            />
          </Form.Item>

          {/* BUTTON */}
          <Form.Item>
            <Button
              size="large"
              type="primary"
              htmlType="submit"
              loading={loading}
              block
            >
              Send Request
            </Button>
          </Form.Item>
        </Form>
      </Card>

      {/* ================= RESPONSE ================= */}
      <Card>
        <Title level={4}>Response</Title>

        {/* STATUS */}
        {response && (
          <div className="mb-3">
            <Tag color={response.status ? "green" : "red"}>
              {response.status ? "SUCCESS" : "ERROR"}
            </Tag>
          </div>
        )}

        {/* QUICK VIEW */}
        {response?.data && (
          <div className="mb-3 p-3 border rounded bg-gray-50 text-sm">
            <div>
              <b>Owner:</b> {response.data.owner_name}
            </div>
            <div>
              <b>No Uji:</b> {response.data.exam_code}
            </div>
            <div>
              <b>No Kendaraan:</b> {response.data.nonrkb}
            </div>
            <div>
              <b>No Rangka:</b> {response.data.norangka}
            </div>
            <div>
              <b>No Mesin:</b> {response.data.nomesin}
            </div>
          </div>
        )}

        {/* RAW JSON */}
        <TextArea
          readOnly
          rows={15}
          value={response ? JSON.stringify(response, null, 2) : ""}
        />
      </Card>
    </div>
  );
}
