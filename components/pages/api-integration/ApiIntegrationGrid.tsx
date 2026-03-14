import { ApiIntegrations } from "@/types/api-integrations.type";
import ApiIntegrationCard from "@/components/pages/api-integration/ApiIntegrationCard";

interface Props {
  data: ApiIntegrations[];
}

export default function ApiIntegrationGrid({ data }: Props) {
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
