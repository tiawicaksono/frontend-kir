"use client";

import { useDynamicTable } from "@/components/ui/dynamic-table/useDynamicTable";
import { fetchTableData } from "@/services/role-management.service";

export function useRoleManagementTable() {
  return useDynamicTable(fetchTableData);
}
