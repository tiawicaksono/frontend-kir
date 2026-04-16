import { ApiIntegrations } from "@/types/api-integrations.type";
import ApiIntegrationCard from "@/pages/kementrian/api-integration/ApiIntegrationCard";

interface Props {
  data: ApiIntegrations[];
  loading: boolean;
  onSyncSingle?: (item: ApiIntegrations) => Promise<void>;
  loadingMap?: Record<number, boolean>;
}

export default function ApiIntegrationGrid({
  data,
  loading,
  onSyncSingle,
  loadingMap = {},
}: Props) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-32 bg-gray-200 animate-pulse rounded-lg" />
        ))}
      </div>
    );
  }

  if (!data.length) {
    return <p className="text-gray-500">Data tidak tersedia</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.map((item) => (
        <ApiIntegrationCard
          key={item.id}
          data={item}
          onSyncSingle={onSyncSingle}
          loading={loadingMap?.[item.id] || false}
        />
      ))}
    </div>
  );
}
