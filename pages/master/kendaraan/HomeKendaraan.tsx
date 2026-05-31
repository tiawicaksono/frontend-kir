"use client";

import { useCallback, useEffect, useState } from "react";

import { Badge, Button } from "antd";
import { useRouter } from "next/navigation";

import ComponentCard from "@/components/common/ComponentCard";

import {
  createKendaraan,
  updateKendaraan,
  deleteKendaraan,
  fetchTableDataKendaraan,
  fetchKendaraanCounts,
} from "@/services/data-kendaraan.service";

import KendaraanTable from "./KendaraanTable";

import { useKendaraanModule } from "@/hooks/data-kendaraan/useKendaraanModule";

import type { KendaraanRow } from "@/types/kendaraan.type";

export default function HomeKendaraan() {
  const router = useRouter();

  const [total, setTotal] = useState(0);

  const loadCounts = useCallback(async () => {
    try {
      const res = await fetchKendaraanCounts();

      setTotal(res?.countData ?? 0);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    loadCounts();
  }, [loadCounts]);

  const { table, handleDelete, handleReload } =
    useKendaraanModule<KendaraanRow>({
      fetcher: fetchTableDataKendaraan,

      service: {
        create: createKendaraan,
        update: updateKendaraan,
        delete: deleteKendaraan,
      },

      label: "Kendaraan",

      loadCounts,
    });

  const handleCreate = useCallback(() => {
    router.push("/master/data-kendaraan/create");
  }, [router]);

  const handleView = useCallback(
    (row: KendaraanRow) => {
      router.push(`/master/data-kendaraan/view/${row.id}`);
    },
    [router],
  );

  const handleEdit = useCallback(
    (row: KendaraanRow) => {
      router.push(`/master/data-kendaraan/edit/${row.id}`);
    },
    [router],
  );

  return (
    <ComponentCard
      borderTop
      title={
        <div className="flex items-center gap-2">
          <span>Manajemen Kendaraan</span>

          <Badge count={total} overflowCount={9999} />
        </div>
      }
      extra={
        <Button type="primary" onClick={handleCreate}>
          Add Kendaraan
        </Button>
      }
    >
      <KendaraanTable
        table={table}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onReload={handleReload}
      />
    </ComponentCard>
  );
}
