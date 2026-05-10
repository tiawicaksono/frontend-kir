export interface PendaftaranPayload {
  kendaraan_id?: number;

  // ====================================
  // KENDARAAN
  // ====================================

  no_kendaraan?: string;
  no_mesin?: string;
  no_rangka?: string;

  // ====================================
  // PENDAFTARAN
  // ====================================

  status_penerbitan_id: number;

  tanggal_uji: string;

  tanggal_mati_uji?: string | null;

  // ====================================
  // PEMILIK
  // ====================================

  nama_pemilik?: string;
  alamat?: string;
  no_hp?: string;

  // ====================================
  // WILAYAH
  // ====================================

  provinsi_id?: number;
  kota_id?: number;
  kecamatan_id?: number;
  kelurahan_id?: number;

  // ====================================
  // BIRO JASA
  // ====================================

  is_dikuasakan?: boolean;

  biro_jasa_id?: number | null;

  // ====================================
  // KHUSUS
  // ====================================

  no_kartu_hilang?: string | null;

  area_asal_id?: number | null;
}