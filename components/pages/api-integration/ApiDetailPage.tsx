"use client";

import { useEffect, useState } from "react";
import {
  detailApiIntegration,
  fetchTableData,
} from "@/services/api-integrations.service";
import DynamicTable from "@/components/ui/dynamic-table/DynamicTable";

export default function ApiIntegrationDetail({ prefix }: { prefix: string }) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [meta, setMeta] = useState({
    current_page: 1,
    per_page: 10,
    total: 0,
  });

  useEffect(() => {
    fetchPage(1);
  }, [prefix]);

  async function fetchPage(page: number) {
    try {
      setLoading(true);

      const res = await fetchTableData(prefix, { page });

      setData(res.data);

      setMeta({
        current_page: res.current_page,
        per_page: res.per_page,
        total: res.total,
      });
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center gap-2 pb-5">
        <div className="h-3 w-3 animate-spin rounded-full border border-gray-400 border-t-transparent" />
        Reloading...
      </div>
    );
  }

  return (
    <DynamicTable
      data={data}
      loading={loading}
      page={meta.current_page}
      perPage={meta.per_page}
      total={meta.total}
      onPageChange={fetchPage}
      onSearch={(search, column) => {
        fetchTableData(prefix, { search, column });
      }}
      actions={[
        { label: "View", onClick: (row) => console.log(row) },
        { label: "Edit", onClick: (row) => console.log(row) },
        { label: "Delete", onClick: (row) => console.log(row) },
      ]}
    />
  );
}
