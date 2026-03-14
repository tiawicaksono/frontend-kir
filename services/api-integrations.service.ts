import { ApiIntegrations, SyncApiRequest } from "@/types/api-integrations.type";
import api from "@/services/api";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
export async function getApiIntegrations(): Promise<ApiIntegrations[]> {
  const res = await api.get(`${API_URL}/pengaturan/api-integrations`);
  return res.data;
}

export async function syncApi(prefix: string, data: SyncApiRequest) {
  const res = await api.post(`${API_URL}/${prefix}/sync`, data);
  return res.data;
}
