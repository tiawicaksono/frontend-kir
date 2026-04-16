"use client";

import { useRouter } from "next/navigation";
import ComponentCard from "@/components/common/ComponentCard";
import DateText from "@/components/common/DateText";
import HrShimmer from "@/components/common/HrShimmer";
import SyncButton from "@/components/common/SyncButton";
import { useShowAlert } from "@/core/alert/alert.hook";
import { syncApi } from "@/services/api-integrations.service";
import { ApiIntegrations } from "@/types/api-integrations.type";
import { useState } from "react";

interface Props {
  data: ApiIntegrations;
  onSyncSingle?: (item: ApiIntegrations) => Promise<void>;
  loading?: boolean;
}

export default function ApiIntegrationCard({
  data,
  onSyncSingle,
  loading,
}: Props) {
  const { showErrorAlert, showSuccessAlert } = useShowAlert();
  // const [lastTransaction, setLastTransaction] = useState(data.last_transaction);
  const router = useRouter();

  async function handleSync() {
    if (!onSyncSingle) return;
    await onSyncSingle(data);
  }

  function handleOpenDetail() {
    router.push(
      `/kementrian/api-integrations/detail?prefix=${data.prefix}&name=${encodeURIComponent(data.name)}`,
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
        <div className="text-xs text-gray-300 mr-2">
          <p>
            <span className="text-black">Last Sinkron :</span>{" "}
            <DateText value={data.last_transaction?.created_at} withTime />
          </p>
          <p>
            <span className="text-black">Keterangan :</span>{" "}
            {data.last_transaction?.keterangan || "-"}
          </p>
        </div>

        <span
          onClick={handleOpenDetail}
          className={`text-xs px-2 py-1 rounded cursor-pointer hover:opacity-80 ${
            data.last_transaction?.status
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-500"
          }`}
        >
          {data.last_transaction?.status ? "Success" : "Failed"}
        </span>
      </div>
    </ComponentCard>
  );
}
