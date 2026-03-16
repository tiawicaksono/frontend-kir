"use client";

import { useMemo, useState } from "react";

interface Props {
  data: any[];
}

export default function DynamicTable({ data }: Props) {
  const [search, setSearch] = useState("");

  const columns = useMemo(() => {
    if (!data || data.length === 0) return [];
    return Object.keys(data[0]);
  }, [data]);

  const filteredData = useMemo(() => {
    if (!search) return data;

    return data.filter((row) =>
      Object.values(row).join(" ").toLowerCase().includes(search.toLowerCase()),
    );
  }, [search, data]);

  function formatValue(value: any) {
    if (!value) return "-";

    if (typeof value === "string" && value.includes("T")) {
      const date = new Date(value);
      if (!isNaN(date.getTime())) {
        return date.toLocaleString();
      }
    }

    return value.toString();
  }

  return (
    <div className="space-y-4">
      {/* search */}
      <div className="flex items-center justify-between">
        <input
          type="text"
          placeholder="Search..."
          className="border rounded px-3 py-2 text-sm w-64"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              {columns.map((col) => (
                <th key={col} className="px-4 py-3 text-left font-semibold">
                  {col}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {filteredData.map((row, i) => (
              <tr key={i} className="border-t hover:bg-gray-50">
                {columns.map((col) => (
                  <td key={col} className="px-4 py-2 whitespace-nowrap">
                    {formatValue(row[col])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {filteredData.length === 0 && (
          <div className="p-6 text-center text-gray-500">No data</div>
        )}
      </div>
    </div>
  );
}
