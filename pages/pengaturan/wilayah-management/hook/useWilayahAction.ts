import { useState } from "react";
import { useShowAlert } from "@/core/alert/alert.hook";
import { useConfirm } from "@/core/confirm/confirm.hook";

interface Service {
  create: (data: any) => Promise<any>;
  update: (id: string, data: any) => Promise<any>;
  delete: (id: string) => Promise<any>;
}

export function useWilayahAction(
  service: Service,
  label: string, // "Provinsi", "Kota", dll
  prependData?: (data: any) => void,
  updateData?: (data: any) => void,
) {
  const { confirm } = useConfirm();
  const { showErrorAlert, showSuccessAlert } = useShowAlert();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreate = async (data: any) => {
    try {
      setIsSubmitting(true);

      const res = await service.create(data);

      prependData?.(res);

      showSuccessAlert(`${label} berhasil dibuat`);
      return true;
    } catch (err) {
      showErrorAlert(err, `${label} gagal dibuat`);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdate = async (data: any) => {
    try {
      setIsSubmitting(true);

      const res = await service.update(data.id, data);

      updateData?.(res.data);

      showSuccessAlert(`${label} berhasil diupdate`);
      return true;
    } catch (err) {
      showErrorAlert(err, `${label} gagal diupdate`);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = await confirm({
      title: `Hapus ${label}`,
      message: `Yakin ingin menghapus ${label.toLowerCase()} ini?`,
      confirmText: "Hapus",
      cancelText: "Batal",
      variant: "destructive",
    });

    if (!confirmed) return;

    try {
      await service.delete(id);

      updateData?.({ id, _delete: true });

      showSuccessAlert(`${label} berhasil dihapus`);
      return true;
    } catch (err) {
      showErrorAlert(err, `${label} gagal dihapus`);
      return false;
    }
  };

  return {
    handleCreate,
    handleUpdate,
    handleDelete,
    isSubmitting,
  };
}
