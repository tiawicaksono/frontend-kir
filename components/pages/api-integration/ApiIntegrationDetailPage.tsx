"use client";

import { useState } from "react";
import DynamicTable from "@/components/ui/dynamic-table/DynamicTable";
import { generateColumnsFromData } from "@/components/ui/dynamic-table/helpers";
import { fetchTableData } from "@/services/api-integrations.service";

export default function ApiIntegrationDetail({ prefix }: { prefix: string }) {
  const [columns, setColumns] = useState<any[]>([]);
  const [config, setConfig] = useState<any>({});

  const fetchData = async (params: any) => {
    const json = await fetchTableData(prefix, {
      page: params.page,
      limit: params.limit,
      search: params.search,
      search_by: params.search_by,
      sort_by: params.sorter?.field,
      sort_order:
        params.sorter?.order === "ascend"
          ? "asc"
          : params.sorter?.order === "descend"
            ? "desc"
            : undefined,

      // 🔥 AND FILTER
      ...params.filters,
    });

    if (json.config) setConfig(json.config);

    if (json.data?.length) {
      setColumns(generateColumnsFromData(json.data, json.config));
    }

    return {
      data: json.data,
      total: json.meta.total,
    };
  };

  return (
    <DynamicTable
      columns={columns}
      fetchData={fetchData}
      rowKeyField={config?.primary_key}
      // renderActions={({ [config?.primary_key]: id }) => (
      //   <button onClick={() => alert(id)}>Custom</button>
      // )}
    />
  );
}
