"use client";

import { Dropdown, MenuProps } from "antd";
import { MoreOutlined } from "@ant-design/icons";

interface Props {
  record: any;
  rowKeyField?: string;
  onEdit?: (record: any) => void;
  onDelete?: (record: any) => void;
  onView?: (record: any) => void;
}

export default function TableActions({
  record,
  rowKeyField,
  onEdit,
  onDelete,
  onView,
}: Props) {
  const id = rowKeyField
    ? record[rowKeyField]
    : record.id ||
      record[Object.keys(record).find((k) => k.endsWith("_id")) || ""];

  const items: MenuProps["items"] = [
    {
      key: "view",
      label: "View",
      onClick: () => onView?.(record),
    },
    {
      key: "edit",
      label: "Edit",
      onClick: () => onEdit?.(record),
    },
    {
      key: "delete",
      label: "Delete",
      onClick: () => onDelete?.(record),
    },
  ];

  return (
    <Dropdown menu={{ items }} trigger={["click"]}>
      <MoreOutlined className="cursor-pointer text-lg" />
    </Dropdown>
  );
}
