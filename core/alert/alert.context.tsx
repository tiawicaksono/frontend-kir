import { createContext, useContext } from "react";

export type AlertVariant = "success" | "error" | "warning" | "info";

interface Toast {
  id: number;
  variant: AlertVariant;
  title: string;
  message: string;
}

interface AlertContextType {
  showAlert: (data: Omit<Toast, "id">) => void;
}

export const AlertContext = createContext<AlertContextType | null>(null);

export const useAlert = () => {
  const ctx = useContext(AlertContext);
  if (!ctx) throw new Error("useAlert must be used inside AlertProvider");
  return ctx;
};
