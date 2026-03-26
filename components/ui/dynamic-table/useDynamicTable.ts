"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import type { TableParams } from "@/components/ui/dynamic-table/type";

type FetchFn = (params: any) => Promise<{
  data: any[];
  meta: { total: number };
  config: any;
}>;

export function useDynamicTable(
  fetchFn: FetchFn,
  options?: {
    columnTransform?: (cols: any[], config: any) => any[];
  },
) {
  const fetchRef = useRef(fetchFn);

  // 🔥 selalu update ke function terbaru TANPA trigger re-render
  useEffect(() => {
    fetchRef.current = fetchFn;
  }, [fetchFn]);

  const [columns, setColumns] = useState<any[]>([]);
  const [config, setConfig] = useState<any>({});
  const [dataSource, setDataSource] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const [params, setParams] = useState<TableParams>({
    page: 1,
    limit: 10,
    search: "",
    search_by: "",
    filters: {},
    sorter: undefined,
  });

  // 🔥 inject data baru
  const prependData = (newItem: any) => {
    setDataSource((prev) => [newItem, ...prev]);
    setTotal((prev) => prev + 1);
  };

  // 🔥 update / delete
  const updateData = (updatedItem: any) => {
    const key = config?.primary_key || "id";

    setDataSource((prev) => {
      // delete
      if (updatedItem?._delete) {
        return prev.filter((item) => item?.[key] !== updatedItem?.[key]);
      }

      // update
      return prev.map((item) =>
        item?.[key] === updatedItem?.[key] ? updatedItem : item,
      );
    });
  };

  const fetchData = useCallback(async () => {
    setLoading(true);

    try {
      const json = await fetchRef.current({
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
        ...params.filters,
      });

      if (json.config) setConfig(json.config);

      const hiddenKeys: string[] = json.config?.hidden || [];

      const keys = json.data?.length
        ? Object.keys(json.data[0]).filter((k) => !hiddenKeys.includes(k))
        : [json.config?.primary_key, ...(json.config?.searchable || [])].filter(
            (k) => k && !hiddenKeys.includes(k),
          );

      let newColumns = keys.map((key) => ({
        title: json.config?.labels?.[key] || key,
        dataIndex: key,
        key,
        searchable: (json.config?.searchable || []).includes(key),
        sorter: (json.config?.sortable || []).includes(key),
      }));

      // 🔥 inject custom column logic
      if (options?.columnTransform) {
        newColumns = options.columnTransform(newColumns, json.config);
      }

      setColumns(newColumns);
      setDataSource(json.data || []);
      setTotal(json.meta?.total || 0);
    } catch (err) {
      console.error("DynamicTable Error:", err);
      setDataSource([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const updateParams = (newParams: Partial<TableParams>) => {
    setParams((prev) => ({
      ...prev,
      ...newParams,
    }));
  };

  const reload = () => fetchData();

  return {
    columns,
    dataSource,
    loading,
    total,
    config,

    params,
    setParams: updateParams,
    fetchData,
    reload,

    // 🔥 NEW
    prependData,
    updateData,
  };
}
