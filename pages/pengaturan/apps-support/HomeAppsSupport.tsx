"use client";

import ComponentCard from "@/components/common/ComponentCard";
import AppTabs from "@/components/ui/tabs/AppTabs";
import { BookOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import {
  fetchBahanUtamaCounts,
  fetchStatusPenerbitanCounts,
  fetchKonfigurasiSumbuCounts,
} from "@/services/apps-support.service";

// 🔥 SERVICES
import {
  createStatusPenerbitan,
  updateStatusPenerbitan,
  deleteStatusPenerbitan,
  fetchTableDataStatusPenerbitan,
  createBahanUtama,
  updateBahanUtama,
  deleteBahanUtama,
  fetchTableDataBahanUtama,
  createKonfigurasiSumbu,
  updateKonfigurasiSumbu,
  deleteKonfigurasiSumbu,
  fetchTableDataKonfigurasiSumbu,
} from "@/services/apps-support.service";
import AppsSupportTable from "../AppsSupportTable";
// 🔥 COMPONENTS
import BahanUtamaKendaraanForm from "./form/BahanUtamaKendaraanForm";
import StatusPenerbitanForm from "./form/StatusPenerbitanForm";
import KonfigurasiSumbuForm from "./form/KonfigurasiSumbuForm";

import { useAppsSupportModule } from "../hook/useAppsSupportModule";

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
    label: "Provinsi",
    loadCounts,
  });

  const BahanUtama = useAppsSupportModule({
    fetcher: fetchTableDataBahanUtama,
    service: {
      create: createBahanUtama,
      update: updateBahanUtama,
      delete: deleteBahanUtama,
    },
    label: "Kota",
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

  // 🔥 CONFIG ARRAY
  const appsSupportConfig = [
    {
      key: "status-penerbitan",
      label: "Status Penerbitan",
      icon: <BookOutlined />,
      module: StatusPenerbitan,
      Table: AppsSupportTable,
      Form: StatusPenerbitanForm,
      badge: counts.countStatusPenerbitan,
    },
    {
      key: "bahan-utama",
      label: "Bahan Utama",
      icon: <BookOutlined />,
      module: BahanUtama,
      Table: AppsSupportTable,
      Form: BahanUtamaKendaraanForm,
      badge: counts.countBahanUtama,
    },
    {
      key: "konfigurasi-sumbu",
      label: "Konfigurasi Sumbu",
      icon: <BookOutlined />,
      module: KonfigurasiSumbu,
      Table: AppsSupportTable,
      Form: KonfigurasiSumbuForm,
      badge: counts.countKonfigurasiSumbu,
    },
  ];

  return (
    <ComponentCard title="Apps Support Management">
      <AppTabs
        defaultActiveKey="status-penerbitan"
        items={appsSupportConfig.map((item) => ({
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
