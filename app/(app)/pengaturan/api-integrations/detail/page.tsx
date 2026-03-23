import AutoBreadcrumb from "@/components/common/AutoBreadcrumb";
import ComponentCard from "@/components/common/ComponentCard";
import ApiIntegrationDetail from "@/components/pages/pengaturan/api-integration/ApiIntegrationDetailPage";

export default async function ApiIntegrationDetailPage({
  searchParams,
}: {
  searchParams: Promise<{ prefix?: string; name?: string }>;
}) {
  const params = await searchParams;
  const name = decodeURIComponent(params.name || "");
  const prefix = params.prefix || "";

  return (
    <div>
      <AutoBreadcrumb pageTitle="API Integrations - Detail" />
      <div className="space-y-6">
        <ComponentCard title={name} borderTop>
          <ApiIntegrationDetail prefix={prefix} />
        </ComponentCard>
      </div>
    </div>
  );
}
