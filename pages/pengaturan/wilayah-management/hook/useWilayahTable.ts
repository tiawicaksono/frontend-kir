import { useDynamicTable } from "@/components/ui/dynamic-table/useDynamicTable";

export function useWilayahTable(fetcher: any) {
  return useDynamicTable(fetcher);
}
