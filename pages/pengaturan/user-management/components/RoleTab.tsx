"use client";

import { useEffect } from "react";
import DynamicTable from "@/components/ui/dynamic-table/DynamicTable";
import TableActions from "@/components/ui/dynamic-table/TableActions";

export default function RoleTab({ table, onEdit, onDelete, onReload }: any) {
  useEffect(() => {
    table.fetchData();
  }, [table.params]);
  const key = table.config?.primary_key || "id";
  return (
    <DynamicTable
      columns={table.columns}
      dataSource={table.dataSource}
      loading={table.loading}
      total={table.total}
      page={table.params.page}
      pageSize={table.params.limit}
      onChange={table.setParams}
      onReload={onReload || table.fetchData}
      rowKeyField={table.config?.primary_key}
      showActions
      renderActions={(record) => (
        <TableActions
          record={record}
          rowKeyField={key}
          onEdit={() => onEdit(record)}
          onDelete={() => onDelete(record[key])}
          actions={["edit", "delete"]}
        />
      )}
    />
  );
}
