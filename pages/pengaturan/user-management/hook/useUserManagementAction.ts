import { useState } from "react";
import {
  createUser,
  deleteUser,
  updateUser,
} from "@/services/user-management.service";
import { useShowAlert } from "@/core/alert/alert.hook";
import { useConfirm } from "@/core/confirm/confirm.hook";

export function useUserManagementAction(
  prependData?: (data: any) => void,
  updateData?: (data: any) => void,
) {
  const { confirm } = useConfirm();
  const { showErrorAlert, showSuccessAlert } = useShowAlert();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreate = async (data: any) => {
    try {
      setIsSubmitting(true);

      const newUser = await createUser(data);

      prependData?.(newUser);

      showSuccessAlert("User berhasil dibuat");
      return true;
    } catch (err) {
      showErrorAlert(err, "User gagal dibuat");
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdate = async (data: any) => {
    try {
      setIsSubmitting(true);

      const res = await updateUser(data.id, data);

      updateData?.(res.data); // 🔥 replace row

      showSuccessAlert("User berhasil diupdate");
      return true;
    } catch (err) {
      showErrorAlert(err, "User gagal diupdate");
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    const confirmed = await confirm({
      title: "Hapus User",
      message: "Yakin ingin menghapus user ini?",
      confirmText: "Hapus",
      cancelText: "Batal",
      variant: "destructive",
    });

    if (!confirmed) return;

    try {
      await deleteUser(id);
      // 🔥 hapus dari table
      updateData?.({ id, _delete: true });
      showSuccessAlert("Data berhasil dihapus");
      return true;
    } catch (err) {
      showErrorAlert(err, "Data gagal dihapus");
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
