"use client";

import { useEffect, useState } from "react";
import ComponentCard from "@/components/common/ComponentCard";
import AppTabs from "@/components/ui/tabs/AppTabs";
import { BookOutlined } from "@ant-design/icons";

import AppsSupportTable from "../AppsSupportTable";

import StatusPenerbitanForm from "./form/StatusPenerbitanForm";
import BahanUtamaKendaraanForm from "./form/BahanUtamaKendaraanForm";
import KonfigurasiSumbuForm from "./form/KonfigurasiSumbuForm";
import BiroJasaForm from "./form/BiroJasaForm";

import { useAppsSupportModule } from "@/hooks/pengaturan/useAppsSupportModule";

import {
  fetchStatusPenerbitanCounts,
  fetchBahanUtamaCounts,
  fetchKonfigurasiSumbuCounts,
  fetchBiroJasaCounts,
  fetchTableDataStatusPenerbitan,
  fetchTableDataBahanUtama,
  fetchTableDataKonfigurasiSumbu,
  fetchTableDataBiroJasa,
  createStatusPenerbitan,
  updateStatusPenerbitan,
  deleteStatusPenerbitan,
  createBahanUtama,
  updateBahanUtama,
  deleteBahanUtama,
  createKonfigurasiSumbu,
  updateKonfigurasiSumbu,
  deleteKonfigurasiSumbu,
  createBiroJasa,
  updateBiroJasa,
  deleteBiroJasa,
} from "@/services/apps-support.service";

export default function HomeAppsSupport() {
  const [counts, setCounts] = useState({
    countStatusPenerbitan: 0,
    countBahanUtama: 0,
    countKonfigurasiSumbu: 0,
    countBiroJasa: 0,
  });

  const loadCounts = async () => {
    const res = await Promise.all([
      fetchStatusPenerbitanCounts(),
      fetchBahanUtamaCounts(),
      fetchKonfigurasiSumbuCounts(),
      fetchBiroJasaCounts(),
    ]);

    setCounts({
      countStatusPenerbitan: res[0]?.countData ?? 0,
      countBahanUtama: res[1]?.countData ?? 0,
      countKonfigurasiSumbu: res[2]?.countData ?? 0,
      countBiroJasa: res[3]?.countData ?? 0,
    });
  };

  useEffect(() => {
    loadCounts();
  }, []);

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

  const BiroJasa = useAppsSupportModule({
    fetcher: fetchTableDataBiroJasa,
    service: {
      create: createBiroJasa,
      update: updateBiroJasa,
      delete: deleteBiroJasa,
    },
    label: "Biro Jasa",
    loadCounts,
  });

  const tabs = [
    {
      key: "status",
      label: "Status Penerbitan",
      icon: <BookOutlined />,
      module: StatusPenerbitan,
      Table: AppsSupportTable,
      Form: StatusPenerbitanForm,
      badge: counts.countStatusPenerbitan,
    },
    {
      key: "bahan",
      label: "Bahan Utama",
      icon: <BookOutlined />,
      module: BahanUtama,
      Table: AppsSupportTable,
      Form: BahanUtamaKendaraanForm,
      badge: counts.countBahanUtama,
    },
    {
      key: "sumbu",
      label: "Konfigurasi Sumbu",
      icon: <BookOutlined />,
      module: KonfigurasiSumbu,
      Table: AppsSupportTable,
      Form: KonfigurasiSumbuForm,
      badge: counts.countKonfigurasiSumbu,
    },
    {
      key: "biro",
      label: "Biro Jasa",
      icon: <BookOutlined />,
      module: BiroJasa,
      Table: AppsSupportTable,
      Form: BiroJasaForm,
      badge: counts.countBiroJasa,
    },
  ];

  return (
    <ComponentCard title="Apps Support Management">
      <AppTabs defaultActiveKey="status" items={tabs} />
    </ComponentCard>
  );
}
