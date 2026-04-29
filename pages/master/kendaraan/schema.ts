import { StepSchema } from "./type";

// schema.ts
export const kendaraanSteps: StepSchema[] = [
  {
    title: "PROFIL KENDARAAN",
    sections: [
      {
        title: "DOKUMEN",
        rows: [
          {
            cols: [
              {
                span: 12,
                field: {
                  name: "no_sut",
                  label: "No SUT",
                  type: "text",
                  uppercase: true,
                },
              },
              {
                span: 8,
                field: {
                  name: "penerbit_sut",
                  label: "Penerbit SUT",
                  type: "text",
                },
              },
              {
                span: 4,
                field: {
                  name: "tanggal_sut",
                  label: "Tanggal SUT",
                  type: "date",
                },
              },
            ],
          },

          {
            cols: [
              {
                span: 12,
                field: {
                  name: "no_srut",
                  label: "No SRUT",
                  type: "text",
                  uppercase: true,
                },
              },
              {
                span: 8,
                field: {
                  name: "penerbit_srut",
                  label: "Penerbit SRUT",
                  type: "text",
                },
              },
              {
                span: 4,
                field: {
                  name: "tanggal_srut",
                  label: "Tanggal SRUT",
                  type: "date",
                },
              },
            ],
          },

          {
            cols: [
              {
                span: 12,
                field: {
                  name: "no_srb",
                  label: "No SRB",
                  type: "text",
                  uppercase: true,
                },
              },
              {
                span: 8,
                field: {
                  name: "penerbit_srb",
                  label: "Penerbit SRB",
                  type: "text",
                },
              },
              {
                span: 4,
                field: {
                  name: "tanggal_srb",
                  label: "Tanggal SRB",
                  type: "date",
                },
              },
            ],
          },
        ],
      },
      {
        title: "IDENTITAS KENDARAAN",
        rows: [
          // 🔹 row biasa (2 kolom default)
          {
            cols: [
              {
                span: 12,
                field: {
                  name: "no_uji",
                  label: "No Uji",
                  type: "text",
                  required: true,
                  uppercase: true,
                },
              },
              {
                span: 12,
                field: {
                  name: "no_kendaraan",
                  label: "No Kendaraan",
                  type: "text",
                  uppercase: true,
                },
              },
            ],
          },
          {
            cols: [
              {
                span: 12,
                field: {
                  name: "no_rangka",
                  label: "No Rangka",
                  type: "text",
                  uppercase: true,
                  required: true,
                },
              },
              {
                span: 12,
                field: {
                  name: "no_mesin",
                  label: "No Mesin",
                  type: "text",
                  uppercase: true,
                },
              },
            ],
          },

          // 🔥 1 ROW: tahun + tanggal + status + kelas jalan
          {
            cols: [
              {
                span: 8,
                field: {
                  name: "tahun_kendaraan",
                  label: "Tahun",
                  type: "integer",
                },
              },
              {
                span: 8,
                field: {
                  name: "tanggal_stnk",
                  label: "Tanggal STNK",
                  type: "date",
                  required: true,
                },
              },
              {
                span: 8,
                field: {
                  name: "status",
                  label: "Status",
                  type: "select",
                  default: "UMUM",
                  options: [
                    { label: "UMUM", value: "UMUM" },
                    { label: "BUKAN UMUM", value: "BUKAN UMUM" },
                  ],
                },
              },
            ],
          },

          // 🔥 1 ROW: merk hierarchy
          {
            cols: [
              {
                span: 8,
                field: {
                  name: "merk_id",
                  label: "Merk",
                  type: "select",
                  required: true,
                },
              },
              {
                span: 8,
                field: {
                  name: "varian_merk_id",
                  label: "Varian Merk",
                  type: "select",
                  required: true,
                },
              },
              {
                span: 8,
                field: {
                  name: "tipe_varian_merk_id",
                  label: "Tipe Varian Merk",
                  type: "select",
                  required: true,
                },
              },
            ],
          },

          // 🔹 jenis kendaraan
          {
            cols: [
              {
                span: 12,
                field: {
                  name: "jenis_kendaraan_id",
                  label: "Jenis Kendaraan",
                  type: "select",
                  required: true,
                },
              },
              {
                span: 12,
                field: {
                  name: "sub_jenis_kendaraan_id",
                  label: "Sub Jenis Kendaraan",
                  type: "select",
                  required: true,
                },
              },
            ],
          },

          // 🔹 warna
          {
            cols: [
              {
                span: 8,
                field: {
                  name: "warna_cabin",
                  label: "Warna Cabin",
                  type: "text",
                  uppercase: true,
                },
              },
              {
                span: 8,
                field: {
                  name: "warna_bak",
                  label: "Warna Bak",
                  type: "text",
                  uppercase: true,
                },
              },
              {
                span: 8,
                field: {
                  name: "bahan_utama_id",
                  label: "Bahan Utama",
                  type: "select",
                  required: true,
                },
              },
            ],
          },
        ],
      },
      {
        title: "PEMILIK KENDARAAN",
        rows: [
          {
            cols: [
              {
                span: 6,
                field: {
                  name: "nama_pemilik",
                  label: "Nama Pemilik",
                  type: "text",
                  required: true,
                },
              },
              {
                span: 6,
                field: {
                  name: "no_hp",
                  label: "No HP",
                  type: "text",
                },
              },
              {
                span: 6,
                field: {
                  name: "identitas",
                  label: "Jenis Identitas",
                  type: "select",
                  default: "KTP",
                  options: [
                    { label: "KTP", value: "KTP" },
                    { label: "NIB", value: "NIB" },
                    { label: "DOMISILI", value: "DOMISILI" },
                  ],
                },
              },
              {
                span: 6,
                field: {
                  name: "no_identitas",
                  label: "No Identitas",
                  type: "text",
                },
              },
            ],
          },
          {
            cols: [
              {
                span: 12,
                field: {
                  name: "alamat",
                  label: "Alamat Pemilik",
                  type: "text",
                },
              },
              {
                span: 6,
                field: {
                  name: "rt",
                  label: "RT",
                  type: "text",
                },
              },
              {
                span: 6,
                field: {
                  name: "rw",
                  label: "RW",
                  type: "text",
                },
              },
            ],
          },
          {
            cols: [
              {
                span: 6,
                field: {
                  name: "provinsi_id",
                  label: "Provinsi",
                  type: "select",
                  required: true,
                },
              },
              {
                span: 6,
                field: {
                  name: "kota_id",
                  label: "Kota / Kabupaten",
                  type: "select",
                  required: true,
                },
              },
              {
                span: 6,
                field: {
                  name: "kecamatan_id",
                  label: "Kecamatan",
                  type: "select",
                  required: true,
                },
              },
              {
                span: 6,
                field: {
                  name: "kelurahan_id",
                  label: "Kelurahan / Desa",
                  type: "select",
                  required: true,
                },
              },
            ],
          },
        ],
      },
    ],
  },

  {
    title: "SPESIFIKASI KENDARAAN",
    sections: [
      {
        title: "MESIN",
        rows: [
          {
            cols: [
              {
                span: 8,
                field: {
                  name: "isi_silinder",
                  label: "Isi Silinder",
                  type: "integer",
                  required: true,
                  suffix: "cc",
                },
              },
              {
                span: 8,
                field: {
                  name: "daya_motor",
                  label: "Daya Motor",
                  type: "decimal",
                  required: true,
                  suffix: "PS/KW",
                },
              },
              {
                span: 8,
                field: {
                  name: "bahan_bakar_id",
                  label: "Bahan Bakar",
                  type: "select",
                  required: true,
                },
              },
            ],
          },
        ],
      },
      {
        title: "DIMENSI UTAMA & BAK MUATAN",
        rows: [
          {
            cols: [
              {
                span: 8,
                field: {
                  name: "panjang_utama",
                  label: "Panjang Utama",
                  type: "integer",
                  required: true,
                  suffix: "mm",
                },
              },
              {
                span: 8,
                field: {
                  name: "lebar_utama",
                  label: "Lebar Utama",
                  type: "integer",
                  required: true,
                  suffix: "mm",
                },
              },
              {
                span: 8,
                field: {
                  name: "tinggi_utama",
                  label: "Tinggi Utama",
                  type: "integer",
                  required: true,
                  suffix: "mm",
                },
              },
            ],
          },
          {
            cols: [
              {
                span: 8,
                field: {
                  name: "panjang_bak",
                  label: "Panjang Bak",
                  type: "integer",
                  suffix: "mm",
                },
              },
              {
                span: 8,
                field: {
                  name: "lebar_bak",
                  label: "Lebar Bak",
                  type: "integer",
                  suffix: "mm",
                },
              },
              {
                span: 8,
                field: {
                  name: "tinggi_bak",
                  label: "Tinggi Bak",
                  type: "integer",
                  required: true,
                },
              },
            ],
          },
          {
            cols: [
              {
                span: 8,
                field: {
                  name: "roh",
                  label: "Julur Belakang (ROH)",
                  type: "integer",
                  required: true,
                  suffix: "mm",
                },
              },
              {
                span: 8,
                field: {
                  name: "foh",
                  label: "Julur Depan (FOH)",
                  type: "integer",
                  required: true,
                  suffix: "mm",
                },
              },
              {
                span: 8,
                field: {
                  name: "jarak_terendah",
                  label: "Jarak Terendah",
                  type: "integer",
                  suffix: "mm",
                },
              },
            ],
          },
        ],
      },
      {
        title: "KAPASITAS & DAYA ANGKUT",
        rows: [
          {
            cols: [
              {
                span: 6,
                field: {
                  name: "jumlah_duduk",
                  label: "Jumlah Duduk",
                  type: "integer",
                },
              },
              {
                span: 6,
                field: {
                  name: "jumlah_berdiri",
                  label: "Jumlah Berdiri",
                  type: "integer",
                },
              },
              {
                span: 6,
                field: {
                  name: "daya_angkut_orang",
                  label: "Daya Angkut Orang",
                  type: "integer",
                  required: true,
                  suffix: "Kg",
                },
              },
              {
                span: 6,
                field: {
                  name: "daya_angkut_barang",
                  label: "Daya Angkut Barang",
                  type: "integer",
                  required: true,
                  suffix: "Kg",
                },
              },
            ],
          },
        ],
      },
      {
        title: "BERAT & KONFIGURASI SUMBU",
        rows: [
          {
            cols: [
              {
                span: 6,
                field: {
                  name: "konfigurasi_sumbu_id",
                  label: "Konfigurasi Sumbu",
                  type: "select",
                  required: true,
                },
              },
              {
                span: 6,
                field: {
                  name: "kelas_jalan_id",
                  label: "Kelas Jalan",
                  type: "select",
                  required: true,
                },
              },
            ],
          },
          {
            cols: [
              {
                span: 6,
                field: {
                  name: "jarak_sumbu_1_2",
                  label: "Jarak Sumbu I-II",
                  type: "integer",
                  required: true,
                  suffix: "mm",
                },
              },
              {
                span: 6,
                field: {
                  name: "jarak_sumbu_2_3",
                  label: "Jarak Sumbu II-III",
                  type: "integer",
                  suffix: "mm",
                },
              },
              {
                span: 6,
                field: {
                  name: "jarak_sumbu_3_4",
                  label: "Jarak Sumbu III-IV",
                  type: "integer",
                  suffix: "mm",
                },
              },
              {
                span: 6,
                field: {
                  name: "jarak_sumbu_4_5",
                  label: "Jarak Sumbu IV-V",
                  type: "integer",
                  suffix: "mm",
                },
              },
            ],
          },
          {
            cols: [
              {
                span: 6,
                field: {
                  name: "berat_sumbu_1",
                  label: "Berat Sumbu I",
                  type: "integer",
                  required: true,
                  suffix: "Kg",
                },
              },
              {
                span: 6,
                field: {
                  name: "berat_sumbu_2",
                  label: "Berat Sumbu II",
                  type: "integer",
                  required: true,
                  suffix: "Kg",
                },
              },
              {
                span: 6,
                field: {
                  name: "berat_sumbu_3",
                  label: "Berat Sumbu III",
                  type: "integer",
                  suffix: "Kg",
                },
              },
              {
                span: 6,
                field: {
                  name: "berat_sumbu_4",
                  label: "Berat Sumbu IV",
                  type: "integer",
                  suffix: "Kg",
                },
              },
            ],
          },
          {
            cols: [
              {
                span: 6,
                field: {
                  name: "pemakaian_sumbu_1",
                  label: "Pemakaian Sumbu I",
                  type: "text",
                },
              },
              {
                span: 6,
                field: {
                  name: "pemakaian_sumbu_2",
                  label: "Pemakaian Sumbu II",
                  type: "text",
                },
              },
              {
                span: 6,
                field: {
                  name: "pemakaian_sumbu_3",
                  label: "Pemakaian Sumbu III",
                  type: "text",
                },
              },
              {
                span: 6,
                field: {
                  name: "pemakaian_sumbu_4",
                  label: "Pemakaian Sumbu IV",
                  type: "text",
                },
              },
            ],
          },
          {
            cols: [
              {
                span: 6,
                field: {
                  name: "daya_dukung_sumbu_1",
                  label: "Daya Dukung Sumbu I",
                  type: "integer",
                },
              },
              {
                span: 6,
                field: {
                  name: "daya_dukung_sumbu_2",
                  label: "Daya Dukung Sumbu II",
                  type: "integer",
                },
              },
              {
                span: 6,
                field: {
                  name: "daya_dukung_sumbu_3",
                  label: "Daya Dukung Sumbu III",
                  type: "integer",
                },
              },
              {
                span: 6,
                field: {
                  name: "daya_dukung_sumbu_4",
                  label: "Daya Dukung Sumbu IV",
                  type: "integer",
                },
              },
            ],
          },
        ],
      },
      {
        title: "KEMAMPUAN KENDARAAN",
        rows: [
          {
            cols: [
              {
                span: 8,
                field: {
                  name: "jbb",
                  label: "JBB",
                  type: "integer",
                  required: true,
                  suffix: "Kg",
                },
              },
              {
                span: 8,
                field: {
                  name: "jbkb",
                  label: "JBKB",
                  type: "integer",
                  required: true,
                  suffix: "Kg",
                },
              },
              {
                span: 8,
                field: {
                  name: "jbki",
                  label: "JBKI",
                  type: "integer",
                  required: true,
                  suffix: "Kg",
                },
              },
            ],
          },
          {
            cols: [
              {
                span: 12,
                field: {
                  name: "mst",
                  label: "MST",
                  type: "integer",
                  required: true,
                  suffix: "Kg",
                },
              },
              {
                span: 12,
                field: {
                  name: "volume_tera",
                  label: "Volume Tera",
                  type: "integer",
                  suffix: "m3",
                },
              },
            ],
          },
          {
            cols: [
              {
                span: 8,
                field: {
                  name: "ukuran_qr",
                  label: "q/r",
                  type: "integer",
                },
              },
              {
                span: 8,
                field: {
                  name: "ukuran_p1",
                  label: "p1",
                  type: "integer",
                },
              },
              {
                span: 8,
                field: {
                  name: "ukuran_p2",
                  label: "p2",
                  type: "integer",
                },
              },
            ],
          },
        ],
      },
      {
        title: "KHUSUS TANGKI",
        rows: [
          {
            cols: [
              {
                span: 8,
                field: {
                  name: "jenis_muatan",
                  label: "Jenis Muatan",
                  type: "text",
                },
              },
              {
                span: 8,
                field: {
                  name: "berat_jenis_muatan",
                  label: "Berat Jenis Muatan (N/m3)",
                  type: "decimal",
                  suffix: "N/m3",
                },
              },
              {
                span: 8,
                field: {
                  name: "volume_muatan",
                  label: "Volume Muatan (m3)",
                  type: "decimal",
                  suffix: "m3",
                },
              },
            ],
          },
        ],
      },
    ],
  },
];
