// /schema/pendaftaran.schema.ts

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
          readonly: true,
          span: 24,
        },

        {
          name: "no_mesin",
          label: "No Mesin",
          type: "text",
          readonly: true,
          span: 24,
        },

        {
          name: "no_rangka",
          label: "No Rangka",
          type: "text",
          readonly: true,
          span: 24,
        },

        {
          name: "tanggal_uji",
          label: "Tanggal Uji",
          type: "date",
          required: true,
          span: 24,
        },

        {
          name: "tanggal_mati_uji",
          label: "Tanggal Mati Uji",
          type: "date",
          span: 24,
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
        },

        {
          name: "kota_id",
          label: "Kota / Kabupaten",
          type: "select",
          span: 24,
        },

        {
          name: "kecamatan_id",
          label: "Kecamatan",
          type: "select",
          span: 24,
        },

        {
          name: "kelurahan_id",
          label: "Kelurahan / Desa",
          type: "select",
          span: 24,
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
            {
              label: "Tidak",
              value: false,
            },

            {
              label: "Ya",
              value: true,
            },
          ],

          span: 24,
        },

        {
          name: "biro_jasa_id",
          label: "Biro Jasa",
          type: "select",

          options: biroOptions,

          span: 24,

          visible: (values: any) => values?.is_biro_jasa === true,
        },
      ],
    },
  ];
};
