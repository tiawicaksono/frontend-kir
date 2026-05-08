"use client";

import { useContext } from "react";
import { ConfirmContext } from "./confirm.context";

export function useConfirm() {
  const ctx = useContext(ConfirmContext);

  if (!ctx) {
    // During SSR, return a mock context to prevent errors
    if (typeof window === "undefined") {
      return {
        confirm: async () => false,
      };
    }
    throw new Error("use Confirm must be used inside ConfirmProvider");
  }

  return ctx;
}
