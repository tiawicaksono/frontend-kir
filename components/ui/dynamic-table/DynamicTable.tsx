"use client";

import { useMemo, useState } from "react";

interface Props {
  data: any[];
  loading?: boolean;

  page: number;
  perPage: number;
  total: number;

  onPageChange: (page: number) => void;

  onSearch?: (search: string, column: string) => void;

  actions?: {
    label: string;
    onClick: (row: any) => void;
  }[];
}

export default function DynamicTable({
  data,
  loading = false,
  page,
  perPage,
  total,
  onPageChange,
  onSearch,
  actions = [],
}: Props) {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [sortKey, setSortKey] = useState<string>();
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const [search, setSearch] = useState("");
  const [filterColumn, setFilterColumn] = useState("");

  const totalPages = Math.ceil(total / perPage);

  const columns = useMemo(() => {
    if (!data.length) return [];

    const hidden = ["id", "created_at", "updated_at"];

    return Object.keys(data[0])
      .filter((key) => !hidden.includes(key))
      .map((key) => ({
        key,
        label: key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
      }));
  }, [data]);

  function toggleRow(i: number) {
    setSelectedRows((prev) =>
      prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i],
    );
  }

  function toggleAll() {
    if (selectedRows.length === data.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(data.map((_, i) => i));
    }
  }

  function toggleSort(key: string) {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  function formatValue(val: any) {
    if (val === null || val === undefined) return "-";

    if (typeof val === "number") {
      return val.toLocaleString();
    }

    if (typeof val === "string" && val.includes("T")) {
      const d = new Date(val);
      if (!isNaN(d.getTime())) return d.toLocaleDateString();
    }

    return val;
  }

  const sortedData = useMemo(() => {
    if (!sortKey) return data;

    return [...data].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];

      if (aVal < bVal) return sortDir === "asc" ? -1 : 1;
      if (aVal > bVal) return sortDir === "asc" ? 1 : -1;

      return 0;
    });
  }, [data, sortKey, sortDir]);

  return (
    <div className="bg-white border rounded-xl shadow-sm">
      {/* SEARCH */}
      <div className="flex gap-2 p-4 border-b">
        <select
          className="border rounded px-3 py-2 text-sm"
          value={filterColumn}
          onChange={(e) => setFilterColumn(e.target.value)}
        >
          <option value="">All Columns</option>

          {columns.map((c) => (
            <option key={c.key} value={c.key}>
              {c.label}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Search..."
          className="border rounded px-3 py-2 text-sm w-64"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          onClick={() => onSearch?.(search, filterColumn)}
          className="bg-blue-600 text-white px-4 py-2 rounded text-sm"
        >
          Search
        </button>
      </div>

      {/* TABLE */}

      <div className="overflow-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 sticky top-0">
            <tr>
              <th className="px-4 py-3 w-10">
                <input
                  type="checkbox"
                  checked={selectedRows.length === data.length}
                  onChange={toggleAll}
                />
              </th>

              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => toggleSort(col.key)}
                  className="px-4 py-3 text-left cursor-pointer"
                >
                  {col.label}
                </th>
              ))}

              {actions.length > 0 && (
                <th className="px-4 py-3 text-right">Actions</th>
              )}
            </tr>
          </thead>

          <tbody className="divide-y">
            {loading && (
              <tr>
                <td colSpan={columns.length + 2} className="text-center p-6">
                  Loading data...
                </td>
              </tr>
            )}

            {!loading &&
              sortedData.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(i)}
                      onChange={() => toggleRow(i)}
                    />
                  </td>

                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-3">
                      {formatValue(row[col.key])}
                    </td>
                  ))}

                  {actions.length > 0 && (
                    <td className="px-4 py-3 text-right space-x-2">
                      {actions.map((a, idx) => (
                        <button
                          key={idx}
                          onClick={() => a.onClick(row)}
                          className="text-blue-600 hover:underline text-sm"
                        >
                          {a.label}
                        </button>
                      ))}
                    </td>
                  )}
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}

      <div className="flex items-center justify-between p-4 border-t text-sm">
        <span>
          Page {page} / {totalPages}
        </span>

        <div className="flex gap-2">
          <button
            disabled={page === 1}
            onClick={() => onPageChange(page - 1)}
            className="border px-3 py-1 rounded"
          >
            Prev
          </button>

          <button
            disabled={page === totalPages}
            onClick={() => onPageChange(page + 1)}
            className="border px-3 py-1 rounded"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
