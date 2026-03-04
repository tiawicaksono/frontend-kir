import { getErrorMessage } from "@/utils/errorHandler";

export function showError(showAlert: any, error: any, fallback?: string) {
  showAlert({
    variant: "error",
    title: "Error",
    message: getErrorMessage(error, fallback),
  });
}

export function showSuccess(
  showAlert: any,
  title = "Success",
  message?: string,
) {
  message = message || "Success";
  showAlert({
    variant: "success",
    title,
    message,
  });
}
