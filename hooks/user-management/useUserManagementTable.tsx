"use client";

import { useDynamicTable } from "@/components/ui/dynamic-table/useDynamicTable";
import { fetchTableData } from "@/services/user-management.service";

export function useUserManagementTable() {
  return useDynamicTable(fetchTableData, {
    columnTransform: (cols) => {
      // console.log("COLS", cols);

      return cols.map((col) => {
        if (col.dataIndex === "roles" || col.dataIndex === "roles.name") {
          return {
            ...col,
            title: "Roles",
            render: (_: any, record: any) => {
              const roles = record.roles;

              if (!roles?.length) return "-";

              return (
                <div className="flex gap-1 flex-wrap">
                  {roles.map((role: any) => (
                    <span
                      key={role.id}
                      className="px-2 py-1 rounded text-xs bg-green-100 text-green-700"
                    >
                      {role.name}
                    </span>
                  ))}
                </div>
              );
            },
          };
        }

        return col;
      });
    },
  });
}
