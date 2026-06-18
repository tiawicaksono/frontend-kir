"use client";

import { Badge, Tag } from "antd";
import { PrinterOutlined } from "@ant-design/icons";

import { getPendaftaranTagColor } from "@/utils/jenisPendaftaranTag";

type Props = {
  loadingId: number | null;
  onPrint: (row: any) => void;
};

export const createCetakKartuUjiColumns = ({ loadingId, onPrint }: Props) => [
  {
    title: "No Antrian",
    dataIndex: "no_pendaftaran_harian",
    key: "no_pendaftaran_harian",

    sorter: true,

    searchable: true,
    searchField: "no_pendaftaran_harian",

    render: (val: string) => <strong>{val || "-"}</strong>,
  },

  {
    title: "No Uji",
    dataIndex: "kendaraan_no_uji",

    searchable: true,
    searchField: "kendaraan.no_uji",
  },

  {
    title: "No Kendaraan",
    dataIndex: "kendaraan_no_kendaraan",

    searchable: true,
    searchField: "kendaraan.no_kendaraan",
  },

  {
    title: "Nama",
    dataIndex: "kendaraan_nama_pemilik",

    searchable: true,
    searchField: "kendaraan.nama_pemilik",
  },

  {
    title: "Status",

    render: (_: any, row: any) => (
      <Badge
        status={row.status_cetak ? "success" : "error"}
        text={row.status_cetak ? "Sudah Cetak" : "Belum Cetak"}
      />
    ),
  },

  {
    title: "Pendaftaran",

    render: (_: any, row: any) => (
      <Tag color={getPendaftaranTagColor(row.status_penerbitan_issuance_id)}>
        {row.status_penerbitan_issuance_name}
      </Tag>
    ),
  },

  {
    title: "Petugas",
    dataIndex: "kartu_uji_petugas_name",
  },

  {
    title: "Aksi",

    width: 80,
    align: "center",

    render: (_: any, row: any) => (
      <PrinterOutlined
        style={{
          fontSize: 18,
          cursor: "pointer",
          color: loadingId === row.id ? "#bfbfbf" : "#1677ff",
        }}
        onClick={() => {
          if (loadingId === row.id) return;
          onPrint(row);
        }}
      />
    ),
  },
];
