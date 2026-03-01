"use client";

import { useEffect, useState } from "react";
import ComponentCard from "@/components/common/ComponentCard";
import Button from "@/components/form/Button";
import { Plus } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getApiKey, updateApiKeyStatus } from "@/services/api-keys.service";
import { ApiKeys } from "@/types/api-keys.type";
import ApiKeyField from "./ApiKeyField";
import DateText from "@/components/common/DateText";
import ToggleSwitch from "@/components/form/switch/ToggleSwitch";
import { useAlert } from "@/context/AlertContext";

const headerCellClass =
  "py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400";

const bodyCellClass =
  "text-start py-3 text-gray-500 text-theme-sm dark:text-gray-400";

export default function HomeApi() {
  const [apiKeys, setApiKeys] = useState<ApiKeys[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const { showAlert } = useAlert();

  const fetchApiKeys = async () => {
    try {
      setLoading(true);
      const data = await getApiKey();
      setApiKeys(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async (id: number, value: boolean) => {
    setLoadingId(id);

    // Optimistic update
    setApiKeys((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isActive: value } : item,
      ),
    );

    try {
      await updateApiKeyStatus(id, value);
      showAlert({
        variant: "success",
        title: "Success",
        message: "Status API Key berhasil diperbarui.",
      });
    } catch (error: any) {
      // console.log("STATUS:", error?.response?.status);
      // console.log("DATA:", error?.response?.data);
      // console.log("FULL ERROR:", error);

      // rollback kalau gagal
      setApiKeys((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, isActive: !value } : item,
        ),
      );

      // ambil error message dari backend kalau ada
      const firstError = error.response.data.errors
        ? (Object.values(error.response.data.errors)[0] as String)
        : null;

      showAlert({
        variant: "error",
        title: "Error",
        message:
          firstError?.[0] ||
          error?.response?.data?.message ||
          "Gagal memperbarui status API Key.",
      });
    } finally {
      setLoadingId(null);
    }
  };

  useEffect(() => {
    fetchApiKeys();
  }, []);

  return (
    <ComponentCard
      title="API Keys"
      desc="API keys are used to authentication requests to the tailadmin API"
      headerRight={
        <Button size="sm" variant="primary" startIcon={<Plus size={16} />}>
          Add API Key
        </Button>
      }
    >
      <div className="max-w-full overflow-x-auto">
        {loading && <p className="p-4">Loading...</p>}
        {error && <p className="p-4 text-red-500">{error}</p>}
        {!loading && !error && (
          <Table>
            {/* Table Header */}
            <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
              <TableRow>
                <TableCell isHeader className={headerCellClass}>
                  Name
                </TableCell>
                <TableCell isHeader className={headerCellClass}>
                  URL Api
                </TableCell>
                <TableCell isHeader className={headerCellClass}>
                  Created
                </TableCell>
                <TableCell isHeader className={headerCellClass}>
                  Updated
                </TableCell>
                <TableCell isHeader className={headerCellClass}>
                  Disable/Enable
                </TableCell>
                <TableCell isHeader className={headerCellClass}>
                  Action
                </TableCell>
              </TableRow>
            </TableHeader>

            {/* Table Body */}

            <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
              {apiKeys.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className={bodyCellClass}>
                    No Data Found
                  </TableCell>
                </TableRow>
              )}

              {apiKeys.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className={bodyCellClass}>
                    {item.name}
                    <ApiKeyField value={item.token} />
                  </TableCell>
                  <TableCell className={bodyCellClass}>
                    {item.urlApi.slice(0, 26)}********{item.urlApi.slice(-4)}
                  </TableCell>
                  <TableCell className={bodyCellClass}>
                    <DateText value={item.createdAt} withTime />
                  </TableCell>
                  <TableCell className={bodyCellClass}>
                    <DateText value={item.updatedAt} withTime />
                  </TableCell>
                  <TableCell className={bodyCellClass}>
                    <div className="flex items-center gap-2">
                      <ToggleSwitch
                        checked={item.isActive}
                        disabled={loadingId === item.id}
                        onChange={(value) => handleToggle(item.id, value)}
                      />

                      {loadingId === item.id && (
                        <div className="h-3 w-3 animate-spin rounded-full border border-gray-400 border-t-transparent" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell className={bodyCellClass}>&nbsp;</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </ComponentCard>
  );
}
