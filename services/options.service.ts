import api from "@/services/api";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * WILAYAH
 */
export const getProvinsi = () => api.get(`${API_URL}/master/provinsi/options`);
export const getKota = (provinsiId: string | number) =>
  api.get(`${API_URL}/master/kota/options?provinsi_id=${provinsiId}`);
export const getKecamatan = (kotaId: string | number) =>
  api.get(`${API_URL}/master/kecamatan/options?kota_id=${kotaId}`);
export const getKelurahan = (kecamatanId: string | number) =>
  api.get(`${API_URL}/master/kelurahan/options?kecamatan_id=${kecamatanId}`);

/**
 * MERK
 */
export const getMerk = () => api.get(`${API_URL}/master/merk/options`);
export const getVarianMerk = (merkId: number) =>
  api.get(`${API_URL}/master/varianmerk/options?vehicle_brand_id=${merkId}`);
export const getTipeVarianMerk = (varianMerkId: number) =>
  api.get(
    `${API_URL}/master/tipevarianmerk/options?vehicle_varian_type_id=${varianMerkId}`,
  );

/**
 * JENIS KENDARAAN
 */
export const getJenisKendaraan = () =>
  api.get(`${API_URL}/master/vehicletype/options`);
export const getSubJenisKendaraan = (jenisKendaraanId: number) =>
  api.get(
    `${API_URL}/master/subvehicletype/options?vehicle_type_id=${jenisKendaraanId}`,
  );

/**
 * BAHAN UTAMA
 */
export const getBahanUtama = () =>
  api.get(`${API_URL}/master/bahanutama/options`);

/**
 * BAHAN BAKAR
 */
export const getBahanBakar = () =>
  api.get(`${API_URL}/master/bahanbakar/options`);

/**
 * KONFIGURASI SUMBU
 */
export const getKonfigurasiSumbu = () =>
  api.get(`${API_URL}/master/konfigurasisumbu/options`);

/**
 * KELAS JALAN
 */
export const getKelasJalan = () =>
  api.get(`${API_URL}/master/kelasjalan/options`);
