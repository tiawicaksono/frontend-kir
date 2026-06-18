"use client";

import { useDynamicTable } from "@/components/ui/dynamic-table/useDynamicTable";
import { createKendaraanColumns } from "@/utils/KendaraanColumns";

export function useKendaraanTable(fetcher: (params: any) => Promise<any>) {
  return useDynamicTable(fetcher, {
    columnTransform: createKendaraanColumns,
  });
}
