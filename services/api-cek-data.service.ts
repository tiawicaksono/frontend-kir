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
  API.get(`/varian-merk/options?merk_id=${merkId}`);

/**
 * JENIS KENDARAAN
 */
export const getJenisKendaraan = () => API.get("/vehicletype/options");
export const getSubJenisKendaraan = (merkId: number) =>
  API.get(`/subvehicletype/options?merk_id=${merkId}`);

/**
 * BAHAN UTAMA
 */
export const getBahanUtama = () => API.get("/bahanutama/options");

/**
 * KONFIGURASI SUMBU
 */
export const getKonfigurasiSumbu = () => API.get("/konfigurasismbu/options");

/**
 * KELAS JALAN
 */
export const getKelasJalan = () => API.get("/kelasjalan/options");
