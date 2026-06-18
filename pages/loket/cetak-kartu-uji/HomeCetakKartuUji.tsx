"use client";

import { useMemo, useState } from "react";

import DynamicTable from "@/components/ui/dynamic-table/DynamicTable";
import ComponentCard from "@/components/common/ComponentCard";

import CetakKartuUjiFilter from "@/components/cetak-kartu-uji/CetakKartuUjiFilter";

import { useConfirm } from "@/core/confirm/confirm.hook";
import { useShowAlert } from "@/core/alert/alert.hook";

import { printKartuUji } from "@/services/cetak-kartu-uji.service";

import { useCetakKartuUji } from "@/hooks/cetak-kartu/useCetakKartuUji";
import { createCetakKartuUjiColumns } from "@/utils/cetakKartuUjiColumns";

export default function HomeCetakKartuUji() {
  const { confirm } = useConfirm();

  const { showErrorAlert, showSuccessAlert } = useShowAlert();

  const [loadingId, setLoadingId] = useState<number | null>(null);

  const { dataSource, loading, total, params, setParams, reload } =
    useCetakKartuUji();

  const handlePrint = async (row: any) => {
    const confirmed = await confirm({
      title: "Cetak Kartu Uji",
      message: `Yakin ingin mencetak kartu uji No. ${row.kendaraan_no_uji}?`,
      confirmText: "Cetak",
      cancelText: "Batal",
    });

    if (!confirmed) return;

    try {
      setLoadingId(row.id);

      await printKartuUji(row.id);

      showSuccessAlert("Kartu uji berhasil dicetak");

      reload();
    } catch (err) {
      showErrorAlert(err, "Kartu uji gagal dicetak");
    } finally {
      setLoadingId(null);
    }
  };

  const handleTableChange = (payload: any) => {
    setParams((prev) => ({
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

  const columns = useMemo(
    () =>
      createCetakKartuUjiColumns({
        loadingId,
        onPrint: handlePrint,
      }),
    [loadingId],
  );

  return (
    <ComponentCard title="Cetak Kartu Uji" borderTop>
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
        showActions={false}
        toolbar={
          <CetakKartuUjiFilter
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
