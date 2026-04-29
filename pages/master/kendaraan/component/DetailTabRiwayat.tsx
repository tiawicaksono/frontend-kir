"use client";

import { Table } from "antd";
import { formatDate } from "@/utils/formatDate";

export default function DetailTabRiwayat({
  data,
  loading,
}: {
  data: any[];
  loading: boolean;
}) {
  const columns = [
    {
      title: "Tanggal",
      dataIndex: "tanggal_uji",
      render: (val: string) => formatDate(val),
    },
    { title: "Jenis Uji", dataIndex: "jenis_uji" },
    { title: "Nama Penguji", dataIndex: "nama_penguji" },
    { title: "Hasil", dataIndex: "hasil_uji" },
  ];

  return (
    <Table rowKey="id" columns={columns} dataSource={data} loading={loading} />
  );
}
