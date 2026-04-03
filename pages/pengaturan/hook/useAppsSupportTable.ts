import { useDynamicTable } from "@/components/ui/dynamic-table/useDynamicTable";

export function useAppsSupportTable(fetcher: any) {
  return useDynamicTable(fetcher);
}
