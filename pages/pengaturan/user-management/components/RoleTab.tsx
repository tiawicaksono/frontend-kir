"use client";

import { useEffect } from "react";
import DynamicTable from "@/components/ui/dynamic-table/DynamicTable";
import TableActions from "@/components/ui/dynamic-table/TableActions";

export default function RoleTab({ table, onEdit, onDelete, onReload }: any) {
  // 👇 SAFE GUARD
  if (!table) return null;

  const params = table.params ?? { page: 1, limit: 10 };

  const key = table.config?.primary_key || "id";

  useEffect(() => {
    table?.fetchData?.();
  }, [table?.params]);

  return (
    <DynamicTable
      columns={table?.columns ?? []}
      dataSource={table?.dataSource ?? []}
      loading={table?.loading ?? false}
      total={table?.total ?? 0}
      page={params.page}
      pageSize={params.limit}
      onChange={table?.setParams ?? (() => {})}
      onReload={onReload || table?.fetchData}
      rowKeyField={table?.config?.primary_key || "id"}
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
