import { useState } from "react";
import { TabItemConfig } from "./types";

export function useAppTabs(items: TabItemConfig[], defaultKey?: string) {
  const [activeKey, setActiveKey] = useState(defaultKey || items[0]?.key);

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"create" | "edit">("create");
  const [formData, setFormData] = useState<any>(null);

  const activeTab = items.find((i) => i.key === activeKey);

  const openCreate = () => {
    setMode("create");
    setFormData(null);
    setOpen(true);
  };

  const openEdit = (data: any) => {
    setMode("edit");
    setFormData(data);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setFormData(null);
  };

  return {
    activeKey,
    setActiveKey,
    activeTab,

    open,
    mode,
    formData,

    openCreate,
    openEdit,
    closeModal,
  };
}
