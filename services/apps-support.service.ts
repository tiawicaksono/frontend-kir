import api from "@/services/api";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// COUNT PROVINSI, KOTA/KAB, KECAMATAN, KELURAHAN/DESA
export const fetchBahanUtamaCounts = async () => {
  const res = await api.get(`${API_URL}/pengaturan/bahanutama/counts`);
  return res.data;
};

export const fetchStatusPenerbitanCounts = async () => {
  const res = await api.get(`${API_URL}/pengaturan/statuspenerbitan/counts`);
  return res.data;
};

/**
 * STATUS PENERBITAN
 */
export async function fetchTableDataStatusPenerbitan(
  params: Record<string, any> = {},
) {
  const res = await api.get(`${API_URL}/pengaturan/statuspenerbitan`, {
    params,
  });

  return res.data;
}

export async function createStatusPenerbitan(data: any) {
  const res = await api.post(`${API_URL}/pengaturan/statuspenerbitan`, data);
  return res.data.data;
}

export async function updateStatusPenerbitan(id: number, data: any) {
  const res = await api.put(
    `${API_URL}/pengaturan/statuspenerbitan/${id}`,
    data,
  );
  return res.data;
}

export async function deleteStatusPenerbitan(id: number) {
  const res = await api.delete(`${API_URL}/pengaturan/statuspenerbitan/${id}`);
  return res.data;
}

/**
 * BAHAN UTAMA KENDARAAN
 */
export async function fetchTableDataBahanUtama(
  params: Record<string, any> = {},
) {
  const res = await api.get(`${API_URL}/pengaturan/bahanutama`, {
    params,
  });

  return res.data;
}

export async function createBahanUtama(data: any) {
  const res = await api.post(`${API_URL}/pengaturan/bahanutama`, data);
  return res.data.data;
}

export async function updateBahanUtama(id: number, data: any) {
  const res = await api.put(`${API_URL}/pengaturan/bahanutama/${id}`, data);
  return res.data;
}

export async function deleteBahanUtama(id: number) {
  const res = await api.delete(`${API_URL}/pengaturan/bahanutama/${id}`);
  return res.data;
}
