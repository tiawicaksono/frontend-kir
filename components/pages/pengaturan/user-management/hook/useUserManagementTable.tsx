"use client";

import { useDynamicTable } from "@/components/ui/dynamic-table/useDynamicTable";
import { fetchTableData } from "@/services/user-management.service";

export function useUserManagementTable() {
  return useDynamicTable(fetchTableData, {
    columnTransform: (cols) =>
      cols.map((col) => {
        if (col.dataIndex === "roles") {
          return {
            ...col,
            title: "Roles",
            render: (roles: any[]) => {
              if (!roles?.length) return "-";

              return (
                <div className="flex gap-1 flex-wrap">
                  {roles.map((role) => (
                    <span
                      key={role.id}
                      className={`px-2 py-1 rounded text-xs ${
                        role.is_active
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-600"
                      }`}
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
      }),
  });
}
