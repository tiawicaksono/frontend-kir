import api from "@/services/api";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// 📋 LIST
export async function fetchKartuUji(params: Record<string, any> = {}) {
  try {
    const res = await api.get(`${API_URL}/loket/cetak-kartu`, {
      params,
    });
    return res.data;
  } catch (err: any) {
    throw err?.response?.data || err;
  }
}

export const printKartuUji = async (payload: number) => {
  return api.post(`${API_URL}/loket/cetak-kartu/${payload}/print`);
};
