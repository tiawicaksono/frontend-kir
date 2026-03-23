import AutoBreadcrumb from "@/components/common/AutoBreadcrumb";
import HomeApiIntegration from "@/components/pages/pengaturan/api-integration/HomeApiIntegration";

export default function ApiIntegrationsPage() {
  return (
    <div>
      <AutoBreadcrumb pageTitle="API Integrations" />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12">
          <HomeApiIntegration />
        </div>
      </div>
    </div>
  );
}
