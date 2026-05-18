"use client";

import { useMemo } from "react";

import { Badge, Card, Tag, Tooltip } from "antd";

import DynamicTable from "@/components/ui/dynamic-table/DynamicTable";

import { ColumnFormatters } from "@/components/ui/dynamic-table/ColumnFormatters";

interface Props {
  table: any;

  onSelect?: (record: any) => void;
}

export default function RekomendasiTable({ table, onSelect }: Props) {
  if (!table) return null;

  const params = table.params ?? {
    page: 1,
    limit: 10,
  };

  const key = table?.config?.primary_key || "id";

  // =========================================
  // FORMATTERS MAP
  // =========================================
  type SinkronStatus = "Sukses" | "Gagal" | "Belum";
  const getSinkronColor = (value?: SinkronStatus) => {
    switch (value) {
      case "Sukses":
        return "green";
      case "Gagal":
        return "red";
      case "Belum":
        return "orange";
      default:
        return "default";
    }
  };

  const FORMAT_MAP = useMemo<Record<string, any>>(() => {
    return {
      created_at: ColumnFormatters.date(),

      kendaraan_no_uji: ColumnFormatters.bold(),

      jenis_rekomendasi: {
        render: (value: string) => (
          <Tag color={value === "Mutasi Keluar" ? "blue" : "orange"}>
            {value || "-"}
          </Tag>
        ),
      },

      status_sinkron_label: {
        render: (value: string, record: any) => (
          <Tooltip title={record.keterangan_sinkron}>
            <Badge
              color={getSinkronColor(value as SinkronStatus)}
              text={value || "-"}
            />
          </Tooltip>
        ),
      },

      area_area_code: {
        render: (value: string, record: any) => (
          <Tooltip title={record.area_area_name}>{value}</Tooltip>
        ),
      },

      keterangan_sinkron: {
        hidden: true,
      },

      area_area_name: {
        hidden: true,
      },
    };
  }, []);

  // =========================================
  // APPLY FORMATTERS
  // =========================================
  const formattedColumns = useMemo(() => {
    return (table.columns ?? []).map((col: any) => {
      const key = String(col.dataIndex);

      const formatter = FORMAT_MAP[key];

      if (!formatter) return col;

      return {
        ...col,
        ...formatter,
      };
    });
  }, [table.columns, FORMAT_MAP]);

  const config = {
    dateFields: ["tanggal_pendaftaran", "created_at"],
  };

  return (
    <DynamicTable
      columns={formattedColumns}
      dataSource={table.dataSource ?? []}
      loading={table.loading ?? false}
      total={table.total ?? 0}
      page={params.page}
      pageSize={params.limit}
      onChange={table.setParams ?? (() => {})}
      onReload={table.fetchData}
      rowKeyField={key}
      config={config}
      onRow={(record: any) => ({
        onClick: () => onSelect?.(record),

        className: "cursor-pointer hover:bg-gray-50",
      })}
    />
  );
}
