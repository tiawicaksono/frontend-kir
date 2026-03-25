"use client";

import { useEffect, useState } from "react";
import DynamicTable from "@/components/ui/dynamic-table/DynamicTable";
import TableActions from "@/components/ui/dynamic-table/TableActions";

export default function UserTab({ table, onEdit }: any) {
  useEffect(() => {
    table.fetchData();
  }, [table.params]);

  return (
    <DynamicTable
      columns={table.columns}
      dataSource={table.dataSource}
      loading={table.loading}
      total={table.total}
      page={table.params.page}
      pageSize={table.params.limit}
      onChange={table.setParams}
      onReload={table.fetchData}
      rowKeyField={table.config?.primary_key}
      showActions
      renderActions={(record) => (
        <TableActions
          record={record}
          rowKeyField={table.config?.primary_key}
          onEdit={() => onEdit(record)}
        />
      )}
    />
  );
}
