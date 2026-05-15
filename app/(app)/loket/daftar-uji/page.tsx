"use client";

import AutoBreadcrumb from "@/components/common/AutoBreadcrumb";
import { useShowAlert } from "@/core/alert/alert.hook";
import { useConfirm } from "@/core/confirm/confirm.hook";
import { usePendaftaranTable } from "@/hooks/pendaftaran/usePendaftaranTable";
import HomePendaftaran from "@/pages/pendaftaran/HomePendaftaran";
import PendaftaranListCard from "@/pages/pendaftaran/PendaftaranTable";
import {
  deletePendaftaran,
  fetchPendaftaran,
} from "@/services/pendaftaran.service";
import { message } from "antd";

export default function DaftarUjiPage() {
  const { confirm } = useConfirm();
  const { showErrorAlert, showSuccessAlert } = useShowAlert();
  const table = usePendaftaranTable(fetchPendaftaran);
  const handleDelete = async (id: number) => {
    const confirmed = await confirm({
      title: "Hapus Pendaftaran",
      message: "Yakin ingin menghapus data pendaftaran ini?",
      confirmText: "Hapus",
      cancelText: "Batal",
      variant: "destructive",
    });

    if (!confirmed) return;

    try {
      await deletePendaftaran(id);

      table.updateData({
        id,
        _delete: true,
      });

      showSuccessAlert("Data berhasil dihapus");
    } catch (err: any) {
      showErrorAlert(err, "Gagal hapus");
    }
  };
  return (
    <div>
      <AutoBreadcrumb pageTitle="Form Pendaftaran" />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12">
          <HomePendaftaran
            onCreated={(newData) => {
              table.prependData(newData);
            }}
          />

          <PendaftaranListCard
            table={table}
            onEdit={table.updateData}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
}
