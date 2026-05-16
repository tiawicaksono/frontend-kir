"use client";

import { useState, useCallback, useEffect } from "react";

import {
  fetchPembayaran,
  deletePembayaran,
  togglePembayaran,
} from "@/services/pembayaran.service";

export function usePembayaran() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingId, setLoadingId] = useState<number | null>(null);

  const [filters, setFilters] = useState({
    tanggal_uji: null,
    search: "",
    status_pembayaran: null,
  });

  // ======================
  // SAFE SET FILTER
  // ======================
  const setFilter = useCallback((key: string, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  // ======================
  // FETCH DATA SAFE
  // ======================
  const load = useCallback(async () => {
    setLoading(true);

    try {
      const res = await fetchPembayaran({
        page: 1,
        limit: 10,
        ...filters,
      });

      setData(res?.data ?? []);
    } catch (err) {
      console.error("FETCH ERROR", err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    load();
  }, [load]);

  // ======================
  // TOGGLE BAYAR
  // ======================
  const toggleBayar = async (row: any) => {
    if (!row?.id) return;

    setLoadingId(row.id);

    try {
      const res = await togglePembayaran(row.id);

      setData((prev) =>
        prev.map((item) =>
          item.id === row.id
            ? {
                ...item,
                retribusi_status_pembayaran:
                  res?.data?.status_pembayaran ??
                  !item.retribusi_status_pembayaran,
              }
            : item,
        ),
      );
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingId(null);
    }
  };

  // ======================
  // DELETE
  // ======================
  const removeData = async (id: number) => {
    if (!id) return;

    try {
      await deletePembayaran(id);

      setData((prev) => prev.filter((x) => x.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return {
    data,
    loading,
    loadingId,
    filters,
    setFilter,
    toggleBayar,
    removeData,
  };
}
