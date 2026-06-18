"use client";

import AutoBreadcrumb from "@/components/common/AutoBreadcrumb";
import { useShowAlert } from "@/core/alert/alert.hook";
import { useConfirm } from "@/core/confirm/confirm.hook";
import { useModal } from "@/core/modal/modal.hook";
import { usePendaftaranTable } from "@/hooks/pendaftaran/usePendaftaranTable";
import HomePendaftaran from "@/pages/loket/pendaftaran/HomePendaftaran";
import PendaftaranListCard from "@/components/loket-pendaftaran/PendaftaranTable";
import PendaftaranEditModal from "@/components/loket-pendaftaran/PendaftaranEditModal";
import {
  deletePendaftaran,
  fetchPendaftaran,
} from "@/services/pendaftaran.service";

export default function DaftarUjiPage() {
  const { confirm } = useConfirm();
  const { openModal } = useModal();
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

      table.removeData(id);

      showSuccessAlert("Data berhasil dihapus");
    } catch (err: any) {
      showErrorAlert(err, "Gagal hapus");
    }
  };

  const handleEdit = (record: any) => {
    openModal({
      className: "max-w-lg",
      content: (
        <PendaftaranEditModal
          data={record}
          onSuccess={(updatedData) => {
            table.updateData(updatedData);
          }}
        />
      ),
    });
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
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
}
