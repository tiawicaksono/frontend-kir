"use client";

import { createContext, useContext, useState, useCallback } from "react";
import Alert from "@/components/ui/alert/Alert";

type AlertVariant = "success" | "error" | "warning" | "info";

interface AlertData {
  variant: AlertVariant;
  title: string;
  message: string;
}

interface AlertContextType {
  showAlert: (data: AlertData) => void;
}

const AlertContext = createContext<AlertContextType | null>(null);

export function AlertProvider({ children }: { children: React.ReactNode }) {
  const [alert, setAlert] = useState<AlertData | null>(null);

  const showAlert = useCallback((data: AlertData) => {
    setAlert(data);

    // auto hide 4 detik
    setTimeout(() => {
      setAlert(null);
    }, 4000);
  }, []);

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}

      {/* Global Alert Render */}
      {alert && (
        <div className="fixed top-5 right-5 z-50 w-96">
          <Alert
            variant={alert.variant}
            title={alert.title}
            message={alert.message}
          />
        </div>
      )}
    </AlertContext.Provider>
  );
}

export const useAlert = () => {
  const ctx = useContext(AlertContext);
  if (!ctx) throw new Error("useAlert must be used inside AlertProvider");
  return ctx;
};
