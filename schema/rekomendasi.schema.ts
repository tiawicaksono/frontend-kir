export const rekomendasiSchema: Record<string, any[]> = {
  mutasi_keluar: [
    {
      col: "left",
      fields: [
        {
          name: "area_tujuan_id",
          label: "Master Area",
          type: "select",
          required: true,
        },

        // existing form fields
        {
          name: "no_surat_rekomendasi",
          label: "No Surat",
          type: "text",
          required: true,
          uppercase: true,
        },
        {
          name: "no_pemilik_tujuan",
          label: "No Identitas",
          type: "text",
          required: true,
          uppercase: true,
        },
        {
          name: "nama_pemilik_tujuan",
          label: "Nama",
          type: "text",
          required: true,
          uppercase: true,
        },
        {
          name: "alamat_pemilik_tujuan",
          label: "Alamat",
          type: "text",
          required: true,
          uppercase: true,
        },
      ],
    },
    {
      col: "right",
      fields: [
        {
          name: "provinsi_id",
          label: "Provinsi",
          type: "select",
          required: true,
        },
        { name: "kota_id", label: "Kota", type: "select", required: true },
        {
          name: "kecamatan_id",
          label: "Kecamatan",
          type: "select",
          required: true,
        },
        {
          name: "kelurahan_id",
          label: "Kelurahan",
          type: "select",
          required: true,
        },
      ],
    },
  ],

  numpang_keluar: [
    {
      col: "left",
      fields: [
        {
          name: "area_tujuan_id",
          label: "Master Area",
          type: "select",
          required: true,
        },
      ],
    },
  ],
};
