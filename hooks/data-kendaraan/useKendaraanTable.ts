import { useDynamicTable } from "@/components/ui/dynamic-table/useDynamicTable";

export function useKendaraanTable(fetcher: any) {
  return useDynamicTable(fetcher);
}
