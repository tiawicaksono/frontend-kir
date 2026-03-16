import { ApiIntegrations } from "@/types/api-integrations.type";
import ApiIntegrationCard from "@/components/pages/api-integration/ApiIntegrationCard";

interface Props {
  data: ApiIntegrations[];
  loading: boolean;
}

export default function ApiIntegrationGrid({ data, loading }: Props) {
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
        <ApiIntegrationCard key={item.id} data={item} />
      ))}
    </div>
  );
}
