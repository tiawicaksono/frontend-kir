"use client";

import { useEffect, useMemo, useState } from "react";
import { Button, Card, Empty, Form, Space, Tag } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";

import { rekomendasiSchema } from "@/schema/rekomendasi.schema";
import { useWilayah } from "@/hooks/select-options/useWilayah";
import { useArea } from "@/hooks/select-options/useArea";

import FieldRenderer from "@/components/FieldRenderer";

interface Props {
  data: any;
  onSubmit: (values: any) => void;
  onSync: () => void;
  isEditing: boolean;
  onEdit: () => void;
}

export default function RekomendasiForm({
  data,
  onSubmit,
  onSync,
  isEditing,
  onEdit,
}: Props) {
  const [form] = Form.useForm();
  const wilayah = useWilayah(form, false);
  const { area } = useArea(true);

  const [hydrated, setHydrated] = useState(false);

  // =========================
  // NORMALIZE JENIS
  // =========================
  const jenis = useMemo(() => {
    return data?.jenis_rekomendasi
      ?.toString()
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "_");
  }, [data?.jenis_rekomendasi]);

  const sections = useMemo(() => {
    return Array.isArray(rekomendasiSchema[jenis])
      ? rekomendasiSchema[jenis]
      : [];
  }, [jenis]);

  const optionsMap: any = {
    area_tujuan_id: area,
    provinsi_id: wilayah.provinsi,
    kota_id: wilayah.kota,
    kecamatan_id: wilayah.kecamatan,
    kelurahan_id: wilayah.kelurahan,
  };

  const isDisabled = (name: string) => {
    const prov = form.getFieldValue("provinsi_id");
    const kota = form.getFieldValue("kota_id");
    const kec = form.getFieldValue("kecamatan_id");

    if (name === "kota_id") return !prov;
    if (name === "kecamatan_id") return !kota;
    if (name === "kelurahan_id") return !kec;
    return false;
  };

  // =========================
  // HYDRATION + CASCADE FIX
  // =========================
  useEffect(() => {
    if (!data) return;

    const mapped = {
      no_pemilik_tujuan: data?.no_pemilik_tujuan ?? "",
      nama_pemilik_tujuan: data?.nama_pemilik_tujuan ?? "",
      alamat_pemilik_tujuan: data?.alamat_pemilik_tujuan ?? "",

      provinsi_id: data?.provinsi_id ?? null,
      kota_id: data?.kota_id ?? null,
      kecamatan_id: data?.kecamatan_id ?? null,
      kelurahan_id: data?.kelurahan_id ?? null,

      area_tujuan_id: data?.area_tujuan_id ?? null,
    };

    const run = async () => {
      form.setFieldsValue(mapped);

      // 🔥 cascade load wajib biar SELECT kebaca options-nya
      if (mapped.provinsi_id) {
        await wilayah.onChangeProvinsi(mapped.provinsi_id);
      }

      if (mapped.kota_id) {
        await wilayah.onChangeKota(mapped.kota_id);
      }

      if (mapped.kecamatan_id) {
        await wilayah.onChangeKecamatan(mapped.kecamatan_id);
      }

      // 🔥 re-apply setelah options ready
      form.setFieldsValue(mapped);

      setHydrated(true);
    };

    run();
  }, [data]);

  // =========================
  // EMPTY STATE
  // =========================
  if (!data) {
    return <Empty description="Pilih data terlebih dahulu" />;
  }

  // =========================
  // FIELD RENDER (PAKAI FIELDRENDERER)
  // =========================
  const renderField = (field: any) => {
    return (
      <FieldRenderer
        key={field.name}
        field={field}
        values={form.getFieldsValue(true)}
        form={form}
        extra={{
          options: optionsMap[field.name],
          disabled: !isEditing || isDisabled(field.name),
          onChange: (val: any) => {
            form.setFieldValue(field.name, val);

            if (field.name === "provinsi_id") wilayah.onChangeProvinsi(val);
            if (field.name === "kota_id") wilayah.onChangeKota(val);
            if (field.name === "kecamatan_id") wilayah.onChangeKecamatan(val);
          },
        }}
      />
    );
  };

  // =========================
  // UI
  // =========================
  return (
    <div>
      {/* HEADER */}
      <div className="mb-4 flex flex-wrap gap-2">
        <Tag color="blue">{data.pendaftaran_kendaraan_no_uji}</Tag>
        <Tag color="purple">{data.pendaftaran_kendaraan_no_kendaraan}</Tag>
        <Tag color="green">{data.jenis_rekomendasi}</Tag>

        <Button size="small" onClick={onEdit}>
          {isEditing ? "Mode Edit" : "Edit"}
        </Button>
      </div>

      {/* ERROR */}
      {data.status_sinkron_label === "Gagal" && (
        <Card
          size="small"
          style={{
            marginBottom: 20,
            background: "#fff2f0",
            border: "1px solid #ffccc7",
          }}
        >
          <div style={{ display: "flex", gap: 10 }}>
            <InfoCircleOutlined style={{ color: "#ff4d4f", fontSize: 18 }} />
            <div>
              <div style={{ fontWeight: 600, color: "#ff4d4f" }}>
                Status Sinkron: Gagal
              </div>
              <div style={{ fontSize: 13, color: "#666" }}>
                {data.keterangan_sinkron || "-"}
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* FORM */}
      {sections.length === 0 ? (
        <Card>Schema tidak ditemukan untuk jenis: {jenis}</Card>
      ) : (
        <Form
          form={form}
          layout="horizontal"
          labelCol={{ span: 4 }}
          colon={false}
          onFinish={onSubmit}
        >
          <div style={{ display: "flex", gap: 24 }}>
            <div style={{ flex: 1 }}>
              {sections
                .filter((s: any) => s.col === "left")
                .flatMap((s: any) => s.fields)
                .map(renderField)}
            </div>

            <div style={{ flex: 1 }}>
              {sections
                .filter((s: any) => s.col === "right")
                .flatMap((s: any) => s.fields)
                .map(renderField)}
            </div>
          </div>

          <Space className="mt-4">
            {isEditing && (
              <Button type="primary" htmlType="submit">
                Simpan
              </Button>
            )}

            <Button onClick={onSync}>Sinkronkan</Button>
          </Space>
        </Form>
      )}
    </div>
  );
}
