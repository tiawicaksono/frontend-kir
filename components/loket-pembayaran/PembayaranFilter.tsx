"use client";

import { useEffect, useState } from "react";

import { Space, Select, Input, DatePicker, Button } from "antd";

import { ReloadOutlined } from "@ant-design/icons";

import dayjs from "dayjs";

import { getStatusPenerbitan } from "@/services/options.service";

interface Props {
  filters: any;

  onChange: (payload: any) => void;

  onReload?: () => void;

  loading?: boolean;
}

export default function PembayaranFilter({
  filters,
  onChange,
  onReload,

  loading,
}: Props) {
  const [jenisOptions, setJenisOptions] = useState<any[]>([]);

  const [loadingJenis, setLoadingJenis] = useState(false);

  // ====================================
  // LOAD JENIS OPTIONS
  // ====================================
  useEffect(() => {
    let active = true;

    const load = async () => {
      setLoadingJenis(true);

      try {
        const res = await getStatusPenerbitan();

        if (!active) return;

        setJenisOptions(
          (res.data || res).map((i: any) => ({
            label: i.label,
            value: i.value,
          })),
        );
      } finally {
        if (active) setLoadingJenis(false);
      }
    };

    load();

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="flex justify-between mb-4 gap-2 flex-wrap">
      <Space wrap>
        {/* ========================= */}
        {/* TANGGAL */}
        {/* ========================= */}
        <DatePicker
          format="DD/MM/YYYY"
          placeholder="Tanggal Pendaftaran"
          value={
            filters?.tanggal_pendaftaran
              ? dayjs(filters.tanggal_pendaftaran)
              : undefined
          }
          disabled={loading}
          onChange={(date) =>
            onChange({
              tanggal_pendaftaran: date ? date.format("YYYY-MM-DD") : undefined,

              page: 1,
            })
          }
        />

        {/* ========================= */}
        {/* STATUS */}
        {/* ========================= */}
        <Select
          placeholder="Status Pembayaran"
          allowClear
          style={{ width: 180 }}
          disabled={loading}
          value={
            filters?.status_pembayaran === undefined
              ? undefined
              : String(filters.status_pembayaran)
          }
          onChange={(val) =>
            onChange({
              status_pembayaran: val === undefined ? undefined : val === "true",

              page: 1,
            })
          }
          options={[
            {
              label: "Sudah Bayar",
              value: "true",
            },
            {
              label: "Belum Bayar",
              value: "false",
            },
          ]}
        />

        {/* ========================= */}
        {/* JENIS PENDAFTARAN */}
        {/* ========================= */}
        <Select
          placeholder="Jenis Pendaftaran"
          allowClear
          loading={loadingJenis}
          style={{ width: 220 }}
          disabled={loading}
          value={filters?.status_penerbitan_id}
          onChange={(val) =>
            onChange({
              status_penerbitan_id: val,

              page: 1,
            })
          }
          options={jenisOptions}
        />

        {/* ========================= */}
        {/* SEARCH */}
        {/* ========================= */}
        <Input.Search
          placeholder="Cari..."
          allowClear
          disabled={loading}
          value={filters?.search}
          style={{ width: 220 }}
          onSearch={(val) =>
            onChange({
              search: val || undefined,

              page: 1,
            })
          }
        />
      </Space>

      {/* ========================= */}
      {/* RELOAD */}
      {/* ========================= */}
      <Button
        icon={<ReloadOutlined />}
        disabled={loading}
        onClick={() => {
          if (onReload) {
            onReload();
            return;
          }

          onChange({
            ...filters,
          });
        }}
      >
        Reload
      </Button>
    </div>
  );
}
