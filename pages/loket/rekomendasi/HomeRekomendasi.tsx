"use client";

import { useEffect, useMemo, useState } from "react";
import { Card } from "antd";

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

export default function HomeRekomendasi() {
  const { showErrorAlert, showSuccessAlert } = useShowAlert();

  // =========================
  // LOADING STATE
  // =========================
  const [uiLoading, setUiLoading] = useState({
    detail: false,
    submit: false,
    sync: false,
  });

  // =========================
  // TABLE STATE
  // =========================
  const [table, setTable] = useState<any>({
    dataSource: [],
    config: {},
    loading: false,
    total: 0,

    params: {
      page: 1,
      limit: 10,
      search: undefined,
      search_by: undefined,
      sort_by: "pendaftaran_id",
      sort_order: "desc",
    },
  });

  // =========================
  // SELECT STATE
  // =========================
  const [selectedId, setSelectedId] = useState<any>(null);
  const [selectedData, setSelectedData] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);

  // =========================
  // FETCH TABLE
  // =========================
  const fetchData = async (customParams?: any) => {
    try {
      setTable((prev: any) => ({ ...prev, loading: true }));

      const finalParams = customParams || table.params;
      const res = await fetchRekomendasi(finalParams);

      setTable((prev: any) => ({
        ...prev,
        loading: false,
        dataSource: res?.data ?? [],
        config: res?.config ?? {},
        total: res?.meta?.total ?? 0,
      }));
    } catch (err) {
      setTable((prev: any) => ({ ...prev, loading: false }));
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
  // DETAIL FETCH (CLICK ROW)
  // =========================
  const handleSelect = async (record: any) => {
    const pk = table?.config?.primary_key || "pendaftaran_id";
    const id = record?.[pk];

    if (!id) return;

    try {
      setSelectedId(id);
      setUiLoading((p) => ({ ...p, detail: true }));

      const res = await fetchRekomendasiDetail(id);
      const detail = res?.data?.data ?? res?.data;

      setSelectedData(detail);
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

      showSuccessAlert("Berhasil update rekomendasi");

      setIsEditing(false);
      fetchData();
    } catch (err) {
      showErrorAlert(err, "Gagal update");
    } finally {
      setUiLoading((p) => ({ ...p, submit: false }));
    }
  };

  // =========================
  // SYNC
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
  // TABLE CHANGE
  // =========================
  const handleTableChange = (payload: any) => {
    setTable((prev: any) => ({
      ...prev,
      params: { ...prev.params, ...payload },
    }));
  };

  const reload = () => fetchData();

  // =========================
  // COLUMNS
  // =========================
  const columns = useMemo(() => {
    const labels = table?.config?.labels || {};
    const sortable = table?.config?.sortable || [];
    const hidden = table?.config?.hidden || [];

    return Object.keys(labels)
      .filter((key) => !hidden.includes(key))
      .map((key) => ({
        title: labels[key],
        dataIndex: key,
        key,
        sorter: sortable.includes(key),
      }));
  }, [table.config]);

  return (
    <div>
      <AutoBreadcrumb />

      {/* =========================
          TABLE
      ========================= */}
      <Card title="Daftar Rekomendasi">
        <RekomendasiTable
          table={{
            ...table,
            columns,
            setParams: handleTableChange,
            fetchData: reload,
            selectedId,
            loading: table.loading || uiLoading.detail,
          }}
          onSelect={handleSelect}
        />
      </Card>

      {/* =========================
          FORM
      ========================= */}
      <Card
        title="Form Rekomendasi"
        className="mt-4"
        extra={
          selectedData && !isEditing ? (
            <a onClick={() => setIsEditing(true)}>Edit</a>
          ) : null
        }
      >
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
