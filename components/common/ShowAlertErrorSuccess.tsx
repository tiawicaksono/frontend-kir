"use client";

import { useAlert } from "@/context/AlertContext";
import { getErrorMessage } from "@/utils/errorHandler";

export function useShowAlert() {
  const { showAlert } = useAlert();

  const showErrorAlert = (error: any, fallback?: string) => {
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
