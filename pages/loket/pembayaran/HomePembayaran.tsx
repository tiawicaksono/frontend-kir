"use client";

import { useMemo, useState } from "react";

import { Button, Space } from "antd";

import DynamicTable from "@/components/ui/dynamic-table/DynamicTable";
import ComponentCard from "@/components/common/ComponentCard";

import { useConfirm } from "@/core/confirm/confirm.hook";
import { useShowAlert } from "@/core/alert/alert.hook";
import { useModal } from "@/core/modal/modal.hook";

import {
  deletePembayaran,
  togglePembayaran,
} from "@/services/pembayaran.service";

import PendaftaranEditModal from "@/pages/loket/pendaftaran/PendaftaranEditModal";

import PembayaranFilter from "./PembayaranFilter";

import { usePembayaran } from "@/hooks/pembayaran/usePembayaran";
import { createPembayaranColumns } from "./PembayaranColumns";
import PembayaranActions from "./PembayaranActions";

import { PembayaranRow } from "@/types/pembayaran.type";

export default function HomePembayaran() {
  const { confirm } = useConfirm();
  const { openModal } = useModal();
  const { showErrorAlert, showSuccessAlert } = useShowAlert();

  const {
    dataSource,
    setDataSource,

    loading,
    total,

    params,
    setParams,

    reload,
  } = usePembayaran();

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
  // DELETE
  // =========================
  const handleDelete = async (id: number) => {
    const ok = await confirm({
      title: "Hapus Data",
      message: "Yakin hapus data ini?",
      variant: "destructive",
    });

    if (!ok) return;

    try {
      await deletePembayaran(id);

      setDataSource((prev: any[]) => prev.filter((item) => item.id !== id));

      showSuccessAlert("Berhasil dihapus");
    } catch (err) {
      showErrorAlert(err, "Gagal hapus");
    }
  };

  // =========================
  // TOGGLE
  // =========================
  const handleToggle = async (row: PembayaranRow) => {
    setLoadingId(row.id);

    try {
      const res = await togglePembayaran(row.id);

      setDataSource((prev) =>
        prev.map((item) =>
          item.id === row.id
            ? {
                ...item,

                retribusi_status_pembayaran:
                  res?.data?.status_pembayaran ??
                  !item.retribusi_status_pembayaran,
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
      await Promise.all(selectedRowKeys.map((id) => togglePembayaran(id)));

      setDataSource((prev: any[]) =>
        prev.map((item) =>
          selectedRowKeys.includes(item.id)
            ? {
                ...item,

                retribusi_status_pembayaran: !item.retribusi_status_pembayaran,
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
  // EDIT
  // =========================
  const handleOpenEdit = (row: PembayaranRow) => {
    openModal({
      className: "max-w-md",
      content: ({ close }) => (
        <PendaftaranEditModal
          data={row}
          onSuccess={(updated) => {
            handleEditSuccess(updated);
            close();
          }}
        />
      ),
    });
  };

  const handleEditSuccess = (
    updated: Partial<PembayaranRow> & {
      id: number;
    },
  ) => {
    setDataSource((prev: any[]) =>
      prev.map((item) =>
        item.id === updated.id
          ? {
              ...item,
              ...updated,
            }
          : item,
      ),
    );
  };

  // =========================
  // COLUMNS
  // =========================
  const columns = useMemo(() => createPembayaranColumns(), []);

  return (
    <ComponentCard
      title="Manajemen Pembayaran"
      borderTop
      extra={
        <Space>
          <Button
            type="primary"
            disabled={selectedRowKeys.length === 0}
            onClick={handleBulkToggle}
          >
            Ubah Status ({selectedRowKeys.length})
          </Button>
        </Space>
      }
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
          <PembayaranFilter
            filters={params}
            loading={loading}
            onChange={handleTableChange}
          />
        }
        config={{
          showToolbar: true,
        }}
        rowSelection={{
          selectedRowKeys,
          onChange: (keys) => setSelectedRowKeys(keys as number[]),
        }}
        showActions
        renderActions={(row: PembayaranRow) => (
          <PembayaranActions
            row={row}
            loading={loadingId === row.id}
            onToggle={handleToggle}
            onEdit={handleOpenEdit}
            onDelete={handleDelete}
          />
        )}
      />
    </ComponentCard>
  );
}
