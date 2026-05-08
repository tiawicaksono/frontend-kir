"use client";

import { useAlert } from "@/core/alert/alert.context";
import { getErrorMessage } from "@/utils/errorHandler";

export function useShowAlert() {
  const alert = useAlert();

  const showErrorAlert = (error: unknown, fallback?: string) => {
    alert.showAlert({
      variant: "error",
      title: "Error",
      message: getErrorMessage(error, fallback),
    });
  };

  const showSuccessAlert = (message = "Success") => {
    alert.showAlert({
      variant: "success",
      title: "Success",
      message,
    });
  };

  return { showErrorAlert, showSuccessAlert };
}
