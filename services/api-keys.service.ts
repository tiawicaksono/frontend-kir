import { ApiKeyResponse, ApiKeys, mapApiKey } from "@/types/api-keys.type";
import api from "@/services/api";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
export async function getApiKey(): Promise<ApiKeys[]> {
  try {
    const res = await api.get(`${API_URL}/pengaturan/api-keys`);

    return res.data.map((item: ApiKeyResponse) => mapApiKey(item));
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function updateApiKeyStatus(id: number, isActive: boolean) {
  const res = await api.put(`${API_URL}/pengaturan/api-keys/update-status`, {
    id,
    is_active: isActive,
  });
  return res.data;
}
