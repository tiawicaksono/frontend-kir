import api from "@/services/api";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const API = api.create({
  baseURL: `${API_URL}/master`,
});

/**
 * WILAYAH
 */
export const getProvinsi = () => API.get("/provinsi/options");
export const getKota = (provinsiId: string) =>
  API.get(`/kota/options?provinsi_id=${provinsiId}`);
export const getKecamatan = (kotaId: string) =>
  API.get(`/kecamatan/options?kota_id=${kotaId}`);
export const getKelurahan = (kecamatanId: string) =>
  API.get(`/kelurahan/options?kecamatan_id=${kecamatanId}`);

/**
 * MERK
 */
export const getMerk = () => API.get("/merk/options");
export const getVarianMerk = (merkId: number) =>
  API.get(`/varianmerk/options?vehicle_brand_id=${merkId}`);
export const getTipeVarianMerk = (varianMerkId: number) =>
  API.get(`/tipevarianmerk/options?vehicle_varian_type_id=${varianMerkId}`);

/**
 * JENIS KENDARAAN
 */
export const getJenisKendaraan = () => API.get("/vehicletype/options");
export const getSubJenisKendaraan = (jenisKendaraanId: number) =>
  API.get(`/subvehicletype/options?vehicle_type_id=${jenisKendaraanId}`);

/**
 * BAHAN UTAMA
 */
export const getBahanUtama = () => API.get("/bahanutama/options");

/**
 * BAHAN BAKAR
 */
export const getBahanBakar = () => API.get("/bahanbakar/options");

/**
 * KONFIGURASI SUMBU
 */
export const getKonfigurasiSumbu = () => API.get("/konfigurasisumbu/options");

/**
 * KELAS JALAN
 */
export const getKelasJalan = () => API.get("/kelasjalan/options");
