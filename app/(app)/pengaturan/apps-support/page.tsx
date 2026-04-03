"use client";

import AutoBreadcrumb from "@/components/common/AutoBreadcrumb";
import HomeAppsSupport from "@/pages/pengaturan/apps-support/HomeAppsSupport";

export default function WilayahPage() {
  return (
    <div>
      <AutoBreadcrumb />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12">
          <HomeAppsSupport />
        </div>
      </div>
    </div>
  );
}
