"use client";

import { useState } from "react";
import { TabItemConfig } from "./types";

export function useAppTabs(items: TabItemConfig[], defaultKey?: string) {
  const [activeKey, setActiveKey] = useState(defaultKey || items[0]?.key);
  const [open, setOpen] = useState(false);

  const activeTab = items.find((item) => item.key === activeKey);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  return {
    activeKey,
    setActiveKey,
    activeTab,
    open,
    openModal,
    closeModal,
  };
}
