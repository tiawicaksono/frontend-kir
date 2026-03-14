import { TrnSinkron } from "./trn-sinkron.type";

export interface ApiIntegrations {
  id: number;
  name: string;
  description: string;
  prefix: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  lastTransaction?: TrnSinkron | null;
}

export interface SyncApiRequest {
  api_integration_id: number;
  name: string;
  prefix: string;
  url_api: string;
  token: string;
}
