export interface PembayaranRow {
  id: number;

  no_pendaftaran_harian: string;

  tanggal_uji: string | null;

  kendaraan_no_uji: string;

  kendaraan_no_kendaraan: string;

  kendaraan_nama_pemilik: string;

  retribusi_status_pembayaran: boolean;

  status_penerbitan_issuance_id: number;

  status_penerbitan_issuance_name: string;

  petugas_name: string;
}

export interface PembayaranParams {
  page: number;
  limit: number;

  sort_by: string;
  sort_order: string;

  search?: string;

  search_by?: string;

  tanggal_pendaftaran?: string;

  status_pembayaran?: boolean;

  status_penerbitan_id?: number;
}
