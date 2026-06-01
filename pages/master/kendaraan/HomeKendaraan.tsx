"use client";

import { Badge, Button } from "antd";

import ComponentCard from "@/components/common/ComponentCard";

import KendaraanTable from "./KendaraanTable";

import { useKendaraanPage } from "@/hooks/data-kendaraan/useKendaraanPage";

export default function HomeKendaraan() {
  const {
    total,

    table,

    handleCreate,
    handleView,
    handleEdit,
    handleDelete,
    handleReload,
    handleBlokir,
    handleUnblock,
  } = useKendaraanPage();

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
        onBlokir={handleBlokir}
        onUnblock={handleUnblock}
      />
    </ComponentCard>
  );
}
