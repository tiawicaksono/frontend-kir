"use client";

import { useState } from "react";

import { TabItemConfig } from "./types";

export function useAppTabs(items: TabItemConfig[], defaultKey?: string) {
  const [activeKey, setActiveKey] = useState(defaultKey || items[0]?.key);

  const activeTab = items.find((item) => item.key === activeKey);

  return {
    activeKey,
    setActiveKey,
    activeTab,
  };
}
