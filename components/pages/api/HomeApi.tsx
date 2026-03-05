"use client";

import { useEffect, useState } from "react";
import ComponentCard from "@/components/common/ComponentCard";
import { MoreHorizontalIcon, MoreVerticalIcon } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  deleteApiKey,
  getApiKey,
  updateApiKeyStatus,
} from "@/services/api-keys.service";
import { ApiKeys } from "@/types/api-keys.type";
import ApiKeyField from "./ApiKeyField";
import DateText from "@/components/common/DateText";
import ToggleSwitch from "@/components/form/switch/ToggleSwitch";
import { Dropdown, DropdownItem } from "@/components/ui/dropdown";
import { useConfirm } from "@/core/confirm/confirm.hook";
import { useShowAlert } from "@/core/alert/alert.hook";

const headerCellClass =
  "py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400";

const bodyCellClass =
  "text-start py-3 text-gray-500 text-theme-sm dark:text-gray-400";

export default function HomeApi() {
  const [apiKeys, setApiKeys] = useState<ApiKeys[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const [loadingDeleteId, setLoadingDeleteId] = useState<number | null>(null);
  const [openId, setOpenId] = useState<number | null>(null);
  const [isHeaderOpen, setIsHeaderOpen] = useState(false);
  const { showErrorAlert, showSuccessAlert } = useShowAlert();

  const toggleHeaderDropdown = () => {
    setIsHeaderOpen((prev) => !prev);
  };

  const closeHeaderDropdown = () => {
    setIsHeaderOpen(false);
  };

  const toggleDropdown = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };
  const closeDropdown = () => {
    setOpenId(null);
  };
  const { confirm } = useConfirm();

  const fetchApiKeys = async () => {
    try {
      setLoading(true);
      const data = await getApiKey();
      setApiKeys(data);
    } catch (err: any) {
      setError(err.message);
      showErrorAlert(err, "Gagal memuat data");
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
      showSuccessAlert("Status berhasil diubah");
    } catch (error: any) {
      // rollback kalau gagal
      setApiKeys((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, isActive: !value } : item,
        ),
      );
      showErrorAlert(error, "Status gagal diubah");
    } finally {
      setLoadingId(null);
    }
  };

  const handleDelete = async (id: number) => {
    const confirmed = await confirm({
      title: "Hapus API Key",
      message: "Data yang dihapus tidak bisa dikembalikan.",
      confirmText: "Hapus",
      variant: "destructive",
    });

    if (!confirmed) return;

    setLoadingDeleteId(id);

    // 🟢 Simpan data lama untuk rollback
    const previousData = apiKeys;

    // 🟢 Optimistic remove
    setApiKeys((prev) => prev.filter((item) => item.id !== id));

    try {
      await deleteApiKey(id);

      showSuccessAlert("Data berhasil dihapus");
    } catch (error: any) {
      // 🔴 rollback kalau gagal
      setApiKeys(previousData);

      showErrorAlert(error, "Data gagal dihapus");
    } finally {
      setLoadingDeleteId(null);
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
        <div className="relative inline-block">
          <button
            onClick={toggleHeaderDropdown}
            className="dropdown-toggle h-9 w-9 flex items-center justify-center rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition"
          >
            <MoreVerticalIcon className="text-gray-500" />
          </button>

          <Dropdown
            isOpen={isHeaderOpen}
            onClose={closeHeaderDropdown}
            className="w-40 p-2"
          >
            <DropdownItem>Add API Key </DropdownItem>
            <DropdownItem
              onItemClick={() => {
                closeHeaderDropdown();
                fetchApiKeys();
              }}
              className="flex w-full text-sm text-gray-600 rounded-lg px-3 py-2 hover:bg-gray-100"
            >
              Reload Data
            </DropdownItem>
          </Dropdown>
        </div>
      }
    >
      <div className="max-w-full overflow-x-auto">
        {loading && (
          <div className="flex items-center gap-2 pb-5">
            <div className="h-3 w-3 animate-spin rounded-full border border-gray-400 border-t-transparent" />
            Reloading...
          </div>
        )}

        {!loading && (
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
                <TableRow
                  key={item.id}
                  className={`transition-all duration-200 ${
                    loadingId === item.id
                      ? "opacity-50 pointer-events-none"
                      : ""
                  }`}
                >
                  <TableCell className={bodyCellClass}>
                    <div className="mb-2">{item.name}</div>
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
                  <TableCell className={bodyCellClass}>
                    <div className="relative inline-block">
                      <button
                        onClick={() => toggleDropdown(item.id)}
                        disabled={loadingDeleteId === item.id}
                        className={`dropdown-toggle ${
                          openId === item.id ? "dropdown-toggle-active" : ""
                        } p-1 rounded-md hover:bg-gray-100 transition`}
                      >
                        {loadingDeleteId === item.id ? (
                          <div className="h-4 w-4 animate-spin rounded-full border border-gray-400 border-t-transparent" />
                        ) : (
                          <MoreHorizontalIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" />
                        )}
                      </button>

                      <Dropdown
                        isOpen={openId === item.id}
                        onClose={closeDropdown}
                        className="w-40 p-2"
                      >
                        <DropdownItem
                          onItemClick={() => {
                            closeDropdown();
                            // handle edit / view
                          }}
                          className="flex w-full text-sm text-gray-600 rounded-lg px-3 py-2 hover:bg-gray-100 dark:hover:bg-white/5"
                        >
                          View
                        </DropdownItem>

                        <DropdownItem
                          onItemClick={async () => {
                            closeDropdown();
                            await handleDelete(item.id);
                          }}
                          className="flex w-full text-sm text-red-500 rounded-lg px-3 py-2 hover:bg-red-50 dark:hover:bg-red-500/10"
                        >
                          Delete
                        </DropdownItem>
                      </Dropdown>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </ComponentCard>
  );
}
