import api from "@/services/api";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchRekomendasi = async (params?: any) => {
  const res = await api.get(`${API_URL}/loket/rekomendasi`, {
    params,
  });

  return res.data;
};

export const updateRekomendasi = async (id: number, payload: any) => {
  const res = await api.put(`${API_URL}/loket/rekomendasi/${id}`, payload);

  return res.data;
};

export const syncRekomendasi = async (id: number) => {
  const res = await api.post(`${API_URL}/loket/rekomendasi/${id}/sync`);

  return res.data;
};
