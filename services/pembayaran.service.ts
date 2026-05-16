import api from "@/services/api";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// ✏️ UPDATE
export async function updatePembayaran(id: number, data: any) {
  try {
    const res = await api.put(`${API_URL}/loket/pembayaran/${id}`, data);
    return res.data;
  } catch (err: any) {
    throw new Error(err?.response?.data?.message || "Gagal update data");
  }
}

// ❌ DELETE
export async function deletePembayaran(id: number) {
  try {
    const res = await api.delete(`${API_URL}/loket/pembayaran/${id}`);
    return res.data;
  } catch (err: any) {
    throw new Error(err?.response?.data?.message || "Gagal menghapus data");
  }
}

// 📋 LIST
export async function fetchPembayaran(params: Record<string, any> = {}) {
  try {
    const res = await api.get(`${API_URL}/loket/pembayaran`, {
      params,
    });
    return res.data;
  } catch (err: any) {
    throw err?.response?.data || err;
  }
}

// 🔄 TOGGLE BAYAR
export async function togglePembayaran(id: number) {
  try {
    const res = await api.patch(
      `${API_URL}/loket/pembayaran/${id}/toggle-bayar`,
    );
    return res.data;
  } catch (err: any) {
    throw new Error(err?.response?.data?.message || "Gagal update pembayaran");
  }
}
