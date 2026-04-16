import { ApiIntegrations, SyncApiRequest } from "@/types/api-integrations.type";
import api from "@/services/api";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
export async function getApiIntegrations(): Promise<ApiIntegrations[]> {
  const res = await api.get(`${API_URL}/kementrian/api-integrations`);
  return res.data;
}

export async function syncApi(prefix: string, data: SyncApiRequest) {
  const res = await api.post(`${API_URL}/${prefix}/sync`, data);
  return res.data;
}

export async function detailApiIntegration(prefix: string) {
  const res = await api.get(`${API_URL}/${prefix}`);
  // console.log("URL-nya ini", `${API_URL}/${prefix}`);

  return res.data;
}

export async function fetchTableData(
  prefix: string,
  params: Record<string, any> = {},
) {
  const res = await api.get(
    `${API_URL}/kementrian/api-integrations/detail/${prefix}`,
    {
      params,
    },
  );

  return res.data;
}
