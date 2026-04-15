import { TrnSinkron } from "./trn-sinkron.type";

export interface ApiIntegrations {
  id: number;
  name: string;
  description: string;
  prefix: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  last_transaction?: TrnSinkron | null;
}

export interface SyncApiRequest {
  api_integration_id: number;
  name: string;
  prefix: string;
  url_api: string;
  token: string;
}
