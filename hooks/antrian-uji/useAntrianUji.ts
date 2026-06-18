"use client";

import { useCallback, useEffect, useState } from "react";
import dayjs from "dayjs";
import { AntrianUjiParams, AntrianUjiRow } from "@/types/antrian-uji.type";
import { fetchAntrianUji } from "@/services/antrian-uji.service";

export function useAntrianUji() {
  const [dataSource, setDataSource] = useState<AntrianUjiRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  const [params, setParams] = useState<AntrianUjiParams>({
    page: 1,
    limit: 10,

    sort_by: "no_pendaftaran_harian",
    sort_order: "desc",

    search: undefined,
    search_by: undefined,

    tanggal_pendaftaran: dayjs().format("YYYY-MM-DD"),

    is_datang: undefined,
    status_penerbitan_id: undefined,
  });

  const loadData = useCallback(async () => {
    try {
      setLoading(true);

      const res = await fetchAntrianUji(params);

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
