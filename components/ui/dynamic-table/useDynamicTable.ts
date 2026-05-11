"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import type { TableParams } from "@/components/ui/dynamic-table/type";

type FetchFn = (params: any) => Promise<{
  data: any[];
  meta: { total: number };
  config: any;
}>;

type SearchItem = {
  field: string;
  label: string;
};

export function useDynamicTable(fetchFn: FetchFn) {
  const fetchRef = useRef(fetchFn);

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

  // =========================
  // FLATTEN SEARCH FIELD
  // =========================
  const normalize = (str: string) => str.replace(/\./g, "_");

  const flattenSearchField = (field: string) => {
    return normalize(field); // kota.nama -> kota_nama
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

      const cfg = json.config || {};
      setConfig(cfg);

      const labels = cfg.labels || {};
      const hidden = cfg.hidden || [];
      const sortable = cfg.sortable || [];

      // =========================
      // SEARCH LIST (RAW FROM BE)
      // =========================
      const searchList: SearchItem[] = (cfg.searchable || []).map(
        (item: any) => ({
          field: item.field,
          label: item.label,
        }),
      );

      // =========================
      // BUILD SEARCH MAP (IMPORTANT FIX)
      // =========================
      const searchMap = new Map<string, SearchItem>();

      searchList.forEach((s) => {
        searchMap.set(flattenSearchField(s.field), s);
      });

      // =========================
      // BASE KEYS FROM LABELS
      // =========================
      const baseKeys = Object.keys(labels);

      const newColumns = baseKeys
        .filter((k) => !hidden.includes(k))
        .map((key) => {
          const match = searchMap.get(key); // 🔥 DIRECT MATCH

          return {
            title: labels[key] || key,
            dataIndex: key,
            key,

            // 🔥 FIX: ALL SEARCHABLE FIELDS NOW WORK
            searchable: !!match,
            searchField: match?.field,
            searchLabel: match?.label,

            sorter: sortable.includes(key),
          };
        });

      setColumns(newColumns);
      setDataSource(json.data || []);
      setTotal(json.meta?.total || 0);
    } catch (err) {
      console.error(err);
      setColumns([]);
      setDataSource([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const updateParams = (p: Partial<TableParams>) => {
    setParams((prev) => ({ ...prev, ...p }));
  };

  return {
    columns,
    dataSource,
    loading,
    total,
    config,

    params,
    setParams: updateParams,
    fetchData,
    reload: fetchData,
  };
}
