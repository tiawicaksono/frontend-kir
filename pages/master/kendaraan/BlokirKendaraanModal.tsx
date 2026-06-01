"use client";

import { useState } from "react";

import { Button, Form, Input } from "antd";

import { useModal } from "@/core/modal/modal.hook";
import { useShowAlert } from "@/core/alert/alert.hook";

import { blokirKendaraan } from "@/services/data-kendaraan.service";

import type { KendaraanRow } from "@/types/kendaraan.type";

type Props = {
  kendaraan: KendaraanRow;
  onClose: () => void;

  onSuccess: (payload: {
    id: number;
    is_blokir: boolean;
    alasan_blokir: string;
  }) => Promise<void>;
};

export default function BlokirKendaraanModal({ kendaraan, onSuccess }: Props) {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const { closeModal } = useModal();
  const { showErrorAlert, showSuccessAlert } = useShowAlert();

  const handleSubmit = async (values: { reason: string }) => {
    setLoading(true);

    try {
      await blokirKendaraan({
        id: kendaraan.id,
        reason: values.reason.trim(),
      });

      closeModal();

      await onSuccess({
        id: kendaraan.id,
        is_blokir: true,
        alasan_blokir: values.reason.trim(),
      });

      showSuccessAlert("Kendaraan berhasil diblokir");
    } catch (error) {
      closeModal();
      showErrorAlert(error, "Gagal memblokir kendaraan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <h2 className="mb-4 text-lg font-semibold">Blokir Kendaraan</h2>

      <p className="mb-4 text-sm text-gray-500">
        Mohon isi alasan blokir kendaraan ini.
      </p>

      <Form.Item
        name="reason"
        label="Alasan Blokir"
        rules={[
          {
            required: true,
            message: "Alasan blokir wajib diisi",
          },
          {
            whitespace: true,
            message: "Alasan blokir wajib diisi",
          },
        ]}
      >
        <Input.TextArea rows={5} placeholder="Masukkan alasan blokir..." />
      </Form.Item>

      <div className="flex justify-end">
        <Button type="primary" htmlType="submit" loading={loading}>
          Blokir Kendaraan
        </Button>
      </div>
    </Form>
  );
}
