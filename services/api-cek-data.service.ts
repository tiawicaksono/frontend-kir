import { ApiKeys } from "@/types/api-keys.type";
import api from "@/services/api";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
export async function cekDataApi(data: any) {
  const res = await api.post(`${API_URL}/kementrian/api-cek-data`, data);
  return res.data;
}
