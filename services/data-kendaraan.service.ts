import api from "@/services/api";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
export async function cekDataApi(data: any) {
  const res = await api.post(`${API_URL}/kementrian/api-cek-data`, data);
  return res.data;
}

/**
 * KENDARAAN
 */
export const fetchKendaraanCounts = async () => {
  const res = await api.get(`${API_URL}/master/kendaraan/counts`);
  return res.data;
};

export async function fetchTableDataKendaraan(
  params: Record<string, any> = {},
) {
  const res = await api.get(`${API_URL}/master/kendaraan`, {
    params,
  });
  return res.data;
}

export async function createKendaraan(data: any) {
  const res = await api.post(`${API_URL}/master/kendaraan`, data);
  return res.data.data;
}

export async function detailKendaraan(id: number) {
  const res = await api.get(`${API_URL}/master/kendaraan/${id}`);
  return res.data.data;
}

export async function updateKendaraan(id: number, data: any) {
  const res = await api.put(`${API_URL}/master/kendaraan/${id}`, data);
  return res.data;
}

export async function deleteKendaraan(id: number) {
  const res = await api.delete(`${API_URL}/master/kendaraan/${id}`);
  return res.data;
}

export async function fetchRiwayatUji(id: string) {
  const res = await api.get(`${API_URL}/master/kendaraan/${id}/riwayat-uji`);
  return res.data;
}
