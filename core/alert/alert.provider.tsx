"use client";

import { useState, useCallback, useRef, ReactNode } from "react";

import { AnimatePresence, motion } from "framer-motion";
import Alert from "@/components/ui/alert/Alert";
import { AlertContext, AlertVariant } from "@/core/alert/alert.context";

interface Toast {
  id: number;
  variant: AlertVariant;
  title: string;
  message: string;
}

export function AlertProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const idRef = useRef(0);

  const showAlert = useCallback((data: Omit<Toast, "id">) => {
    const id = idRef.current++;
    const newToast: Toast = { id, ...data };

    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}

      <div className="fixed top-5 right-5 z-50 flex flex-col gap-3 w-96">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              layout
            >
              <div className="relative">
                <Alert
                  variant={toast.variant}
                  title={toast.title}
                  message={toast.message}
                />

                <button
                  onClick={() => removeToast(toast.id)}
                  className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </AlertContext.Provider>
  );
}
