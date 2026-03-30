import api from "@/services/api";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// COUNT PROVINSI, KOTA/KAB, KECAMATAN, KELURAHAN/DESA
export const fetchWilayahManagementCounts = async () => {
  const res = await api.get(`${API_URL}/pengaturan/provinsi/counts`);
  return res.data;
};

/**
 * PROVINSI
 */
export async function fetchTableDataProvinsi(params: Record<string, any> = {}) {
  const res = await api.get(`${API_URL}/pengaturan/provinsi`, {
    params,
  });

  return res.data;
}

export async function createProvinsi(data: any) {
  const res = await api.post(`${API_URL}/pengaturan/provinsi`, data);
  return res.data.data;
}

export async function updateProvinsi(id: number, data: any) {
  const res = await api.put(`${API_URL}/pengaturan/provinsi/${id}`, data);
  return res.data;
}

export async function deleteProvinsi(id: number) {
  const res = await api.delete(`${API_URL}/pengaturan/provinsi/${id}`);
  return res.data;
}

/**
 * KOTA/KABUPATEN
 */
export async function fetchTableDataKota(params: Record<string, any> = {}) {
  const res = await api.get(`${API_URL}/pengaturan/kota`, {
    params,
  });

  return res.data;
}

export async function createKota(data: any) {
  const res = await api.post(`${API_URL}/pengaturan/kota`, data);
  return res.data.data;
}

export async function updateKota(id: number, data: any) {
  const res = await api.put(`${API_URL}/pengaturan/kota/${id}`, data);
  return res.data;
}

export async function deleteKota(id: number) {
  const res = await api.delete(`${API_URL}/pengaturan/kota/${id}`);
  return res.data;
}

/**
 * KECAMATAN
 */
export async function fetchTableDataKecamatan(
  params: Record<string, any> = {},
) {
  const res = await api.get(`${API_URL}/pengaturan/kecamatan`, {
    params,
  });

  return res.data;
}

export async function createKecamatan(data: any) {
  const res = await api.post(`${API_URL}/pengaturan/kecamatan`, data);
  return res.data.data;
}

export async function updateKecamatan(id: number, data: any) {
  const res = await api.put(`${API_URL}/pengaturan/kecamatan/${id}`, data);
  return res.data;
}

export async function deleteKecamatan(id: number) {
  const res = await api.delete(`${API_URL}/pengaturan/kecamatan/${id}`);
  return res.data;
}

/**
 * KELURAHAN/DESA
 */
export async function fetchTableDataKelurahan(
  params: Record<string, any> = {},
) {
  const res = await api.get(`${API_URL}/pengaturan/kelurahan`, {
    params,
  });

  return res.data;
}

export async function createKelurahan(data: any) {
  const res = await api.post(`${API_URL}/pengaturan/kelurahan`, data);
  return res.data.data;
}

export async function updateKelurahan(id: number, data: any) {
  const res = await api.put(`${API_URL}/pengaturan/kelurahan/${id}`, data);
  return res.data;
}

export async function deleteKelurahan(id: number) {
  const res = await api.delete(`${API_URL}/pengaturan/kelurahan/${id}`);
  return res.data;
}
