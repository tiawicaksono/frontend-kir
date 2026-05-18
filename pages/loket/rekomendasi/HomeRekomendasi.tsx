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
} from "@/services/rekomendasi.service";

import { useShowAlert } from "@/core/alert/alert.hook";

export default function HomeRekomendasi() {
  const { showErrorAlert, showSuccessAlert } = useShowAlert();

  // =========================================
  // TABLE STATE
  // =========================================
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

  // =========================================
  // SELECTED ROW
  // =========================================
  const [selectedData, setSelectedData] = useState<any>(null);

  // =========================================
  // FETCH DATA
  // =========================================
  const fetchData = async (customParams?: any) => {
    try {
      setTable((prev: any) => ({
        ...prev,
        loading: true,
      }));

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
      setTable((prev: any) => ({
        ...prev,
        loading: false,
      }));

      showErrorAlert(err, "Gagal load data");
    }
  };

  // =========================================
  // LOAD EFFECT
  // IMPORTANT: NO fetchData dependency
  // =========================================
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

  // =========================================
  // DYNAMIC COLUMNS
  // =========================================
  const columns = useMemo(() => {
    const labels = table?.config?.labels || {};
    const sortable = table?.config?.sortable || [];
    const searchable = table?.config?.searchable || [];
    const hidden = table?.config?.hidden || [];

    return Object.keys(labels)
      .filter((key) => !hidden.includes(key))
      .map((key) => {
        const searchItem = searchable.find(
          (s: any) => s.field.replace(/\./g, "_") === key,
        );

        return {
          title: labels[key],

          dataIndex: key,
          key,

          sorter: sortable.includes(key),

          searchable: !!searchItem,

          searchField: searchItem?.field,
          searchLabel: searchItem?.label,
        };
      });
  }, [table.config]);

  // =========================================
  // TABLE CHANGE
  // =========================================
  const handleTableChange = (payload: any) => {
    setTable((prev: any) => ({
      ...prev,

      params: {
        ...prev.params,
        ...payload,
      },
    }));
  };

  // =========================================
  // RELOAD
  // =========================================
  const reload = () => {
    fetchData();
  };

  // =========================================
  // SAVE FORM
  // =========================================
  const handleSubmit = async (values: any) => {
    const pk = table?.config?.primary_key || "id";

    if (!selectedData?.[pk]) return;

    try {
      await updateRekomendasi(selectedData[pk], values);

      showSuccessAlert("Berhasil update rekomendasi");

      fetchData();
    } catch (err) {
      showErrorAlert(err, "Gagal update");
    }
  };

  // =========================================
  // SYNC
  // =========================================
  const handleSync = async () => {
    const pk = table?.config?.primary_key || "id";

    if (!selectedData?.[pk]) return;

    try {
      await syncRekomendasi(selectedData[pk]);

      showSuccessAlert("Berhasil sinkron");

      fetchData();
    } catch (err) {
      showErrorAlert(err, "Gagal sinkron");
    }
  };

  return (
    <div>
      <AutoBreadcrumb />

      <Card title="Daftar Rekomendasi" className="mt-4">
        <RekomendasiTable
          table={{
            ...table,

            columns,

            setParams: handleTableChange,

            fetchData: reload,
          }}
          onSelect={setSelectedData}
        />
      </Card>

      <Card title="Form Rekomendasi" className="mt-4">
        <RekomendasiForm
          data={selectedData}
          onSubmit={handleSubmit}
          onSync={handleSync}
        />
      </Card>
    </div>
  );
}
