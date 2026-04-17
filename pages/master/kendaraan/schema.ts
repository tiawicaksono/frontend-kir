import { StepSchema } from "./type";

// schema.ts
export const kendaraanSteps: StepSchema[] = [
  {
    title: "Profil Kendaraan",
    sections: [
      {
        title: "Dokumen",
        fields: [
          { name: "no_sut", label: "No SUT", type: "text", uppercase: true },
          { name: "penerbit_sut", label: "Penerbit SUT", type: "text" },
          { name: "tanggal_sut", label: "Tanggal SUT", type: "date" },

          { name: "no_srut", label: "No SRUT", type: "text", uppercase: true },
          { name: "penerbit_srut", label: "Penerbit SRUT", type: "text" },
          { name: "tanggal_srut", label: "Tanggal SRUT", type: "date" },

          { name: "no_srb", label: "No SRB", type: "text", uppercase: true },
          { name: "penerbit_srb", label: "Penerbit SRB", type: "text" },
          { name: "tanggal_srb", label: "Tanggal SRB", type: "date" },
        ],
      },
      {
        title: "Identitas Kendaraan",
        fields: [
          {
            name: "no_uji",
            label: "No Uji",
            type: "text",
            required: true,
            uppercase: true,
          },
          {
            name: "no_kendaraan",
            label: "No Polisi",
            type: "text",
            uppercase: true,
          },
          {
            name: "no_rangka",
            label: "No Rangka",
            type: "text",
            required: true,
            uppercase: true,
          },
          {
            name: "no_mesin",
            label: "No Mesin",
            type: "text",
            uppercase: true,
          },
          { name: "tahun_kendaraan", label: "Tahun", type: "text" },
          {
            name: "status",
            label: "Status",
            type: "select",
            default: "UMUM",
            options: [
              { label: "UMUM", value: "UMUM" },
              { label: "BUKAN UMUM", value: "BUKAN UMUM" },
            ],
          },
        ],
      },
      {
        title: "Pemilik",
        fields: [
          {
            name: "nama_pemilik",
            label: "Nama Pemilik",
            type: "text",
            required: true,
          },
          { name: "no_hp", label: "No HP", type: "text" },
          { name: "identitas", label: "Jenis Identitas", type: "text" },
          { name: "no_identitas", label: "No Identitas", type: "text" },
        ],
      },
      {
        title: "Alamat",
        fields: [
          { name: "alamat", label: "Alamat", type: "text" },
          { name: "rt", label: "RT", type: "text" },
          { name: "rw", label: "RW", type: "text" },
          { name: "provinsi_id", label: "Provinsi", type: "select" },
          { name: "kota_id", label: "Kota", type: "select" },
          { name: "kecamatan_id", label: "Kecamatan", type: "select" },
          { name: "kelurahan_id", label: "Kelurahan", type: "select" },
        ],
      },
    ],
  },

  {
    title: "Spesifikasi Kendaraan",
    sections: [
      {
        title: "Mesin",
        fields: [
          { name: "isi_silinder", label: "Isi Silinder", type: "number" },
          { name: "daya_motor", label: "Daya Motor", type: "number" },
          { name: "bahan_bakar_id", label: "Bahan Bakar", type: "select" },
        ],
      },
      {
        title: "Dimensi",
        fields: [
          { name: "panjang_utama", label: "Panjang", type: "number" },
          { name: "lebar_utama", label: "Lebar", type: "number" },
          { name: "tinggi_utama", label: "Tinggi", type: "number" },
        ],
      },
      {
        title: "Berat & Kapasitas",
        fields: [
          { name: "jbb", label: "JBB", type: "number" },
          { name: "jbkb", label: "JBKB", type: "number" },
          {
            name: "daya_angkut_orang",
            label: "Daya Angkut Orang",
            type: "number",
          },
          {
            name: "daya_angkut_barang",
            label: "Daya Angkut Barang",
            type: "number",
          },
        ],
      },
    ],
  },
];
