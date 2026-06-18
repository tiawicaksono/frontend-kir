"use client";

import { useMemo, useState } from "react";

import { Badge } from "antd";

import DynamicTable from "@/components/ui/dynamic-table/DynamicTable";
import ComponentCard from "@/components/common/ComponentCard";

import { useConfirm } from "@/core/confirm/confirm.hook";
import { useShowAlert } from "@/core/alert/alert.hook";

import { toggleAntrianUji } from "@/services/antrian-uji.service";

import AntrianUjiFilter from "@/components/antrian-uji/AntrianUjiFilter";

import { createAntrianUjiColumns } from "@/utils/AntrianUjiColumns";

import { useAntrianUji } from "@/hooks/antrian-uji/useAntrianUji";
import { AntrianUjiRow } from "@/types/antrian-uji.type";

export default function AntrianUjiTable() {
  const { confirm } = useConfirm();
  const { showErrorAlert, showSuccessAlert } = useShowAlert();

  const {
    dataSource,
    setDataSource,

    loading,
    total,

    params,
    setParams,

    reload,
  } = useAntrianUji();

  const [loadingId, setLoadingId] = useState<number | null>(null);

  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);

  // =========================
  // TABLE CHANGE
  // =========================
  const handleTableChange = (payload: any) => {
    setParams((prev: any) => ({
      ...prev,

      ...payload,

      sort_by: payload?.sorter?.field ?? payload?.sort_by ?? prev.sort_by,

      sort_order:
        payload?.sorter?.order === "ascend"
          ? "asc"
          : payload?.sorter?.order === "descend"
            ? "desc"
            : (payload?.sort_order ?? prev.sort_order),
    }));
  };

  // =========================
  // TOGGLE
  // =========================
  const handleToggle = async (row: AntrianUjiRow) => {
    setLoadingId(row.id);

    try {
      const res = await toggleAntrianUji(row.id);

      setDataSource((prev) =>
        prev.map((item) =>
          item.id === row.id
            ? {
                ...item,

                hasil_uji_is_datang:
                  res?.data?.is_datang ?? !item.hasil_uji_is_datang,
              }
            : item,
        ),
      );

      showSuccessAlert("Status diperbarui");
    } catch (err) {
      showErrorAlert(err, "Gagal update");
    } finally {
      setLoadingId(null);
    }
  };

  // =========================
  // BULK TOGGLE
  // =========================
  const handleBulkToggle = async () => {
    const ok = await confirm({
      title: "Ubah Status Massal",
      message: `Ubah ${selectedRowKeys.length} data?`,
      variant: "destructive",
    });

    if (!ok) return;

    try {
      await Promise.all(selectedRowKeys.map((id) => toggleAntrianUji(id)));

      setDataSource((prev: any[]) =>
        prev.map((item) =>
          selectedRowKeys.includes(item.id)
            ? {
                ...item,

                hasil_uji_is_datang: !item.hasil_uji_is_datang,
              }
            : item,
        ),
      );

      setSelectedRowKeys([]);

      showSuccessAlert("Bulk update berhasil");
    } catch (err) {
      showErrorAlert(err, "Bulk update gagal");
    }
  };

  // =========================
  // COLUMNS
  // =========================
  const columns = useMemo(() => createAntrianUjiColumns(), []);

  return (
    <ComponentCard
      title={
        <div className="flex items-center gap-2">
          <span>List Antrian Uji</span>

          <Badge count={total} overflowCount={9999} />
        </div>
      }
      borderTop
    >
      <DynamicTable
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        total={total}
        page={params.page}
        pageSize={params.limit}
        onChange={handleTableChange}
        onReload={reload}
        rowKeyField="id"
        toolbar={
          <AntrianUjiFilter
            filters={params}
            loading={loading}
            onChange={handleTableChange}
          />
        }
        config={{
          showToolbar: true,
        }}
      />
    </ComponentCard>
  );
}
