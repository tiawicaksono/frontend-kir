import { useState } from "react";
import { createUser } from "@/services/user-management.service";
import { useShowAlert } from "@/core/alert/alert.hook";

export function useUserManagementAction(addNewUser: (data: any) => void) {
  const { showErrorAlert, showSuccessAlert } = useShowAlert();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreate = async (data: any) => {
    try {
      setIsSubmitting(true);

      const newUser = await createUser(data);
      console.log(newUser);
      // 🔥 inject ke FE state (bukan table langsung)
      addNewUser(newUser);

      showSuccessAlert("User berhasil dibuat");
      return true;
    } catch (err) {
      showErrorAlert(err, "User gagal dibuat");
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    handleCreate,
    isSubmitting,
  };
}
