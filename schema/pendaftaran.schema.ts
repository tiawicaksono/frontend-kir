import dayjs from "dayjs";

import { SectionSchema } from "./type";

export const pendaftaranSections = ({
  statusOptions,
  biroOptions,
  areaOptions,
  wilayah,
}: any): SectionSchema[] => {
  return [
    // ====================================
    // SEARCH & JENIS UJI
    // ====================================

    {
      title: "JENIS UJI",

      fields: [
        {
          name: "status_penerbitan_id",
          label: "Jenis Uji",
          type: "select",
          required: true,
          options: statusOptions,
          span: 24,
        },

        // ====================================
        // KARTU HILANG
        // ====================================

        {
          name: "no_kartu_hilang",
          label: "No Kartu Hilang",
          type: "text",
          span: 24,

          visible: (values: any) => {
            console.log("VISIBLE VALUES", values);

            return Number(values?.status_penerbitan_id) === 4;
          },
        },

        // ====================================
        // NUMPANG / MUTASI
        // ====================================

        {
          name: "area_asal_id",
          label: "Area Asal",
          type: "select",
          options: areaOptions,
          span: 24,

          visible: (values: any) => {
            console.log("VISIBLE VALUES", values);

            return [7, 8].includes(Number(values?.status_penerbitan_id));
          },
        },

        {
          name: "q",
          label: "Search",
          type: "search",
          span: 24,
        },
      ],
    },

    // ====================================
    // DATA KENDARAAN
    // ====================================

    {
      title: "DATA KENDARAAN",

      fields: [
        {
          name: "no_uji",
          label: "No Uji",
          type: "text",
          readonly: true,
          span: 24,
        },

        {
          name: "no_kendaraan",
          label: "No Kendaraan",
          type: "text",
          span: 24,
          required: true,
          uppercase: true,
        },

        {
          name: "no_mesin",
          label: "No Mesin",
          type: "text",
          span: 24,
          uppercase: true,
        },

        {
          name: "no_rangka",
          label: "No Rangka",
          type: "text",
          span: 24,
          required: true,
          uppercase: true,
        },

        {
          name: "tanggal_mati_uji",
          label: "Tanggal Mati Uji",
          type: "date",
          span: 24,
          required: true,
          default: dayjs(),
        },

        {
          name: "tanggal_uji",
          label: "Tanggal Uji",
          type: "date",
          required: true,
          span: 24,
          default: dayjs(),
        },
      ],
    },

    // ====================================
    // PEMILIK
    // ====================================

    {
      title: "PEMILIK",

      fields: [
        {
          name: "nama_pemilik",
          label: "Nama Pemilik",
          type: "text",
          span: 24,
          required: true,
          uppercase: true,
        },

        {
          name: "identitas",
          label: "Jenis Identitas",
          type: "select",
          default: "KTP",
          required: true,
          options: [
            { label: "KTP", value: "KTP" },
            { label: "NIB", value: "NIB" },
            { label: "DOMISILI", value: "DOMISILI" },
          ],
        },
        {
          name: "no_identitas",
          label: "No Identitas",
          type: "text",
          required: true,
          uppercase: true,
        },

        {
          name: "no_hp",
          label: "No HP",
          type: "text",
          span: 24,
        },

        {
          name: "alamat",
          label: "Alamat",
          type: "textarea",
          rows: 3,
          span: 24,
          required: true,
          uppercase: true,
        },
      ],
    },

    // ====================================
    // WILAYAH
    // ====================================

    {
      title: "WILAYAH",

      fields: [
        {
          name: "provinsi_id",
          label: "Provinsi",
          type: "select",
          span: 24,
          required: true,
        },

        {
          name: "kota_id",
          label: "Kota / Kab",
          type: "select",
          span: 24,
          required: true,
        },

        {
          name: "kecamatan_id",
          label: "Kecamatan",
          type: "select",
          span: 24,
          required: true,
        },

        {
          name: "kelurahan_id",
          label: "Kelurahan",
          type: "select",
          span: 24,
          required: true,
        },
      ],
    },

    // ====================================
    // BIRO JASA
    // ====================================

    {
      title: "BIRO JASA",

      fields: [
        {
          name: "is_biro_jasa",
          label: "Diwakilkan",
          type: "select",

          options: [
            { label: "Tidak", value: false },
            { label: "Ya", value: true },
          ],
          default: false,
          span: 24,
        },

        {
          name: "biro_jasa_id",
          label: "Biro Jasa",
          type: "select",
          span: 24,
          options: biroOptions,
          visible: (values: any) => values?.is_biro_jasa === true,
        },
      ],
    },
  ];
};
