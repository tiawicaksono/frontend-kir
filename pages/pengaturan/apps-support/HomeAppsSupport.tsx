"use client";

import ComponentCard from "@/components/common/ComponentCard";
import AppTabs from "@/components/ui/tabs/AppTabs";
import { BookOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

// 🔥 SERVICES
import {
  createStatusPenerbitan,
  updateStatusPenerbitan,
  deleteStatusPenerbitan,
  fetchTableDataStatusPenerbitan,
  fetchStatusPenerbitanCounts,
  createBahanUtama,
  updateBahanUtama,
  deleteBahanUtama,
  fetchTableDataBahanUtama,
  fetchBahanUtamaCounts,
  createKonfigurasiSumbu,
  updateKonfigurasiSumbu,
  deleteKonfigurasiSumbu,
  fetchTableDataKonfigurasiSumbu,
  fetchKonfigurasiSumbuCounts,
} from "@/services/apps-support.service";

import AppsSupportTable from "../AppsSupportTable";

// 🔥 FORMS
import BahanUtamaKendaraanForm from "./form/BahanUtamaKendaraanForm";
import StatusPenerbitanForm from "./form/StatusPenerbitanForm";
import KonfigurasiSumbuForm from "./form/KonfigurasiSumbuForm";

import { useAppsSupportModule } from "../hook/useAppsSupportModule";
import { TabItemConfig } from "@/components/ui/tabs/types";

export default function HomeAppsSupport() {
  const [counts, setCounts] = useState({
    countStatusPenerbitan: 0,
    countBahanUtama: 0,
    countKonfigurasiSumbu: 0,
  });

  const loadCounts = async () => {
    try {
      const resSp = await fetchStatusPenerbitanCounts();
      const resBu = await fetchBahanUtamaCounts();
      const resKs = await fetchKonfigurasiSumbuCounts();

      setCounts({
        countStatusPenerbitan: resSp.countData ?? 0,
        countBahanUtama: resBu.countData ?? 0,
        countKonfigurasiSumbu: resKs.countData ?? 0,
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadCounts();
  }, []);

  // 🔥 MODULES
  const StatusPenerbitan = useAppsSupportModule({
    fetcher: fetchTableDataStatusPenerbitan,
    service: {
      create: createStatusPenerbitan,
      update: updateStatusPenerbitan,
      delete: deleteStatusPenerbitan,
    },
    label: "Status Penerbitan",
    loadCounts,
  });

  const BahanUtama = useAppsSupportModule({
    fetcher: fetchTableDataBahanUtama,
    service: {
      create: createBahanUtama,
      update: updateBahanUtama,
      delete: deleteBahanUtama,
    },
    label: "Bahan Utama",
    loadCounts,
  });

  const KonfigurasiSumbu = useAppsSupportModule({
    fetcher: fetchTableDataKonfigurasiSumbu,
    service: {
      create: createKonfigurasiSumbu,
      update: updateKonfigurasiSumbu,
      delete: deleteKonfigurasiSumbu,
    },
    label: "Konfigurasi Sumbu",
    loadCounts,
  });

  // 🔥 CONFIG FINAL (NO MAP)
  const appsSupportConfig: TabItemConfig[] = [
    {
      key: "status-penerbitan",
      label: "Status Penerbitan",
      icon: <BookOutlined />,
      module: StatusPenerbitan,
      Table: AppsSupportTable,
      Form: StatusPenerbitanForm,
      badge: counts.countStatusPenerbitan,

      showAction: true,
      actionLabel: "Add Status Penerbitan",
      actionType: "modal",
    },
    {
      key: "bahan-utama",
      label: "Bahan Utama",
      icon: <BookOutlined />,
      module: BahanUtama,
      Table: AppsSupportTable,
      Form: BahanUtamaKendaraanForm,
      badge: counts.countBahanUtama,

      showAction: true,
      actionLabel: "Add Bahan Utama",
      actionType: "modal",
    },
    {
      key: "konfigurasi-sumbu",
      label: "Konfigurasi Sumbu",
      icon: <BookOutlined />,
      module: KonfigurasiSumbu,
      Table: AppsSupportTable,
      Form: KonfigurasiSumbuForm,
      badge: counts.countKonfigurasiSumbu,

      showAction: true,
      actionLabel: "Add Konfigurasi Sumbu",
      actionType: "modal",
    },
  ];

  return (
    <ComponentCard title="Apps Support Management">
      <AppTabs defaultActiveKey="status-penerbitan" items={appsSupportConfig} />
    </ComponentCard>
  );
}
