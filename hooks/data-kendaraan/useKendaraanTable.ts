"use client";

import { useDynamicTable } from "@/components/ui/dynamic-table/useDynamicTable";
import { createKendaraanColumns } from "@/pages/master/kendaraan/KendaraanColumns";

export function useKendaraanTable(fetcher: (params: any) => Promise<any>) {
  return useDynamicTable(fetcher, {
    columnTransform: createKendaraanColumns,
  });
}
