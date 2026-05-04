import api from "@/services/api";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * WILAYAH
 */
export const getProvinsi = () => api.get(`${API_URL}/options/provinsi`);
export const getKota = (provinsiId: string | number) =>
  api.get(`${API_URL}/options/kota?provinsi_id=${provinsiId}`);
export const getKecamatan = (kotaId: string | number) =>
  api.get(`${API_URL}/options/kecamatan?kota_id=${kotaId}`);
export const getKelurahan = (kecamatanId: string | number) =>
  api.get(`${API_URL}/options/kelurahan?kecamatan_id=${kecamatanId}`);

/**
 * MERK
 */
export const getMerk = () => api.get(`${API_URL}/options/merk`);
export const getVarianMerk = (merkId: number) =>
  api.get(`${API_URL}/options/varianmerk?vehicle_brand_id=${merkId}`);
export const getTipeVarianMerk = (varianMerkId: number) =>
  api.get(
    `${API_URL}/options/tipevarianmerk?vehicle_varian_type_id=${varianMerkId}`,
  );

/**
 * JENIS KENDARAAN
 */
export const getJenisKendaraan = () =>
  api.get(`${API_URL}/options/vehicletype`);
export const getSubJenisKendaraan = (jenisKendaraanId: number) =>
  api.get(
    `${API_URL}/options/subvehicletype?vehicle_type_id=${jenisKendaraanId}`,
  );

/**
 * BAHAN UTAMA
 */
export const getBahanUtama = () => api.get(`${API_URL}/options/bahanutama`);

/**
 * BAHAN BAKAR
 */
export const getBahanBakar = () => api.get(`${API_URL}/options/bahanbakar`);

/**
 * KONFIGURASI SUMBU
 */
export const getKonfigurasiSumbu = () =>
  api.get(`${API_URL}/options/konfigurasisumbu`);

/**
 * KELAS JALAN
 */
export const getKelasJalan = () => api.get(`${API_URL}/options/kelasjalan`);

/**
 * STATUS PENERBITAN
 */
export const getStatusPenerbitan = () =>
  api.get(`${API_URL}/options/statuspenerbitan`);
