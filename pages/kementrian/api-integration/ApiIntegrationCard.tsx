"use client";

import { useRouter } from "next/navigation";
import ComponentCard from "@/components/common/ComponentCard";
import DateText from "@/components/common/DateText";
import HrShimmer from "@/components/common/HrShimmer";
import SyncButton from "@/components/common/SyncButton";
import { useShowAlert } from "@/core/alert/alert.hook";
import { ApiIntegrations } from "@/types/api-integrations.type";

interface Props {
  data?: ApiIntegrations; // 👈 dibuat optional biar aman saat build
  onSyncSingle?: (item: ApiIntegrations) => Promise<void>;
  loading?: boolean;
}

export default function ApiIntegrationCard({
  data,
  onSyncSingle,
  loading,
}: Props) {
  const { showErrorAlert, showSuccessAlert } = useShowAlert();
  const router = useRouter();

  async function handleSync() {
    if (!onSyncSingle || !data) return;

    try {
      await onSyncSingle(data);
      showSuccessAlert("Sync berhasil");
    } catch (err) {
      showErrorAlert(err, "Sync gagal");
    }
  }

  function handleOpenDetail() {
    if (!data) return;

    router.push(
      `/kementrian/api-integrations/detail?prefix=${data.prefix}&name=${encodeURIComponent(
        data.name ?? "",
      )}`,
    );
  }

  // 👇 IMPORTANT: guard SSR / prerender error
  if (!data) {
    return (
      <ComponentCard title="Loading..." desc="">
        <HrShimmer loading={true} />
      </ComponentCard>
    );
  }

  const lastTransaction = data.last_transaction;

  return (
    <ComponentCard
      title={data.name ?? "-"}
      desc={data.description ?? "-"}
      headerRight={<SyncButton onSync={handleSync} />}
    >
      <HrShimmer loading={loading} />

      <div className="flex items-center justify-between">
        <div className="text-xs text-gray-300 mr-2">
          <p>
            <span className="text-black">Last Sinkron :</span>{" "}
            <DateText value={lastTransaction?.created_at} withTime />
          </p>

          <p>
            <span className="text-black">Keterangan :</span>{" "}
            {lastTransaction?.keterangan || "-"}
          </p>
        </div>

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
