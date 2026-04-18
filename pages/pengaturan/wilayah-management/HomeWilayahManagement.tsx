"use client";

import ComponentCard from "@/components/common/ComponentCard";
import AppTabs from "@/components/ui/tabs/AppTabs";
import { BookOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { fetchWilayahManagementCounts } from "@/services/wilayah.service";

import {
  createProvinsi,
  updateProvinsi,
  deleteProvinsi,
  fetchTableDataProvinsi,
  createKota,
  updateKota,
  deleteKota,
  fetchTableDataKota,
  createKecamatan,
  updateKecamatan,
  deleteKecamatan,
  fetchTableDataKecamatan,
  createKelurahan,
  updateKelurahan,
  deleteKelurahan,
  fetchTableDataKelurahan,
} from "@/services/wilayah.service";

import AppsSupportTable from "../AppsSupportTable";

import ProvinsiForm from "./form/ProvinsiForm";
import KotaForm from "./form/KotaForm";
import KecamatanForm from "./form/KecamatanForm";
import KelurahanForm from "./form/KelurahanForm";

import { useAppsSupportModule } from "../hook/useAppsSupportModule";
import { TabItemConfig } from "@/components/ui/tabs/types";

export default function HomeWilayahManagement() {
  const [counts, setCounts] = useState({
    provinsi: 0,
    kota: 0,
    kecamatan: 0,
    kelurahan: 0,
  });

  const loadCounts = async () => {
    try {
      const res = await fetchWilayahManagementCounts();
      setCounts({
        provinsi: res.provinsi ?? 0,
        kota: res.kota ?? 0,
        kecamatan: res.kecamatan ?? 0,
        kelurahan: res.kelurahan ?? 0,
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadCounts();
  }, []);

  // 🔥 MODULES
  const provinsi = useAppsSupportModule({
    fetcher: fetchTableDataProvinsi,
    service: {
      create: createProvinsi,
      update: updateProvinsi,
      delete: deleteProvinsi,
    },
    label: "Provinsi",
    loadCounts,
  });

  const kota = useAppsSupportModule({
    fetcher: fetchTableDataKota,
    service: {
      create: createKota,
      update: updateKota,
      delete: deleteKota,
    },
    label: "Kota",
    loadCounts,
  });

  const kecamatan = useAppsSupportModule({
    fetcher: fetchTableDataKecamatan,
    service: {
      create: createKecamatan,
      update: updateKecamatan,
      delete: deleteKecamatan,
    },
    label: "Kecamatan",
    loadCounts,
  });

  const kelurahan = useAppsSupportModule({
    fetcher: fetchTableDataKelurahan,
    service: {
      create: createKelurahan,
      update: updateKelurahan,
      delete: deleteKelurahan,
    },
    label: "Kelurahan",
    loadCounts,
  });

  // 🔥 CONFIG FINAL (TANPA MAP)
  const wilayahConfig: TabItemConfig[] = [
    {
      key: "provinsi",
      label: "Provinsi",
      icon: <BookOutlined />,
      module: provinsi,
      Table: AppsSupportTable,
      Form: ProvinsiForm,
      badge: counts.provinsi,

      showAction: true,
      actionLabel: "Add Provinsi",

      actionType: "modal", // 🔥 tetap modal
    },
    {
      key: "kota",
      label: "Kota/Kabupaten",
      icon: <BookOutlined />,
      module: kota,
      Table: AppsSupportTable,
      Form: KotaForm,
      badge: counts.kota,

      showAction: true,
      actionLabel: "Add Kota",
      actionType: "modal",
    },
    {
      key: "kecamatan",
      label: "Kecamatan",
      icon: <BookOutlined />,
      module: kecamatan,
      Table: AppsSupportTable,
      Form: KecamatanForm,
      badge: counts.kecamatan,

      showAction: true,
      actionLabel: "Add Kecamatan",
      actionType: "modal",
    },
    {
      key: "kelurahan",
      label: "Kelurahan/Desa",
      icon: <BookOutlined />,
      module: kelurahan,
      Table: AppsSupportTable,
      Form: KelurahanForm,
      badge: counts.kelurahan,

      showAction: true,
      actionLabel: "Add Kelurahan",
      actionType: "modal",
    },
  ];

  return (
    <ComponentCard
      title="Wilayah Management"
      desc="Pengaturan data wilayah provinsi, kota/kabupaten, kecamatan, dan kelurahan/desa"
    >
      <AppTabs defaultActiveKey="provinsi" items={wilayahConfig} />
    </ComponentCard>
  );
}
