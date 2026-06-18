"use client";

import { Badge, Tag } from "antd";
import dayjs from "dayjs";

import { getPendaftaranTagColor } from "@/utils/jenisPendaftaranTag";
import { AntrianUjiRow } from "@/types/antrian-uji.type";

export const createAntrianUjiColumns = () => [
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

    render: (_: unknown, row: AntrianUjiRow) => (
      <Badge
        status={row.hasil_uji_is_datang ? "success" : "error"}
        text={row.hasil_uji_is_datang ? "Sudah Datang" : "Belum Datang"}
      />
    ),
  },

  {
    title: "Pendaftaran",

    render: (_: unknown, row: AntrianUjiRow) => (
      <Tag color={getPendaftaranTagColor(row.status_penerbitan_issuance_id)}>
        {row.status_penerbitan_issuance_name}
      </Tag>
    ),
  },
];
