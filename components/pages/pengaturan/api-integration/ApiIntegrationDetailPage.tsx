"use client";

import { useState, useCallback, useEffect } from "react";
import DynamicTable from "@/components/ui/dynamic-table/DynamicTable";
import { fetchTableData } from "@/services/api-integrations.service";
import type { TableParams, Sorter } from "@/components/ui/dynamic-table/type";

export default function ApiIntegrationDetail({ prefix }: { prefix: string }) {
  const [columns, setColumns] = useState<any[]>([]);
  const [config, setConfig] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [params, setParams] = useState<TableParams>({
    page: 1,
    limit: 10,
  });

  const fetchData = useCallback(
    async (p: TableParams) => {
      setLoading(true);
      try {
        const json = await fetchTableData(prefix, {
          page: p.page,
          limit: p.limit,
          search: p.search,
          search_by: p.search_by,
          sort_by: p.sorter?.field,
          sort_order:
            p.sorter?.order === "ascend"
              ? "asc"
              : p.sorter?.order === "descend"
                ? "desc"
                : undefined,
          ...p.filters,
        });

        if (json.config) setConfig(json.config);

        // Tentukan kolom, filter hidden
        const hiddenKeys: string[] = json.config?.hidden || [];

        const keys = json.data?.length
          ? Object.keys(json.data[0]).filter((k) => !hiddenKeys.includes(k))
          : [
              json.config?.primary_key,
              ...(json.config?.searchable || []),
            ].filter((k) => k && !hiddenKeys.includes(k));

        const newColumns = keys.map((key) => ({
          title: json.config?.labels?.[key] || key,
          dataIndex: key,
          key,
          searchable: (json.config?.searchable || []).includes(key),
          // 🔥 penting untuk munculin icon sort di header
          sorter: (json.config?.sortable || []).includes(key),
        }));

        setColumns(newColumns);
        setDataSource(json.data || []);
        setTotal(json.meta?.total || 0);
      } catch (err) {
        console.error("Fetch API Integration Error:", err);
        setDataSource([]);
        setTotal(0);
      } finally {
        setLoading(false);
      }
    },
    [prefix],
  );

  useEffect(() => {
    fetchData(params);
  }, [params, fetchData]);

  const handleChange = (p: {
    page?: number;
    limit?: number;
    search?: string;
    search_by?: string;
    filters?: any;
    sorter?: Sorter;
  }) => {
    setParams((prev) => ({
      page: p.page ?? prev.page,
      limit: p.limit ?? prev.limit,
      search: p.search ?? prev.search,
      search_by: p.search_by ?? prev.search_by,
      filters: p.filters ?? prev.filters,
      sorter: p.sorter ?? prev.sorter,
    }));
  };

  return (
    <DynamicTable
      columns={columns}
      dataSource={dataSource}
      loading={loading}
      total={total}
      page={params.page}
      pageSize={params.limit}
      onChange={handleChange}
      onReload={() => fetchData(params)}
      rowKeyField={config?.primary_key}
    />
  );
}
