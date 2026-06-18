import api from "@/services/api";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// 📋 LIST
export async function fetchAntrianUji(params: Record<string, any> = {}) {
  try {
    const res = await api.get(`${API_URL}/monitoring/antrian-uji`, {
      params,
    });
    return res.data;
  } catch (err: any) {
    throw err?.response?.data || err;
  }
}

// 🔄 TOGGLE BAYAR
export async function toggleAntrianUji(id: number) {
  try {
    const res = await api.patch(
      `${API_URL}/monitoring/antrian-uji/${id}/toggle-daftar`,
    );
    return res.data;
  } catch (err: any) {
    throw new Error(err?.response?.data?.message || "Gagal update kedatangan");
  }
}
