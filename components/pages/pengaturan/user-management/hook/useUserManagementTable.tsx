"use client";

import { useState, useCallback } from "react";
import { generateColumnsFromData } from "@/components/ui/dynamic-table/helpers";
import { fetchTableData } from "@/services/user-management.service";

type Sorter = {
  field?: string;
  order?: "ascend" | "descend";
};

type TableParams = {
  page: number;
  limit: number;
  search?: string;
  search_by?: string;
  filters?: Record<string, any>;
  sorter?: Sorter;
};

export function useUserManagementTable() {
  const [columns, setColumns] = useState<any[]>([]);
  const [config, setConfig] = useState<any>({});

  const [dataSource, setDataSource] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const [params, setParams] = useState<TableParams>({
    page: 1,
    limit: 10,
    search: "",
    search_by: undefined,
    filters: {},
    sorter: undefined,
  });

  const getRowKey = (record: any) => record?.id;

  const fetchData = useCallback(async () => {
    setLoading(true);

    try {
      const json = await fetchTableData({
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

      if (json.data?.length) {
        setColumns(
  generateColumnsFromData(json.data, json.config).map((col: any) => {
    // 🔥 handle kolom roles
    if (col.dataIndex === "roles") {
      return {
        ...col,
        title: "Roles", // optional rename
        render: (roles: any[]) => {
          if (!roles?.length) return "-";

          return (
            <div className="flex flex-wrap gap-1">
              {roles.map((role) => (
                <span
                  key={role.id}
                  className="px-2 py-0.5 text-xs rounded bg-blue-100 text-blue-700"
                >
                  {role.name}
                </span>
              ))}
            </div>
          );
        },
      };
    }

    return col;
  }),
);
      }

      // 🔥 overwrite saat fetch (BENAR untuk pagination)
      setDataSource(json.data);

      setTotal(json.meta.total);
    } finally {
      setLoading(false);
    }
  }, [params]);

  const updateParams = (newParams: Partial<TableParams>) => {
    setParams((prev) => ({
      ...prev,
      ...newParams,
    }));
  };

  // 🔥 inject data baru ke atas (langsung tampil)
  const prependData = (newItem: any) => {
    console.log("PREPEND DATA:", newItem);
    setDataSource((prev) => {
      const updated = [newItem, ...prev];

      console.log("DATA SOURCE AFTER PREPEND:", updated);

      return updated;
    });
    setTotal((prev) => prev + 1);
  };

  const updateData = (updatedItem: any) => {
    const key = config?.primary_key || "id";

    setDataSource((prev) =>
      prev.map((item) =>
        item?.[key] === updatedItem?.[key] ? updatedItem : item,
      ),
    );
  };

  return {
    columns,
    config,
    dataSource,
    total,
    loading,

    params,
    setParams: updateParams,
    fetchData,

    prependData,
    updateData,
  };
}
