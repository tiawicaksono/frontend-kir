"use client";

import ComponentCard from "@/components/common/ComponentCard";
import AppTabs from "@/components/ui/tabs/AppTabs";
import { BookOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { fetchWilayahManagementCounts } from "@/services/wilayah.service";

// 🔥 SERVICES
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
// 🔥 COMPONENTS
import ProvinsiForm from "./provinsi/ProvinsiForm";

import KotaForm from "./kota/KotaForm";

import KecamatanForm from "./kecamatan/KecamatanForm";

import KelurahanForm from "./kelurahan/KelurahanForm";
import { useAppsSupportModule } from "../hook/useAppsSupportModule";

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

  // 🔥 CONFIG ARRAY
  const wilayahConfig = [
    {
      key: "provinsi",
      label: "Provinsi",
      icon: <BookOutlined />,
      module: provinsi,
      Table: AppsSupportTable,
      Form: ProvinsiForm,
      badge: counts.provinsi,
    },
    {
      key: "kota",
      label: "Kota",
      icon: <BookOutlined />,
      module: kota,
      Table: AppsSupportTable,
      Form: KotaForm,
      badge: counts.kota,
    },
    {
      key: "kecamatan",
      label: "Kecamatan",
      icon: <BookOutlined />,
      module: kecamatan,
      Table: AppsSupportTable,
      Form: KecamatanForm,
      badge: counts.kecamatan,
    },
    {
      key: "kelurahan",
      label: "Kelurahan",
      icon: <BookOutlined />,
      module: kelurahan,
      Table: AppsSupportTable,
      Form: KelurahanForm,
      badge: counts.kelurahan,
    },
  ];

  return (
    <ComponentCard
      title="Wilayah Management"
      desc="Pengaturan data wilayah provinsi, kota/kabupaten, kecamatan, dan kelurahan/desa"
    >
      <AppTabs
        defaultActiveKey="provinsi"
        items={wilayahConfig.map((item) => ({
          key: item.key,
          label: (
            <>
              {item.icon} {item.label}
            </>
          ),
          badgeCount: item.badge,

          children: ({ openEdit }: any) => {
            const TableComponent = item.Table;

            return (
              <TableComponent
                table={item.module.table}
                onEdit={openEdit}
                onDelete={item.module.handleDeleteWrapper}
                onReload={item.module.handleReload}
              />
            );
          },

          showAction: true,
          actionLabel: `Add ${item.label}`,

          renderForm: ({ close, mode, formData }: any) => {
            const FormComponent = item.Form;

            return (
              <FormComponent
                mode={mode}
                initialValues={formData}
                onSubmit={(data: any) => {
                  const primaryKey = item.module.table.config.primary_key;
                  // 🔥 DEBUG DI SINI
                  console.log("FORM DATA:", formData);
                  console.log("PRIMARY KEY:", primaryKey);
                  console.log("ID VALUE:", formData?.[primaryKey]);
                  return mode === "create"
                    ? item.module.handleCreate(data)
                    : item.module.handleUpdate({
                        ...data,
                        [primaryKey]: formData?.[primaryKey],
                      });
                }}
                onSuccess={close}
              />
            );
          },
        }))}
      />
    </ComponentCard>
  );
}
