"use client";

import DynamicTable from "@/components/ui/dynamic-table/DynamicTable";
import { useDynamicTable } from "@/components/ui/dynamic-table/useDynamicTable";
import { fetchTableData } from "@/services/api-integrations.service";

export default function ApiIntegrationDetail({ prefix }: { prefix: string }) {
  const table = useDynamicTable((params) => fetchTableData(prefix, params));

  return (
    <DynamicTable
      columns={table.columns}
      dataSource={table.dataSource}
      loading={table.loading}
      total={table.total}
      page={table.params.page}
      pageSize={table.params.limit}
      onChange={table.setParams}
      onReload={table.reload}
      rowKeyField={table.config?.primary_key}
    />
  );
}
