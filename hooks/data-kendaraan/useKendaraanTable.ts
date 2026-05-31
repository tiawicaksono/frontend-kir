"use client";

import { useDynamicTable } from "@/components/ui/dynamic-table/useDynamicTable";

export function useKendaraanTable(fetcher: (params: any) => Promise<any>) {
  return useDynamicTable(fetcher);
}
