// types/dynamic-table.types.ts
export type Sorter = {
  field?: string;
  order?: "ascend" | "descend";
};

export type TableParams = {
  page: number;
  limit: number;
  search?: string;
  search_by?: string;
  filters?: Record<string, any>;
  sorter?: Sorter;
};
