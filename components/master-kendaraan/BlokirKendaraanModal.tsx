"use client";

import { useState } from "react";
import { Button, Form, Input, Space } from "antd";
import { blokirKendaraan } from "@/services/data-kendaraan.service";
import { useShowAlert } from "@/core/alert/alert.hook";

interface Props {
  kendaraan: any;
  onClose?: () => void;
  onSuccess?: (data: any) => void;
}

export default function BlokirKendaraanModal({
  kendaraan,
  onClose,
  onSuccess,
}: Props) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { showSuccessAlert, showErrorAlert } = useShowAlert();

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();

      const payload = {
        kendaraan_id: kendaraan.id,
        alasan_blokir: values.alasan_blokir,
      };

      const res = await blokirKendaraan(payload);

      if (res?.data) {
        onSuccess?.(res.data);
      }

      showSuccessAlert(res?.message || "Kendaraan berhasil diblokir");
      onClose?.();
    } catch (err: any) {
      console.error(err);
      showErrorAlert(err, "Gagal blokir kendaraan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mb-5">
        <h2 className="text-xl font-semibold">Blokir Kendaraan</h2>
        <p className="text-sm text-gray-500">{kendaraan.no_kendaraan}</p>
      </div>

      <Form form={form} layout="vertical">
        <Form.Item
          label="Alasan Blokir"
          name="alasan_blokir"
          rules={[{ required: true, message: "Alasan blokir wajib diisi" }]}
        >
          <Input.TextArea rows={4} placeholder="Masukkan alasan blokir" />
        </Form.Item>

        <Space>
          <Button
            type="primary"
            danger
            loading={loading}
            onClick={handleSubmit}
          >
            Blokir
          </Button>
          <Button onClick={onClose}>Batal</Button>
        </Space>
      </Form>
    </>
  );
}
