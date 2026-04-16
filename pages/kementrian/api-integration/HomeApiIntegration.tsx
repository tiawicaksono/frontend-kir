"use client";

import { useEffect, useState } from "react";
import {
  getApiIntegrations,
  syncApi,
} from "@/services/api-integrations.service";
import ApiIntegrationGrid from "./ApiIntegrationGrid";
import { ApiIntegrations } from "@/types/api-integrations.type";
import { Button } from "antd";
import { ReloadOutlined } from "@ant-design/icons";

export default function HomeApiIntegration() {
  const [data, setData] = useState<ApiIntegrations[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncAllLoading, setSyncAllLoading] = useState(false);
  const [loadingMap, setLoadingMap] = useState<Record<number, boolean>>({});

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    try {
      const res = await getApiIntegrations();
      setData(res);
    } finally {
      setLoading(false);
    }
  }

  // 🔥 SYNC ALL
  async function handleSyncAll() {
    setSyncAllLoading(true);

    try {
      for (let i = 0; i < data.length; i++) {
        const item = data[i];

        // 🔥 set loading card ini
        setLoadingMap((prev) => ({ ...prev, [item.id]: true }));

        try {
          const res = await syncApi(item.prefix, {
            api_integration_id: item.id,
            name: item.name,
            prefix: item.prefix,
            url_api: "https://URL_API",
            token: "TOKEN_KAMU",
          });

          setData((prev) =>
            prev.map((d) =>
              d.id === item.id
                ? { ...d, last_transaction: res.transaction }
                : d,
            ),
          );
        } catch (err: any) {
          const transaction = err?.response?.data?.transaction;

          if (transaction) {
            setData((prev) =>
              prev.map((d) =>
                d.id === item.id ? { ...d, last_transaction: transaction } : d,
              ),
            );
          }
        }

        // 🔥 selesai → matikan loading card
        setLoadingMap((prev) => ({ ...prev, [item.id]: false }));
      }
    } finally {
      setSyncAllLoading(false);
    }
  }

  async function handleSyncSingle(item: ApiIntegrations) {
    setLoadingMap((prev) => ({ ...prev, [item.id]: true }));

    try {
      const res = await syncApi(item.prefix, {
        api_integration_id: item.id,
        name: item.name,
        prefix: item.prefix,
        url_api: "https://URL_API",
        token: "TOKEN_KAMU",
      });

      setData((prev) =>
        prev.map((d) =>
          d.id === item.id ? { ...d, last_transaction: res.transaction } : d,
        ),
      );
    } catch (err: any) {
      const transaction = err?.response?.data?.transaction;

      if (transaction) {
        setData((prev) =>
          prev.map((d) =>
            d.id === item.id ? { ...d, last_transaction: transaction } : d,
          ),
        );
      }
    } finally {
      setLoadingMap((prev) => ({ ...prev, [item.id]: false }));
    }
  }

  return (
    <>
      {/* 🔥 ACTION BUTTON */}
      <div className="flex items-center gap-2 mb-4">
        <Button icon={<ReloadOutlined />} onClick={fetchData} loading={loading}>
          Reload
        </Button>

        <Button type="primary" onClick={handleSyncAll} loading={syncAllLoading}>
          Sinkron Semua
        </Button>
      </div>

      <ApiIntegrationGrid
        data={data}
        loading={loading}
        onSyncSingle={handleSyncSingle}
        loadingMap={loadingMap}
      />
    </>
  );
}
