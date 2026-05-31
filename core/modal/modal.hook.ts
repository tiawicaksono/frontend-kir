"use client";

import { useContext } from "react";
import { ModalContext } from "./modal.context";

export function useModal() {
  const ctx = useContext(ModalContext);

  if (!ctx) {
    // SSR Safe
    if (typeof window === "undefined") {
      return {
        openModal: () => {},
        closeModal: () => {},
      };
    }

    throw new Error("useModal must be used inside ModalProvider");
  }

  return ctx;
}
