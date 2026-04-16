"use client";

import AutoBreadcrumb from "@/components/common/AutoBreadcrumb";
import HomeApiKey from "@/pages/pengaturan/api-key/HomeApiKey";

export default function ApiKeysPage() {
  return (
    <div>
      <AutoBreadcrumb pageTitle="API Keys" />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12">
          <HomeApiKey />
        </div>
      </div>
    </div>
  );
}
