"use client";

import { useEffect } from "react";
import { ConfirmOptions } from "./confirm.context";

type Props = {
  options: ConfirmOptions;
  onClose: (result: boolean) => void;
};

export default function ConfirmDialog({ options, onClose }: Props) {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  return (
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
            onClick={() => onClose(false)}
            className="px-4 py-2 text-sm rounded-lg border border-gray-200 hover:bg-gray-50 transition"
          >
            {options.cancelText || "Batal"}
          </button>

          <button
            onClick={() => onClose(true)}
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
  );
}
