"use client";

import { useEffect } from "react";
import { ModalOptions } from "./modal.context";

interface Props {
  options: ModalOptions;
  onClose: () => void;
}

export default function ModalDialog({ options, onClose }: Props) {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = originalOverflow;
    };
  }, [onClose]);

  const contentClasses = options.isFullscreen ? "w-full h-full" : "w-full";

  const content =
    typeof options.content === "function"
      ? options.content({ close: onClose })
      : options.content;

  return (
    <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div
        className={`
          relative
          ${contentClasses}
          rounded-2xl
          bg-white
          dark:bg-gray-900
          shadow-xl
          animate-in
          fade-in
          zoom-in-95
          duration-200
          ${options.className ?? ""}
        `}
      >
        {options.showCloseButton !== false && (
          <button
            onClick={onClose}
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700 transition"
          >
            ✕
          </button>
        )}

        <div className="p-6">{content}</div>
      </div>
    </div>
  );
}
