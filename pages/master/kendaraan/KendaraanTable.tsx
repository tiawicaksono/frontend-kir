"use client";

import { useEffect } from "react";
import DynamicTable from "@/components/ui/dynamic-table/DynamicTable";
import TableActions from "@/components/ui/dynamic-table/TableActions";

interface Props {
  table?: any;
  onView?: (record: any) => void;
  onEdit: (record: any) => void;
  onDelete: (id: string) => void;
  onReload?: () => void;
}

export default function KendaraanTable({
  table,
  onView,
  onEdit,
  onDelete,
  onReload,
}: Props) {
  // 🔥 guard utama
  if (!table) return null;

  const params = table.params ?? { page: 1, limit: 10 };

  useEffect(() => {
    table?.fetchData?.();
  }, []); // 🔥 jangan pakai table.params (rawan undefined SSR)

  const key = table?.config?.primary_key || "id";

  return (
    <DynamicTable
      columns={table.columns ?? []}
      dataSource={table.dataSource ?? []}
      loading={table.loading ?? false}
      total={table.total ?? 0}
      page={params.page}
      pageSize={params.limit}
      onChange={table.setParams ?? (() => {})}
      onReload={onReload || table.fetchData}
      rowKeyField={key}
      showActions
      renderActions={(record) => (
        <TableActions
          record={record}
          rowKeyField={key}
          onView={() => onView?.(record)}
          onEdit={() => onEdit(record)}
          onDelete={() => onDelete(record[key])}
          actions={["edit", "view", "delete"]}
        />
      )}
    />
  );
}
