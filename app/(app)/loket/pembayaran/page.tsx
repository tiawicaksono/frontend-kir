"use client";

import { useState, useEffect, useCallback } from "react";

import AutoBreadcrumb from "@/components/common/AutoBreadcrumb";
import { useConfirm } from "@/core/confirm/confirm.hook";
import { useShowAlert } from "@/core/alert/alert.hook";

import {
  fetchPembayaran,
  deletePembayaran,
  togglePembayaran,
} from "@/services/pembayaran.service";

import PembayaranFilters from "@/pages/pembayaran/PembayaranFilter";
import PembayaranTable from "@/pages/pembayaran/PembayaranTable";
import { Card } from "antd";
import PendaftaranEditModal from "@/pages/pendaftaran/PendaftaranEditModal";

export default function PembayaranPage() {
  const { confirm } = useConfirm();
  const { showErrorAlert, showSuccessAlert } = useShowAlert();

  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingId, setLoadingId] = useState<number | null>(null);

  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);

  const [editOpen, setEditOpen] = useState(false);
  const [editData, setEditData] = useState<any>(null);

  const [filters, setFilters] = useState<any>({
    page: 1,
    limit: 10,
    search: undefined,
    tanggal_uji: undefined,
    status_pembayaran: undefined,
  });

  const onFilterChange = useCallback((payload: any) => {
    setFilters((prev: any) => ({
      ...prev,
      ...payload,
    }));
  }, []);

  // FETCH (SSR SAFE - only runs client)
  useEffect(() => {
    let active = true;

    const load = async () => {
      setLoading(true);
      try {
        const res = await fetchPembayaran(filters);
        if (!active) return;

        setData(res?.data ?? []);
        setSelectedRowKeys([]); // reset selection setiap reload
      } catch (err) {
        showErrorAlert(err, "Gagal load data");
      } finally {
        if (active) setLoading(false);
      }
    };

    load();

    return () => {
      active = false;
    };
  }, [filters]);

  // DELETE
  const handleDelete = async (id: number) => {
    const ok = await confirm({
      title: "Hapus Data",
      message: "Yakin hapus data ini?",
      variant: "destructive",
    });

    if (!ok) return;

    await deletePembayaran(id);
    setData((prev) => prev.filter((x) => x.id !== id));

    showSuccessAlert("Berhasil dihapus");
  };

  // TOGGLE SINGLE
  const handleToggle = async (row: any) => {
    setLoadingId(row.id);

    try {
      const res = await togglePembayaran(row.id);

      setData((prev) =>
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

  // BULK UPDATE (OPTIMIZED LOOP SIMPLE)
  const handleBulkToggle = async () => {
    const ok = await confirm({
      title: "Ubah Status Massal",
      message: `Ubah ${selectedRowKeys.length} data?`,
      variant: "destructive",
    });

    if (!ok) return;

    try {
      setLoading(true);

      await Promise.all(selectedRowKeys.map((id) => togglePembayaran(id)));

      setData((prev) =>
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
    } finally {
      setLoading(false);
    }
  };

  const handleOpenEdit = (row: any) => {
    setEditData(row);
    setEditOpen(true);
  };

  const handleEditSuccess = (updated: any) => {
    setData((prev) =>
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

  return (
    <div>
      <AutoBreadcrumb />

      <Card title="Manajemen Pembayaran" className="mt-4">
        {/* FILTERS */}
        <PembayaranFilters
          filters={filters}
          onChange={onFilterChange}
          loading={loading}
        />

        {/* TABLE */}
        <PembayaranTable
          data={data}
          loading={loading}
          loadingId={loadingId}
          onDelete={handleDelete}
          onToggle={handleToggle}
          selectedRowKeys={selectedRowKeys}
          setSelectedRowKeys={setSelectedRowKeys}
          onBulkToggle={handleBulkToggle}
          onEdit={handleOpenEdit}
        />
      </Card>

      <PendaftaranEditModal
        open={editOpen}
        data={editData}
        onClose={() => setEditOpen(false)}
        onSuccess={handleEditSuccess}
      />
    </div>
  );
}
