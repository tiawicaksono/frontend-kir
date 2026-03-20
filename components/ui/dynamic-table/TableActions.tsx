"use client";

import { Dropdown, MenuProps } from "antd";
import { MoreOutlined } from "@ant-design/icons";

interface Props {
  record: any;
  rowKeyField?: string;
}

export default function TableActions({ record, rowKeyField }: Props) {
  const id = rowKeyField
    ? record[rowKeyField]
    : record.id ||
      record[Object.keys(record).find((k) => k.endsWith("_id")) || ""];

  const items: MenuProps["items"] = [
    {
      key: "view",
      label: "View",
      onClick: () => console.log("view", id),
    },
    {
      key: "edit",
      label: "Edit",
      onClick: () => console.log("edit", id),
    },
    {
      key: "delete",
      label: "Delete",
      onClick: () => console.log("delete", id),
    },
  ];

  return (
    <Dropdown menu={{ items }} trigger={["click"]}>
      <MoreOutlined className="cursor-pointer text-lg" />
    </Dropdown>
  );
}
