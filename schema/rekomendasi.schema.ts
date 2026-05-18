// pages/loket/rekomendasi/rekomendasi.schema.ts

export const rekomendasiSchema: Record<string, any[]> = {
  mutasi_keluar: [
    {
      name: "nik",
      label: "NIK",
      type: "input",
    },

    {
      name: "nama_pemilik_baru",
      label: "Nama Pemilik Baru",
      type: "input",
    },

    {
      name: "alamat",
      label: "Alamat",
      type: "textarea",
    },

    {
      name: "provinsi",
      label: "Provinsi",
      type: "input",
    },

    {
      name: "kota",
      label: "Kota",
      type: "input",
    },

    {
      name: "kecamatan",
      label: "Kecamatan",
      type: "input",
    },

    {
      name: "kelurahan",
      label: "Kelurahan",
      type: "input",
    },

    {
      name: "master_area",
      label: "Master Area",
      type: "input",
    },
  ],

  numpang_keluar: [
    {
      name: "master_area",
      label: "Master Area",
      type: "input",
    },
  ],
};
