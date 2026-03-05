export interface ApiKeys {
  id: number;
  name: string;
  token: string;
  urlApi: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * CREATE & UPDATE
 */
export type ApiKeyForm = {
  id?: number;
  name: string;
  urlApi: string;
  token: string;
};

export type ApiKeyModalMode = "create" | "edit";

export interface ApiKeyModalState {
  open: boolean;
  mode: ApiKeyModalMode;
  data?: ApiKeys | null;
}
