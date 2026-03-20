export interface FetchParams {
  page: number;
  limit: number;
  filters?: Record<string, any>;
}

export interface FetchResult {
  data: any[];
  total: number;
}
