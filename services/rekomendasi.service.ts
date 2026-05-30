import api from "@/services/api";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchRekomendasi = async (params?: any) => {
  const res = await api.get(`${API_URL}/loket/rekomendasi`, {
    params,
  });

  return res.data;
};

export const fetchRekomendasiDetail = (id: number) =>
  api.get(`${API_URL}/loket/rekomendasi/${id}`);

export const updateRekomendasi = async (id: number, payload: any) => {
  const res = await api.put(`${API_URL}/loket/rekomendasi/${id}`, payload);

  return res.data;
};

export const syncRekomendasi = async (
  payload: number | { ids: React.Key[] },
) => {
  // SINGLE
  if (typeof payload === "number") {
    return api.post(`${API_URL}/loket/rekomendasi/${payload}/sync`);
  }

  // BULK
  return api.post(`${API_URL}/loket/rekomendasi/bulk-sync`, {
    ids: payload.ids,
  });
};
