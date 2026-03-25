import { useState } from "react";
import { createUser, updateUser } from "@/services/user-management.service";
import { useShowAlert } from "@/core/alert/alert.hook";

export function useUserManagementAction(
  prependData?: (data: any) => void,
  updateData?: (data: any) => void,
) {
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

  return {
    handleCreate,
    handleUpdate,
    isSubmitting,
  };
}
