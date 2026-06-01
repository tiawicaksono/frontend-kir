"use client";

import { useCallback, useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { useModal } from "@/core/modal/modal.hook";

import {
  createKendaraan,
  updateKendaraan,
  deleteKendaraan,
  fetchTableDataKendaraan,
  fetchKendaraanCounts,
  unblockKendaraan,
} from "@/services/data-kendaraan.service";

import { useKendaraanModule } from "@/hooks/data-kendaraan/useKendaraanModule";

import BlokirKendaraanModal from "@/pages/master/kendaraan/BlokirKendaraanModal";

import type { KendaraanRow } from "@/types/kendaraan.type";
import { useShowAlert } from "@/core/alert/alert.hook";
import { useConfirm } from "@/core/confirm/confirm.hook";

export function useKendaraanPage() {
  const router = useRouter();
  const { openModal } = useModal();

  const [total, setTotal] = useState(0);

  const loadCounts = useCallback(async () => {
    try {
      const res = await fetchKendaraanCounts();

      setTotal(res?.countData ?? 0);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    loadCounts();
  }, [loadCounts]);

  const { table, handleDelete, handleReload, updateData } =
    useKendaraanModule<KendaraanRow>({
      fetcher: fetchTableDataKendaraan,

      service: {
        create: createKendaraan,
        update: updateKendaraan,
        delete: deleteKendaraan,
      },

      label: "Kendaraan",

      loadCounts,
    });

  const handleCreate = useCallback(() => {
    router.push("/master/data-kendaraan/create");
  }, [router]);

  const handleView = useCallback(
    (row: KendaraanRow) => {
      router.push(`/master/data-kendaraan/view/${row.id}`);
    },
    [router],
  );

  const handleEdit = useCallback(
    (row: KendaraanRow) => {
      router.push(`/master/data-kendaraan/edit/${row.id}`);
    },
    [router],
  );

  const handleBlokir = useCallback(
    (row: KendaraanRow) => {
      openModal({
        className: "max-w-xl",
        content: ({ close }) => (
          <BlokirKendaraanModal
            kendaraan={row}
            onClose={close}
            onSuccess={async (updated) => {
              updateData(updated);
            }}
          />
        ),
      });
    },
    [openModal, updateData],
  );

  const { confirm } = useConfirm();
  const { showSuccessAlert, showErrorAlert } = useShowAlert();
  const handleUnblock = useCallback(
    async (row: KendaraanRow) => {
      const ok = await confirm({
        title: "Unblock Kendaraan",
        message: "Yakin ingin membuka blokir kendaraan ini?",
        confirmText: "Ya, Unblock",
        cancelText: "Batal",
      });

      if (!ok) return;

      try {
        await unblockKendaraan(row.id);

        updateData({
          id: row.id,
          is_blokir: false,
          alasan_blokir: null,
        });

        showSuccessAlert("Kendaraan berhasil di-unblock");
      } catch (error) {
        showErrorAlert(error, "Gagal membuka blokir kendaraan");
      }
    },
    [confirm, updateData, showSuccessAlert, showErrorAlert],
  );

  return {
    total,

    table,

    handleCreate,
    handleView,
    handleEdit,

    handleDelete,
    handleReload,

    handleBlokir,
    handleUnblock,
  };
}

export type UseKendaraanPageReturn = ReturnType<typeof useKendaraanPage>;
