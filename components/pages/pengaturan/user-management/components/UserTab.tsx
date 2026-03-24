"use client";

import { useEffect } from "react";
import DynamicTable from "@/components/ui/dynamic-table/DynamicTable";

export default function UserTab({ table }: any) {
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
    />
  );
}
