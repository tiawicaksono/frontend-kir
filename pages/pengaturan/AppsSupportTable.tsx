"use client";

import { useEffect } from "react";
import DynamicTable from "@/components/ui/dynamic-table/DynamicTable";
import TableActions from "@/components/ui/dynamic-table/TableActions";

interface Props {
  table?: any;
  onEdit: (record: any) => void;
  onDelete: (id: string) => void;
  onReload?: () => void;
}

export default function AppsSupportTable({
  table,
  onEdit,
  onDelete,
  onReload,
}: Props) {
  // =========================
  // SAFE GUARD
  // =========================
  if (!table) return null;

  const params = table.params ?? { page: 1, limit: 10 };
  const key = table?.config?.primary_key || "id";

  // =========================
  // STABLE FETCH (FIX ERROR useEffect)
  // =========================
  useEffect(() => {
    if (!table?.fetchData) return;
    table.fetchData();
  }, [table?.fetchData]);

  // =========================
  // RENDER
  // =========================
  return (
    <DynamicTable
      columns={table?.columns ?? []}
      dataSource={table?.dataSource ?? []}
      loading={table?.loading ?? false}
      total={table?.total ?? 0}
      page={params.page}
      pageSize={params.limit}
      onChange={table?.setParams ?? (() => {})}
      onReload={onReload || table?.reload || table?.fetchData}
      rowKeyField={key}
      showActions
      renderActions={(record) => (
        <TableActions
          record={record}
          rowKeyField={key}
          onEdit={() => onEdit(record)}
          onDelete={() => onDelete(record?.[key])}
          actions={["edit", "delete"]}
        />
      )}
    />
  );
}
