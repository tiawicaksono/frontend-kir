"use client";

import { Dropdown } from "antd";

import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { PembayaranRow } from "@/types/pembayaran.type";

interface Props {
  row: PembayaranRow;

  loading?: boolean;

  onToggle: (row: PembayaranRow) => void;

  onEdit: (row: PembayaranRow) => void;

  onDelete: (id: number) => void;
}

export default function PembayaranActions({
  row,
  loading,

  onToggle,
  onEdit,
  onDelete,
}: Props) {
  const items = [
    {
      key: "toggle",

      disabled: loading,

      label: (
        <span className="flex items-center gap-2">
          {row.retribusi_status_pembayaran ? (
            <>
              <CloseCircleOutlined />
              Tandai Belum Bayar
            </>
          ) : (
            <>
              <CheckCircleOutlined />
              Tandai Lunas
            </>
          )}
        </span>
      ),

      onClick: () => onToggle(row),
    },

    {
      key: "edit",

      label: (
        <span className="flex items-center gap-2">
          <EditOutlined />
          Edit
        </span>
      ),

      onClick: () => onEdit(row),
    },

    {
      key: "delete",

      danger: true,

      label: (
        <span className="flex items-center gap-2">
          <DeleteOutlined />
          Delete
        </span>
      ),

      onClick: () => onDelete(row.id),
    },
  ];

  return (
    <Dropdown menu={{ items }} trigger={["click"]}>
      <MoreOutlined className="cursor-pointer" />
    </Dropdown>
  );
}
