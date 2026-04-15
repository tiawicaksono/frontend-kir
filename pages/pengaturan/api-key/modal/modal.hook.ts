"use client";

import { useState } from "react";
import { ApiKeys } from "@/types/api-keys.type";

export function useApiKeyModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [editing, setEditing] = useState<ApiKeys | null>(null);

  const openCreate = () => {
    setEditing(null); // 🔥 penting
    setIsOpen(true);
  };

  const openEdit = (data: ApiKeys) => {
    setEditing(data);
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
    setEditing(null); // 🔥 reset biar clean
  };

  return {
    isOpen,
    editing,
    openCreate,
    openEdit,
    close,
  };
}
