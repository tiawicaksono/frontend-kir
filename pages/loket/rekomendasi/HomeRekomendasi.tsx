"use client";

import { useEffect, useMemo, useState } from "react";
import { Card, Button, Space } from "antd";

import AutoBreadcrumb from "@/components/common/AutoBreadcrumb";
import RekomendasiTable from "./RekomendasiTable";
import RekomendasiForm from "./RekomendasiForm";

import {
  fetchRekomendasi,
  updateRekomendasi,
  syncRekomendasi,
  fetchRekomendasiDetail,
} from "@/services/rekomendasi.service";

import { useShowAlert } from "@/core/alert/alert.hook";

type Key = React.Key;

export default function HomeRekomendasi() {
  const { showErrorAlert, showSuccessAlert } = useShowAlert();

  // =========================
  // LOADING (SSR SAFE)
  // =========================
  const [uiLoading, setUiLoading] = useState({
    detail: false,
    submit: false,
    sync: false,
    bulkSync: false,
  });

  // =========================
  // TABLE STATE (SSR SAFE INIT)
  // =========================
  const [table, setTable] = useState<any>(() => ({
    dataSource: [],
    config: {},
    loading: false,
    total: 0,
    selectedRowKeys: [] as Key[], // 🔥 FIX TYPE

    params: {
      page: 1,
      limit: 10,
      search: undefined,
      search_by: undefined,
      sort_by: "pendaftaran_id",
      sort_order: "desc",
    },
  }));

  const [selectedData, setSelectedData] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);

  // =========================
  // FETCH TABLE
  // =========================
  const fetchData = async (customParams?: any) => {
    try {
      setTable((p: any) => ({ ...p, loading: true }));

      const res = await fetchRekomendasi(customParams || table.params);

      setTable((p: any) => ({
        ...p,
        loading: false,
        dataSource: res?.data ?? [],
        config: res?.config ?? {},
        total: res?.meta?.total ?? 0,
      }));
    } catch (err) {
      setTable((p: any) => ({ ...p, loading: false }));
      showErrorAlert(err, "Gagal load data");
    }
  };

  useEffect(() => {
    fetchData();
  }, [
    table.params.page,
    table.params.limit,
    table.params.search,
    table.params.search_by,
    table.params.sort_by,
    table.params.sort_order,
  ]);

  // =========================
  // DETAIL
  // =========================
  const handleSelect = async (record: any) => {
    const pk = table?.config?.primary_key || "pendaftaran_id";
    const id = record?.[pk];

    if (!id) return;

    try {
      setUiLoading((p) => ({ ...p, detail: true }));

      const res = await fetchRekomendasiDetail(id);
      setSelectedData(res?.data?.data ?? res?.data);
    } catch (err) {
      showErrorAlert(err, "Gagal load detail");
    } finally {
      setUiLoading((p) => ({ ...p, detail: false }));
    }
  };

  // =========================
  // SUBMIT
  // =========================
  const handleSubmit = async (values: any) => {
    const pk = table?.config?.primary_key || "id";
    if (!selectedData?.[pk]) return;

    try {
      setUiLoading((p) => ({ ...p, submit: true }));

      await updateRekomendasi(selectedData[pk], values);

      showSuccessAlert("Berhasil update");
      setIsEditing(false);
      fetchData();
    } catch (err) {
      showErrorAlert(err, "Gagal update");
    } finally {
      setUiLoading((p) => ({ ...p, submit: false }));
    }
  };

  // =========================
  // SINGLE SYNC
  // =========================
  const handleSync = async () => {
    const pk = table?.config?.primary_key || "id";
    if (!selectedData?.[pk]) return;

    try {
      setUiLoading((p) => ({ ...p, sync: true }));

      await syncRekomendasi(selectedData[pk]);

      showSuccessAlert("Berhasil sinkron");
      fetchData();
    } catch (err) {
      showErrorAlert(err, "Gagal sinkron");
    } finally {
      setUiLoading((p) => ({ ...p, sync: false }));
    }
  };

  // =========================
  // CHECKBOX SAFE HANDLER
  // =========================
  const handleSelectRowKeys = (keys: Key[]) => {
    setTable((p: any) => ({
      ...p,
      selectedRowKeys: keys ?? [],
    }));
  };

  // =========================
  // BULK SYNC (TYPE SAFE)
  // =========================
  const handleBulkSync = async () => {
    const ids = table.selectedRowKeys ?? [];

    if (ids.length === 0) return;

    try {
      setUiLoading((p) => ({ ...p, bulkSync: true }));

      // 🔥 FIX: pastikan backend support bulk
      await syncRekomendasi({ ids });

      showSuccessAlert("Berhasil sync semua data");

      setTable((p: any) => ({
        ...p,
        selectedRowKeys: [],
      }));

      fetchData();
    } catch (err) {
      showErrorAlert(err, "Gagal bulk sync");
    } finally {
      setUiLoading((p) => ({ ...p, bulkSync: false }));
    }
  };

  // =========================
  // TABLE CHANGE
  // =========================
  const handleTableChange = (payload: any) => {
    setTable((p: any) => ({
      ...p,
      params: { ...p.params, ...payload },
    }));
  };

  const columns = useMemo(() => {
    const labels = table?.config?.labels || {};
    const hidden = table?.config?.hidden || [];
    const sortable = table?.config?.sortable || [];

    return Object.keys(labels)
      .filter((k) => !hidden.includes(k))
      .map((k) => ({
        title: labels[k],
        dataIndex: k,
        key: k,
        sorter: sortable.includes(k),
      }));
  }, [table.config]);

  return (
    <div>
      <AutoBreadcrumb />

      {/* ========================= TABLE ========================= */}
      <Card
        title="Daftar Rekomendasi"
        extra={
          <Space>
            <Button
              type="primary"
              disabled={(table.selectedRowKeys ?? []).length === 0}
              loading={uiLoading.bulkSync}
              onClick={handleBulkSync}
            >
              Sync Terpilih ({(table.selectedRowKeys ?? []).length})
            </Button>
          </Space>
        }
      >
        <RekomendasiTable
          table={{
            ...table,
            columns,
            setParams: handleTableChange,
            fetchData,
            loading: table.loading || uiLoading.detail,

            selectedRowKeys: table.selectedRowKeys ?? [],
            onSelectRowKeys: handleSelectRowKeys,
          }}
          onSelect={handleSelect}
        />
      </Card>

      {/* ========================= FORM ========================= */}
      <Card title="Form Rekomendasi" className="mt-4">
        <RekomendasiForm
          data={selectedData}
          onSubmit={handleSubmit}
          onSync={handleSync}
          isEditing={isEditing}
          onEdit={() => setIsEditing(true)}
          loading={uiLoading}
        />
      </Card>
    </div>
  );
}
