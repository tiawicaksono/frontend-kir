"use client";

import { Dropdown, MenuProps } from "antd";
import {
  MoreOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  BlockOutlined,
} from "@ant-design/icons";

interface Props {
  record: any;
  rowKeyField?: string;
  onEdit?: (record: any) => void;
  onDelete?: (record: any) => void;
  onView?: (record: any) => void;

  onBlokir?: (record: any) => void;
  onUnblock?: (record: any) => void;

  actions?: ("view" | "edit" | "delete" | "blokir")[];
}

export default function TableActions({
  record,
  rowKeyField,
  onEdit,
  onDelete,
  onView,
  onBlokir,
  onUnblock,
  actions = ["view", "edit", "delete", "blokir"],
}: Props) {
  const id = rowKeyField
    ? record[rowKeyField]
    : record.id ||
      record[Object.keys(record).find((k) => k.endsWith("_id")) || ""];

  const items: MenuProps["items"] = [];

  if (actions.includes("view")) {
    items.push({
      key: "view",
      label: (
        <span className="flex items-center gap-2">
          <EyeOutlined /> View
        </span>
      ),
      onClick: () => onView?.(record),
    });
  }

  if (actions.includes("edit")) {
    items.push({
      key: "edit",
      label: (
        <span className="flex items-center gap-2">
          <EditOutlined /> Edit
        </span>
      ),
      onClick: () => onEdit?.(record),
    });
  }

  if (actions.includes("delete")) {
    items.push({
      key: "delete",
      label: (
        <span className="flex items-center gap-2 text-red-500">
          <DeleteOutlined /> Delete
        </span>
      ),
      onClick: () => onDelete?.(id),
    });
  }

  if (actions.includes("blokir")) {
    items.push({
      key: "blokir",
      label: (
        <span className="flex items-center gap-2">
          <BlockOutlined />
          {record.is_blokir ? "Unblock" : "Block"}
        </span>
      ),

      onClick: () => {
        if (record.is_blokir) {
          onUnblock?.(record);
        } else {
          onBlokir?.(record);
        }
      },
    });
  }

  return (
    <Dropdown menu={{ items }} trigger={["click"]}>
      <MoreOutlined className="cursor-pointer text-lg" />
    </Dropdown>
  );
}
