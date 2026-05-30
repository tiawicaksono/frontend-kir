// hooks/usePembayaran.ts
"use client";

import { useCallback, useEffect, useState } from "react";
import dayjs from "dayjs";
import { PembayaranParams, PembayaranRow } from "@/types/pembayaran.type";
import { fetchPembayaran } from "@/services/pembayaran.service";

export function usePembayaran() {
  const [dataSource, setDataSource] = useState<PembayaranRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  const [params, setParams] = useState<PembayaranParams>({
    page: 1,
    limit: 10,

    sort_by: "no_pendaftaran_harian",
    sort_order: "desc",

    search: undefined,
    search_by: undefined,

    tanggal_pendaftaran: dayjs().format("YYYY-MM-DD"),

    status_pembayaran: undefined,
    status_penerbitan_id: undefined,
  });

  const loadData = useCallback(async () => {
    try {
      setLoading(true);

      const res = await fetchPembayaran(params);

      setDataSource(res?.data ?? []);
      setTotal(res?.meta?.total ?? 0);
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return {
    dataSource,
    setDataSource,

    loading,
    total,

    params,
    setParams,

    reload: loadData,
  };
}
