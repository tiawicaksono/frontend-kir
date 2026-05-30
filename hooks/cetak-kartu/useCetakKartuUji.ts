"use client";

import { useCallback, useEffect, useState } from "react";
import dayjs from "dayjs";

import { fetchKartuUji } from "@/services/cetak-kartu-uji.service";

export function useCetakKartuUji() {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  const [params, setParams] = useState({
    page: 1,
    limit: 10,

    sort_by: "no_pendaftaran_harian",
    sort_order: "desc",

    search: undefined,
    search_by: undefined,

    tanggal_pendaftaran: dayjs().format("YYYY-MM-DD"),

    status_penerbitan_id: undefined,
  });

  const loadData = useCallback(async () => {
    try {
      setLoading(true);

      const res = await fetchKartuUji(params);

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
    loading,
    total,

    params,
    setParams,

    reload: loadData,
  };
}
