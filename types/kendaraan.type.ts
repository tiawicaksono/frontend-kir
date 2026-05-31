import type { TableParams } from "@/components/ui/dynamic-table/type";

export type PrimaryKey = number;

export interface KendaraanRow {
  id: number;

  [key: string]: any;
}

export interface KendaraanTableState {
  columns: any[];

  dataSource: KendaraanRow[];

  loading: boolean;

  total: number;

  config: {
    primary_key?: string;
    [key: string]: any;
  };

  params: TableParams;

  setParams: (params: Partial<TableParams>) => void;

  fetchData: () => Promise<void>;

  reload: () => Promise<void>;

  prependData: (data: KendaraanRow) => void;

  updateData: (data: Partial<KendaraanRow>) => void;
}

export interface CrudService<T> {
  create: (data: T) => Promise<any>;

  update: (id: PrimaryKey, data: T) => Promise<any>;

  delete: (id: PrimaryKey) => Promise<any>;
}

export interface KendaraanModuleProps<T> {
  fetcher: (params: TableParams) => Promise<any>;

  service: CrudService<T>;

  label: string;

  loadCounts: () => Promise<void>;
}
