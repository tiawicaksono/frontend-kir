"use client";

import ComponentCard from "@/components/common/ComponentCard";
import AppTabs from "@/components/ui/tabs/AppTabs";
import { BookOutlined } from "@ant-design/icons";
import { act, useEffect, useState } from "react";
import {
  createKendaraan,
  updateKendaraan,
  deleteKendaraan,
  fetchTableDataKendaraan,
  fetchKendaraanCounts,
} from "@/services/data-kendaraan.service";

import KendaraanTable from "./KendaraanTable";
// 🔥 COMPONENTS
import KendaraanForm from "./KendaraanForm";
import { useKendaraanModule } from "../../../hooks/data-kendaraan/useKendaraanModule";
import { useRouter } from "next/navigation";
import { TabItemConfig } from "@/components/ui/tabs/types";

export default function HomeKendaraan() {
  const router = useRouter();
  const [counts, setCounts] = useState({
    countKendaraan: 0,
  });

  const loadCounts = async () => {
    try {
      const res = await fetchKendaraanCounts();
      setCounts({
        countKendaraan: res.countData ?? 0,
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadCounts();
  }, []);

  // 🔥 MODULES
  const Kendaraan = useKendaraanModule({
    fetcher: fetchTableDataKendaraan,
    service: {
      create: createKendaraan,
      update: updateKendaraan,
      delete: deleteKendaraan,
    },
    label: "Kendaraan",
    loadCounts,
  });

  // 🔥 CONFIG ARRAY
  const appsKendaraanConfig: TabItemConfig[] = [
    {
      key: "kendaraan",
      label: "Kendaraan",
      icon: <BookOutlined />,
      module: Kendaraan,
      Table: KendaraanTable,
      Form: KendaraanForm,
      badge: counts.countKendaraan,

      showAction: true,
      actionLabel: "Add Kendaraan",

      actionType: "page",
      onActionClick: () => router.push("/master/data-kendaraan/create"),

      onViewPage: (row: any) =>
        router.push(`/master/data-kendaraan/view/${row.id}`),
      onEditPage: (row: any) =>
        router.push(`/master/data-kendaraan/edit/${row.id}`),
    },
  ];

  return (
    <ComponentCard title="Kendaraan Management">
      <AppTabs defaultActiveKey="kendaraan" items={appsKendaraanConfig} />
    </ComponentCard>
  );
}
