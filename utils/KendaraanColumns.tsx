"use client";

import { Badge, Tooltip } from "antd";

export const createKendaraanColumns = (columns: any[]) => {
  return columns.map((col) => {
    if (col.dataIndex !== "is_blokir") {
      return col;
    }

    return {
      ...col,

      title: "Status",

      render: (_: unknown, row: any) => (
        <Tooltip
          title={
            row.is_blokir ? row.alasan_blokir || "Tidak ada alasan" : undefined
          }
        >
          <Badge
            status={row.is_blokir ? "error" : "success"}
            text={row.is_blokir ? "Diblokir" : "Aktif"}
          />
        </Tooltip>
      ),
    };
  });
};
