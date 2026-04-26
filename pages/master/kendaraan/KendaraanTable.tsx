"use client";

import { useEffect } from "react";
import DynamicTable from "@/components/ui/dynamic-table/DynamicTable";
import TableActions from "@/components/ui/dynamic-table/TableActions";

interface Props {
  table: any;
  onEdit: (record: any) => void;
  onDelete: (id: string) => void;
  onReload?: () => void;
}

export default function KendaraanTable({
  table,
  onEdit,
  onDelete,
  onReload,
}: Props) {
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
      rowKeyField={key}
      showActions
      renderActions={(record) => (
        <TableActions
          record={record}
          rowKeyField={key}
          onEdit={() => onEdit(record[key])}
          onDelete={() => onDelete(record[key])}
          actions={["edit", "delete"]}
        />
      )}
    />
  );
}
