"use client";

import { createContext, useContext, useState } from "react";

type ConfirmOptions = {
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "default" | "destructive";
};

type ConfirmContextType = {
  confirm: (options: ConfirmOptions) => Promise<boolean>;
};

const ConfirmContext = createContext<ConfirmContextType | null>(null);

export function ConfirmProvider({ children }: { children: React.ReactNode }) {
  const [options, setOptions] = useState<ConfirmOptions | null>(null);
  const [resolver, setResolver] = useState<(value: boolean) => void>();

  const confirm = (opts: ConfirmOptions) => {
    setOptions(opts);
    return new Promise<boolean>((resolve) => {
      setResolver(() => resolve);
    });
  };

  const handleClose = (result: boolean) => {
    setOptions(null);
    resolver?.(result);
  };

  return (
    <ConfirmContext.Provider value={{ confirm }}>
      {children}

      {options && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="w-[400px] rounded-2xl bg-white p-6 shadow-xl animate-in fade-in zoom-in-95 duration-200">
            <h2 className="text-lg font-semibold mb-2">
              {options.title || "Konfirmasi"}
            </h2>

            <p className="text-sm text-gray-500 mb-6">
              {options.message || "Apakah kamu yakin?"}
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => handleClose(false)}
                className="px-4 py-2 text-sm rounded-lg border border-gray-200 hover:bg-gray-50 transition"
              >
                {options.cancelText || "Batal"}
              </button>

              <button
                onClick={() => handleClose(true)}
                className={`px-4 py-2 text-sm rounded-lg text-white transition ${
                  options.variant === "destructive"
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {options.confirmText || "Ya"}
              </button>
            </div>
          </div>
        </div>
      )}
    </ConfirmContext.Provider>
  );
}

export function useConfirm() {
  const context = useContext(ConfirmContext);
  if (!context) {
    throw new Error("useConfirm must be used inside ConfirmProvider");
  }
  return context;
}
