"use client";

import { useContext } from "react";
import { ConfirmContext } from "./confirm.context";

export function useConfirm() {
  const ctx = useContext(ConfirmContext);

  if (!ctx) {
    throw new Error("use Confirm must be used inside ConfirmProvider");
  }

  return ctx;
}
