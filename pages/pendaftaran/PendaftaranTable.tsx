"use client";

import { useMemo } from "react";
import { Card } from "antd";

import TableActions from "@/components/ui/dynamic-table/TableActions";
import DynamicTable from "@/components/ui/dynamic-table/DynamicTable";

import { fetchPendaftaran } from "@/services/pendaftaran.service";
import { usePendaftaranTable } from "@/hooks/pendaftaran/usePendaftaranTable";

import { ColumnFormatters } from "@/components/ui/dynamic-table/ColumnFormatters";

interface Props {
  onEdit?: (record: any) => void;
  onDelete?: (id: string) => void;
}

export default function PendaftaranListCard({ onEdit, onDelete }: Props) {
  const table = usePendaftaranTable(fetchPendaftaran);

  if (!table) return null;

  const params = table.params ?? {
    page: 1,
    limit: 10,
  };

  const key = table?.config?.primary_key || "id";

  // =========================================
  // FORMATTERS MAP (CLEAN & SCALABLE)
  // =========================================
  const FORMAT_MAP = useMemo<Record<string, any>>(() => {
    return {
      no_pendaftaran_harian: ColumnFormatters.bold(),
      tanggal_uji: ColumnFormatters.date(),
      status_penerbitan_issuance_name: ColumnFormatters.tag(),
    };
  }, []);

  // =========================================
  // APPLY FORMATTERS (SSR SAFE)
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
    dateFields: ["tanggal_uji"],
  };
  return (
    <Card title="List Pendaftaran" className="mt-4">
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
        showActions
        renderActions={(record) => (
          <TableActions
            record={record}
            rowKeyField={key}
            onEdit={() => onEdit?.(record)}
            onDelete={() => onDelete?.(record.id)}
            actions={["edit", "delete"]}
          />
        )}
      />
    </Card>
  );
}
