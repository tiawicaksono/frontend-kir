"use client";

import { Badge, Tag } from "antd";
import dayjs from "dayjs";

import { getPendaftaranTagColor } from "@/utils/jenisPendaftaranTag";
import { PembayaranRow } from "@/types/pembayaran.type";

export const createPembayaranColumns = () => [
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
    title: "Tanggal Uji",

    dataIndex: "tanggal_uji",

    render: (val: string) => (val ? dayjs(val).format("DD/MM/YYYY") : "-"),
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

    render: (_: unknown, row: PembayaranRow) => (
      <Badge
        status={row.retribusi_status_pembayaran ? "success" : "error"}
        text={row.retribusi_status_pembayaran ? "Lunas" : "Belum Bayar"}
      />
    ),
  },

  {
    title: "Pendaftaran",

    render: (_: unknown, row: PembayaranRow) => (
      <Tag color={getPendaftaranTagColor(row.status_penerbitan_issuance_id)}>
        {row.status_penerbitan_issuance_name}
      </Tag>
    ),
  },

  {
    title: "Petugas",

    dataIndex: "petugas_name",
  },
];
