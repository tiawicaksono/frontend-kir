import api from "@/services/api";
import { PendaftaranPayload } from "@/types/pendaftaran.type";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// 🔎 SEARCH
export async function searchKendaraan(q: string, status_penerbitan_id: number) {
  const res = await api.get(`${API_URL}/loket/pendaftaran/search-kendaraan`, {
    params: { q, status_penerbitan_id },
  });
  return res.data;
}

// ➕ CREATE
export async function createPendaftaran(data: PendaftaranPayload) {
  try {
    const res = await api.post(`${API_URL}/pendaftaran`, data);
    return res.data;
  } catch (err: any) {
    throw new Error(err?.response?.data?.message || "Gagal menyimpan data");
  }
}

// ✏️ UPDATE
export async function updatePendaftaran(id: number, data: any) {
  try {
    const res = await api.put(`${API_URL}/pendaftaran/${id}`, data);
    return res.data;
  } catch (err: any) {
    throw new Error(err?.response?.data?.message || "Gagal update data");
  }
}

// 🔍 DETAIL
export async function detailPendaftaran(id: number) {
  try {
    const res = await api.get(`${API_URL}/pendaftaran/${id}`);
    return res.data;
  } catch (err: any) {
    throw new Error(err?.response?.data?.message || "Data tidak ditemukan");
  }
}

// ❌ DELETE
export async function deletePendaftaran(id: number) {
  try {
    const res = await api.delete(`${API_URL}/pendaftaran/${id}`);
    return res.data;
  } catch (err: any) {
    throw new Error(err?.response?.data?.message || "Gagal menghapus data");
  }
}

// 📋 LIST
export async function fetchPendaftaran(params: Record<string, any> = {}) {
  try {
    const res = await api.get(`${API_URL}/pendaftaran`, {
      params,
    });
    return res.data;
  } catch (err: any) {
    throw new Error(err?.response?.data?.message || "Gagal mengambil data");
  }
}

// 📊 COUNTS
export async function fetchPendaftaranCounts() {
  try {
    const res = await api.get(`${API_URL}/pendaftaran/counts`);
    return res.data;
  } catch (err: any) {
    throw new Error(
      err?.response?.data?.message || "Gagal mengambil statistik",
    );
  }
}
