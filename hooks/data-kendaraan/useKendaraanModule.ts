"use client";

import { useCallback } from "react";

import { useKendaraanTable } from "./useKendaraanTable";
import { useKendaraanAction } from "./useKendaraanAction";

import type { KendaraanModuleProps, PrimaryKey } from "@/types/kendaraan.type";

export function useKendaraanModule<T extends Record<string, any>>({
  fetcher,
  service,
  label,
  loadCounts,
}: KendaraanModuleProps<T>) {
  const table = useKendaraanTable(fetcher);

  const primaryKey = String(table.config?.primary_key ?? "id") as keyof T;

  const removeData = useCallback(
    (id: PrimaryKey) => {
      table.removeData(id);
    },
    [table],
  );

  const {
    handleCreate,
    handleUpdate,
    handleDelete: rawDelete,
    isSubmitting,
  } = useKendaraanAction<T>({
    service,
    label,
    primaryKey,

    prependData: async (newData) => {
      table.prependData(newData);

      await loadCounts();
    },

    updateData: (updatedData) => {
      table.updateData(updatedData);
    },

    removeData,
  });

  const handleDelete = useCallback(
    async (id: PrimaryKey) => {
      const success = await rawDelete(id);

      if (success) {
        await loadCounts();
      }

      return success;
    },
    [rawDelete, loadCounts],
  );

  const handleReload = useCallback(async () => {
    await Promise.all([table.fetchData(), loadCounts()]);
  }, [table.fetchData, loadCounts]);

  return {
    table,

    handleCreate,
    handleUpdate,
    handleDelete,

    handleReload,

    updateData: table.updateData,

    isSubmitting,
  };
}
