"use client";

import { Tabs, Button, Badge } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import { AppTabsProps } from "./types";
import { useAppTabs } from "./useAppTabs";

import { useModal } from "@/core/modal/modal.hook";

export default function AppTabs({ items, defaultActiveKey }: AppTabsProps) {
  const { activeKey, setActiveKey, activeTab } = useAppTabs(
    items,
    defaultActiveKey,
  );

  const { openModal } = useModal();

  // =========================
  // CREATE
  // =========================
  const handleCreate = () => {
    if (!activeTab) return;

    if (activeTab.actionType === "page") {
      activeTab.onActionClick?.();
      return;
    }

    if (activeTab.actionType === "custom") {
      activeTab.onActionClick?.();
      return;
    }

    openModal({
      className: "max-w-lg",
      content: (
        <>
          <h2 className="mb-4 text-lg font-semibold">
            {activeTab.actionLabel || "Add Data"}
          </h2>

          {activeTab.Form && (
            <activeTab.Form
              mode="create"
              onSubmit={(data: any) => {
                return activeTab.module.handleCreate(data);
              }}
            />
          )}
        </>
      ),
    });
  };

  // =========================
  // EDIT
  // =========================
  const handleEdit = (item: any, row: any) => {
    if (item.actionType === "page") {
      item.onEditPage?.(row);
      return;
    }

    openModal({
      className: "max-w-lg",
      content: (
        <>
          <h2 className="mb-4 text-lg font-semibold">Edit Data</h2>

          {item.Form && (
            <item.Form
              mode="edit"
              initialValues={row}
              onSubmit={(data: any) => {
                const pk = item.module.table.config.primary_key;

                return item.module.handleUpdate({
                  ...data,
                  [pk]: row?.[pk],
                });
              }}
            />
          )}
        </>
      ),
    });
  };

  return (
    <Tabs
      activeKey={activeKey}
      onChange={setActiveKey}
      tabBarExtraContent={
        activeTab?.showAction ? (
          <Button type="primary" onClick={handleCreate}>
            <PlusOutlined />
            {activeTab.actionLabel || "Add"}
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
                item.onViewPage?.(row);
              }}
              onEdit={(row: any) => {
                handleEdit(item, row);
              }}
              onDelete={item.module.handleDeleteWrapper}
              onReload={item.module.handleReload}
            />
          ),
        };
      })}
    />
  );
}
