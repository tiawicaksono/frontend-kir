export interface ApiKeyResponse {
  id: number;
  name: string;
  url_api: string;
  token: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ApiKeys {
  id: number;
  name: string;
  token: string;
  urlApi: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export function mapApiKey(data: ApiKeyResponse): ApiKeys {
  return {
    id: data.id,
    name: data.name,
    urlApi: data.url_api,
    token: data.token,
    isActive: data.is_active,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  };
}
