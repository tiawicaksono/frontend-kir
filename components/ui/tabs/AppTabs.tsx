"use client";

import { Tabs, Button, Badge } from "antd";
import { AppTabsProps } from "./types";
import { useAppTabs } from "./useAppTabs";
import { Modal } from "../modal";
import { PlusOutlined } from "@ant-design/icons";

export default function AppTabs({ items, defaultActiveKey }: AppTabsProps) {
  const { activeKey, setActiveKey, activeTab, open, openModal, closeModal } =
    useAppTabs(items, defaultActiveKey);

  // 🔥 handle click action
  const handleActionClick = () => {
    if (activeTab?.actionType === "custom") {
      activeTab?.onActionClick?.();
      return;
    }

    // default: modal
    openModal();
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
            <>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1">{item.label}</span>

                {typeof item.badgeCount === "number" && (
                  <Badge
                    count={item.badgeCount}
                    size="small"
                    overflowCount={999}
                    className="ml-1"
                  />
                )}
              </div>
            </>
          ),
          children: item.children,
        }))}
      />

      {/* 🔥 Global Modal */}
      {activeTab?.actionType !== "custom" && (
        <Modal isOpen={open} onClose={closeModal} className="max-w-lg">
          <h2 className="text-lg font-semibold mb-4">
            {activeTab?.actionLabel}
          </h2>
          {activeTab?.renderForm?.(closeModal)}
        </Modal>
      )}
    </>
  );
}
