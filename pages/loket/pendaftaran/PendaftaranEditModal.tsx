"use client";

import { useEffect, useState } from "react";

import { Form, Select, DatePicker, Button } from "antd";

import dayjs from "dayjs";

import { Modal } from "@/components/ui/modal";

import { updatePendaftaran } from "@/services/pendaftaran.service";

import { getStatusPenerbitan } from "@/services/options.service";

import { useShowAlert } from "@/core/alert/alert.hook";

interface Props {
  open: boolean;
  data?: any;
  onClose: () => void;
  onSuccess?: (data: any) => void;
}

const mapOptions = (data: any[]) =>
  (data || []).map((i: any) => ({
    label: i.label ?? i.nama ?? String(i.value),
    value: Number(i.value ?? i.id),
  }));

export default function PendaftaranEditModal({
  open,
  data,
  onClose,
  onSuccess,
}: Props) {
  const [form] = Form.useForm();

  const { showSuccessAlert, showErrorAlert } = useShowAlert();

  const [loading, setLoading] = useState(false);

  const [statusOptions, setStatusOptions] = useState<any[]>([]);

  // ====================================
  // LOAD OPTIONS
  // ====================================

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getStatusPenerbitan();

        setStatusOptions(mapOptions(res.data));
      } catch (err) {
        console.error(err);
      }
    };

    load();
  }, []);

  // ====================================
  // PREFILL
  // ====================================

  useEffect(() => {
    if (!open || !data || !statusOptions.length) return;

    form.setFieldsValue({
      status_penerbitan_id: Number(data.status_penerbitan_issuance_id),

      tanggal_uji: data.tanggal_uji ? dayjs(data.tanggal_uji) : undefined,
    });
  }, [open, data, statusOptions]);

  // ====================================
  // SUBMIT
  // ====================================

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const values = await form.validateFields();

      const payload = {
        status_penerbitan_id: values.status_penerbitan_id,

        tanggal_uji: values.tanggal_uji?.format("YYYY-MM-DD"),
      };

      const res = await updatePendaftaran(data.id, payload);

      if (res?.data) {
        onSuccess?.(res.data);
      }

      showSuccessAlert(res?.message || "Berhasil update");

      onClose();
    } catch (err: any) {
      console.error(err);

      showErrorAlert(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={open} onClose={onClose} className="max-w-md">
      <div className="mb-5">
        <h2 className="text-xl font-semibold">Edit Pendaftaran</h2>

        <p className="text-sm text-gray-500">Ubah jenis uji dan tanggal uji</p>
      </div>

      <Form
        form={form}
        layout="horizontal"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        colon={false}
      >
        <Form.Item
          label="Jenis Uji"
          name="status_penerbitan_id"
          rules={[{ required: true }]}
        >
          <Select options={statusOptions} />
        </Form.Item>

        <Form.Item
          label="Tanggal Uji"
          name="tanggal_uji"
          rules={[{ required: true }]}
        >
          <DatePicker className="w-full" format="DD/MM/YYYY" />
        </Form.Item>

        <Button type="primary" block loading={loading} onClick={handleSubmit}>
          Simpan Perubahan
        </Button>
      </Form>
    </Modal>
  );
}
