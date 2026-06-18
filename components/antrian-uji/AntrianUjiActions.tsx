"use client";

import { Dropdown } from "antd";

import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { AntrianUjiRow } from "@/types/antrian-uji.type";

interface Props {
  row: AntrianUjiRow;

  loading?: boolean;

  onToggle: (row: AntrianUjiRow) => void;
}

export default function AntrianUjiActions({
  row,
  loading,

  onToggle,
}: Props) {
  return (
    <Dropdown trigger={["click"]}>
      <MoreOutlined className="cursor-pointer" />
    </Dropdown>
  );
}
