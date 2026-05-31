"use client";

import { useEffect } from "react";

import DynamicTable from "@/components/ui/dynamic-table/DynamicTable";
import TableActions from "@/components/ui/dynamic-table/TableActions";

import type { KendaraanRow, KendaraanTableState } from "@/types/kendaraan.type";

interface Props {
  table?: KendaraanTableState;

  onView?: (record: KendaraanRow) => void;

  onEdit: (record: KendaraanRow) => void;

  onDelete: (id: number) => Promise<boolean>;

  onReload?: () => Promise<void> | void;
}

export default function KendaraanTable({
  table,
  onView,
  onEdit,
  onDelete,
  onReload,
}: Props) {
  if (!table) {
    return null;
  }

  const {
    columns,
    dataSource,
    loading,
    total,
    params,
    setParams,
    fetchData,
    config,
  } = table;

  const rowKeyField = config?.primary_key ?? "id";

  return (
    <DynamicTable
      columns={columns}
      dataSource={dataSource}
      loading={loading}
      total={total}
      page={params.page}
      pageSize={params.limit}
      onChange={setParams}
      onReload={onReload ?? fetchData}
      rowKeyField={rowKeyField}
      showActions
      renderActions={(record: KendaraanRow) => (
        <TableActions
          record={record}
          rowKeyField={rowKeyField}
          onView={() => onView?.(record)}
          onEdit={() => onEdit(record)}
          onDelete={() => {
            void onDelete(Number(record[rowKeyField]));
          }}
          actions={["view", "edit", "delete"]}
        />
      )}
    />
  );
}
