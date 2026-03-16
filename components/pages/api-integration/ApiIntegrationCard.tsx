"use client";

import { useRouter } from "next/navigation";
import ComponentCard from "@/components/common/ComponentCard";
import DateText from "@/components/common/DateText";
import HrShimmer from "@/components/common/HrShimmer";
import SyncButton from "@/components/common/SyncButton";
import { useShowAlert } from "@/core/alert/alert.hook";
import {
  detailApiIntegration,
  syncApi,
} from "@/services/api-integrations.service";
import { ApiIntegrations } from "@/types/api-integrations.type";
import { tr } from "framer-motion/client";
import { useState } from "react";

interface Props {
  data: ApiIntegrations;
}

export default function ApiIntegrationCard({ data }: Props) {
  const [loading, setLoading] = useState(false);
  const { showErrorAlert, showSuccessAlert } = useShowAlert();
  const [lastTransaction, setLastTransaction] = useState(data.lastTransaction);
  const router = useRouter();

  async function handleSync() {
    setLoading(true);

    try {
      const res = await syncApi(data.prefix, {
        api_integration_id: data.id,
        name: data.name,
        prefix: data.prefix,
        url_api: "https://ujiberkala-middle.kemenhub.go.id/api/v1/global",
        token:
          "eyJpdiI6IjRJVTlHaUZFb0FFUnNCQVR1VXRtRXc9PSIsInZhbHVlIjoiRitGRDdvbVNTWTdrWFQvZ1FDWXhsR0tQeEkwZTA0ZGMvSGxQdm80YlJsYnVOYU9HYUZmYUxTL0N2eGl0QkJiSWdna1RUdHJZVVQxR1Qwa0FxUGt0U2xzNitYRVF4MCtLQ0hvQXQwdERyWEhjZXYwL3MzcUIvS05KTGFPcDlvT0MiLCJtYWMiOiJlOTFlOGM5M2ZmZmY1YTMxZTA0OGYyNDhiM2NkYzQyMDA3ZmU2ZmQyMDFiMzhiNTM1ZjJkZTE1MjYwYzM3MzQ4IiwidGFnIjoiIn0=",
      });
      setLastTransaction(res.transaction);
      showSuccessAlert("Sinkronisasi API berhasil");
    } catch (error: any) {
      const transaction = error?.response?.data?.transaction;

      if (transaction) {
        setLastTransaction(transaction);
      }
      showErrorAlert(error, "Sinkronisasi API Gagal");
    } finally {
      setLoading(false);
    }
  }

  function handleOpenDetail() {
    router.push(
      `/pengaturan/api-integrations/detail?prefix=${data.prefix}&name=${encodeURIComponent(data.name)}`,
    );
  }
  return (
    <ComponentCard
      title={data.name}
      desc={data.description}
      headerRight={
        <div className="flex items-center gap-2">
          <SyncButton onSync={handleSync} />
        </div>
      }
    >
      <HrShimmer loading={loading} />
      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-400 mt-2">
          Last Sinkron: <DateText value={lastTransaction?.createdAt} withTime />
        </p>

        <span
          onClick={handleOpenDetail}
          className={`text-xs px-2 py-1 rounded cursor-pointer hover:opacity-80 ${
            lastTransaction?.status
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-500"
          }`}
        >
          {lastTransaction?.status ? "Success" : "Failed"}
        </span>
      </div>
    </ComponentCard>
  );
}
