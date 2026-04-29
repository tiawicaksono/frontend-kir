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
    if (activeTab?.actionType === "page") {
      closeModal();
      activeTab?.onActionClick?.();
      return;
    }

    if (activeTab?.actionType === "custom") {
      activeTab?.onActionClick?.();
      return;
    }

    openCreate(); // default modal
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
        items={items.map((item) => {
          const TableComponent = item.Table;

          return {
            key: item.key,
            label: (
              <div className="flex items-center gap-2">
                <span>
                  {item.icon} {item.label}
                </span>
                {typeof item.badge === "number" && (
                  <Badge count={item.badge} size="small" />
                )}
              </div>
            ),

            children: (
              <TableComponent
                table={item.module.table}
                onView={(row: any) => {
                  item.onViewPage?.(row); // 🔥 TAMBAH INI
                }}
                onEdit={(row: any) => {
                  if (item.actionType === "page") {
                    item.onEditPage?.(row);
                  } else {
                    openEdit(row);
                  }
                }}
                onDelete={item.module.handleDeleteWrapper}
                onReload={item.module.handleReload}
              />
            ),
          };
        })}
      />

      {/* 🔥 MODAL (hanya kalau bukan page) */}
      {activeTab?.actionType !== "page" && open && (
        <Modal isOpen={open} onClose={closeModal} className="max-w-lg">
          <h2 className="text-lg font-semibold mb-4">
            {mode === "create"
              ? activeTab?.actionLabel || "Add Data"
              : "Edit Data"}
          </h2>

          {activeTab?.Form && (
            <activeTab.Form
              mode={mode}
              initialValues={formData}
              onSubmit={(data: any) => {
                const pk = activeTab.module.table.config.primary_key;

                return mode === "create"
                  ? activeTab.module.handleCreate(data)
                  : activeTab.module.handleUpdate({
                      ...data,
                      [pk]: formData?.[pk],
                    });
              }}
              onSuccess={closeModal}
            />
          )}
        </Modal>
      )}
    </>
  );
}
