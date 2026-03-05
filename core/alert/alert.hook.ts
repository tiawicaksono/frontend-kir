"use client";

import { useAlert } from "@/core/alert/alert.context";
import { getErrorMessage } from "@/utils/errorHandler";

export function useShowAlert() {
  const { showAlert } = useAlert();

  const showErrorAlert = (error: unknown, fallback?: string) => {
    showAlert({
      variant: "error",
      title: "Error",
      message: getErrorMessage(error, fallback),
    });
  };

  const showSuccessAlert = (message = "Success") => {
    showAlert({
      variant: "success",
      title: "Success",
      message,
    });
  };

  return { showErrorAlert, showSuccessAlert };
}
