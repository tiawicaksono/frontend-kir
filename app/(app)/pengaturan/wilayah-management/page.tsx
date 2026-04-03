"use client";

import AutoBreadcrumb from "@/components/common/AutoBreadcrumb";
import HomeWilayahManagement from "@/pages/pengaturan/wilayah-management/HomeWilayahManagement";

export default function WilayahPage() {
  return (
    <div>
      <AutoBreadcrumb />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12">
          <HomeWilayahManagement />
        </div>
      </div>
    </div>
  );
}
