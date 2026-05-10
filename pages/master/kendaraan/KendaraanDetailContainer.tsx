"use client";

import ComponentCard from "@/components/common/ComponentCard";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { detailKendaraan } from "@/services/data-kendaraan.service";
import { fetchRiwayatUji } from "@/services/data-kendaraan.service";

import DetailTabDataKendaraan from "@/components/data-kendaraan/DetailTabDataKendaraan";
import DetailTabRiwayat from "@/components/data-kendaraan/DetailTabRiwayat";
import DetailHeaderAction from "@/components/data-kendaraan/DetailHeaderAction";

import { Card, Tabs, Tag, Spin, Button } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import type { TabBarExtraMap } from "@rc-component/tabs/es/interface";
import { safe } from "@/utils/formatDetailKendaraan";

export default function KendaraanDetailContainer({ id }: { id: string }) {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("data");

  const [data, setData] = useState<any>(null);
  const [riwayat, setRiwayat] = useState<any[]>([]);

  const [loadingData, setLoadingData] = useState(false);
  const [loadingRiwayat, setLoadingRiwayat] = useState(false);

  // 🔥 FETCH DETAIL KENDARAAN
  const loadDetail = async () => {
    try {
      setLoadingData(true);
      const res = await detailKendaraan(Number(id));
      setData(res);
    } catch (err) {
      console.error("DETAIL ERROR:", err);
    } finally {
      setLoadingData(false);
    }
  };

  // 🔥 FETCH RIWAYAT
  const loadRiwayat = async () => {
    try {
      setLoadingRiwayat(true);
      const res = await fetchRiwayatUji(id);
      setRiwayat(res);
    } catch (err) {
      console.error("RIWAYAT ERROR:", err);
    } finally {
      setLoadingRiwayat(false);
    }
  };

  // initial load
  useEffect(() => {
    if (!id) return;
    loadDetail();
    loadRiwayat();
  }, [id]);

  // 🔥 RELOAD BERDASARKAN TAB AKTIF
  const handleReload = async () => {
    if (activeTab === "data") {
      await loadDetail();
    } else {
      await loadRiwayat();
    }
  };

  const headerAction = (
    <DetailHeaderAction
      id={id}
      onRefresh={handleReload}
      onEdit={() => router.push(`/master/data-kendaraan/edit/${id}`)}
    />
  );

  // 🔥 EXTRA ACTION (ANTD STYLE)
  const tabBarExtraContent = useMemo<TabBarExtraMap>(() => {
    return {
      right: (
        <Button
          icon={<ReloadOutlined />}
          onClick={handleReload}
          loading={activeTab === "data" ? loadingData : loadingRiwayat}
        >
          Reload
        </Button>
      ),
    };
  }, [activeTab, loadingData, loadingRiwayat]);

  const items = [
    {
      key: "data",
      label: "Data Kendaraan",
      children: <DetailTabDataKendaraan data={data} loading={loadingData} />,
    },
    {
      key: "riwayat",
      label: "Riwayat Uji",
      children: <DetailTabRiwayat data={riwayat} loading={loadingRiwayat} />,
    },
  ];

  return (
    <ComponentCard>
      {/* HEADER */}
      {loadingData && !data ? (
        <div className="flex justify-center py-10">
          <Spin />
        </div>
      ) : (
        data && (
          <Card className="mb-4">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  {safe(data?.no_uji)}
                  <Tag color={data?.status === "UMUM" ? "green" : "orange"}>
                    {safe(data?.status)}
                  </Tag>
                </h2>

                <p className="text-gray-500">
                  No Polisi: {safe(data?.no_kendaraan)}
                </p>

                <p className="mt-2">{safe(data?.nama_pemilik)}</p>

                <p className="text-gray-500 text-xs">
                  No HP: {safe(data?.no_hp)}
                </p>
              </div>

              <div className="text-right">{headerAction}</div>
            </div>
          </Card>
        )
      )}

      {/* TABS */}
      <Tabs
        defaultActiveKey="data"
        items={items}
        onChange={setActiveTab}
        tabBarExtraContent={tabBarExtraContent}
      />
    </ComponentCard>
  );
}
