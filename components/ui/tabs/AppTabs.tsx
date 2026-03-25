"use client";

import { Tabs, Button, Badge } from "antd";
import { AppTabsProps } from "./types";
import { useAppTabs } from "./useAppTabs";
import { Modal } from "../modal";
import { PlusOutlined } from "@ant-design/icons";

export default function AppTabs({ items, defaultActiveKey }: AppTabsProps) {
  const {
    activeKey,
    setActiveKey,
    activeTab,
    open,
    mode,
    formData,
    openCreate,
    openEdit,
    closeModal,
  } = useAppTabs(items, defaultActiveKey);

  const handleActionClick = () => {
    if (activeTab?.actionType === "custom") {
      activeTab?.onActionClick?.();
      return;
    }

    openCreate();
  };

  return (
    <>
      <Tabs
        activeKey={activeKey}
        onChange={setActiveKey}
        tabBarExtraContent={
          activeTab?.showAction ? (
            <Button type="primary" onClick={handleActionClick}>
              <PlusOutlined /> {activeTab?.actionLabel || "Add"}
            </Button>
          ) : null
        }
        items={items.map((item) => ({
          key: item.key,
          label: (
            <div className="flex items-center gap-2">
              <span>{item.label}</span>
              {typeof item.badgeCount === "number" && (
                <Badge count={item.badgeCount} size="small" />
              )}
            </div>
          ),

          // 🔥 inject openEdit ke children
          children: item.children({
            openEdit,
          }),
        }))}
      />

      <Modal isOpen={open} onClose={closeModal} className="max-w-lg">
        <h2 className="text-lg font-semibold mb-4">
          {mode === "create" ? activeTab?.actionLabel : "Edit Data"}
        </h2>

        {activeTab?.renderForm?.({
          close: closeModal,
          mode,
          formData,
        })}
      </Modal>
    </>
  );
}
