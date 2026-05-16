"use client";

import { Space, Select, Input, DatePicker, Button } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import { getStatusPenerbitan } from "@/services/options.service";
import { useEffect, useState } from "react";

interface Props {
  filters: any;
  onChange: (payload: any) => void;
  loading?: boolean;
}

export default function PembayaranFilters({
  filters,
  onChange,
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
    <div className="flex justify-between mb-4">
      <Space wrap>
        {/* TANGGAL */}
        <DatePicker
          format="DD/MM/YYYY"
          placeholder="Tanggal Pendaftaran"
          disabled={loading}
          onChange={(date) =>
            onChange({
              tanggal_pendaftaran: date ? date.format("YYYY-MM-DD") : undefined,
              page: 1,
            })
          }
        />

        {/* STATUS */}
        <Select
          placeholder="Status"
          allowClear
          className="min-w-[140px]"
          disabled={loading}
          onChange={(val) =>
            onChange({
              status_pembayaran: val === undefined ? undefined : val === "true",
              page: 1,
            })
          }
          options={[
            { label: "Sudah Bayar", value: "true" },
            { label: "Belum Bayar", value: "false" },
          ]}
        />

        {/* JENIS UJI */}
        <Select
          placeholder="Jenis Pendaftaran"
          allowClear
          loading={loadingJenis}
          className="min-w-[180px]"
          disabled={loading}
          onChange={(val) =>
            onChange({
              status_penerbitan_id: val,
              page: 1,
            })
          }
          options={jenisOptions}
        />

        {/* SEARCH */}
        <Input.Search
          placeholder="Cari..."
          allowClear
          disabled={loading}
          onSearch={(val) =>
            onChange({
              search: val,
              page: 1,
            })
          }
          className="min-w-[200px]"
        />
      </Space>

      <Button
        icon={<ReloadOutlined />}
        disabled={loading}
        onClick={() => onChange({ ...filters })}
      >
        Reload
      </Button>
    </div>
  );
}
