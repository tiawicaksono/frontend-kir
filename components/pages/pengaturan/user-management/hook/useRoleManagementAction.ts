import { useState } from "react";
import {
  createRole,
  deleteRole,
  updateRole,
} from "@/services/role-management.service";
import { useShowAlert } from "@/core/alert/alert.hook";
import { useConfirm } from "@/core/confirm/confirm.hook";

export function useRoleManagementAction(
  prependData?: (data: any) => void,
  updateData?: (data: any) => void,
) {
  const { confirm } = useConfirm();
  const { showErrorAlert, showSuccessAlert } = useShowAlert();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateRole = async (data: any) => {
    try {
      setIsSubmitting(true);

      const res = await createRole(data);

      prependData?.(res);

      showSuccessAlert("Role berhasil dibuat");
      return true;
    } catch (err) {
      showErrorAlert(err, "Role gagal dibuat");
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateRole = async (data: any) => {
    try {
      setIsSubmitting(true);

      const res = await updateRole(data.id, data);

      updateData?.(res.data); // 🔥 replace row

      showSuccessAlert("Role berhasil diupdate");
      return true;
    } catch (err) {
      showErrorAlert(err, "Role gagal diupdate");
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteRole = async (id: number) => {
    const confirmed = await confirm({
      title: "Hapus Role",
      message: "Yakin ingin menghapus role ini?",
      confirmText: "Hapus",
      cancelText: "Batal",
      variant: "destructive",
    });

    if (!confirmed) return;

    try {
      await deleteRole(id);
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
    handleCreateRole,
    handleUpdateRole,
    handleDeleteRole,
    isSubmitting,
  };
}
