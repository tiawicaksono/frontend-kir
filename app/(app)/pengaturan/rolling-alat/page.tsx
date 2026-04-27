"use client";

import AutoBreadcrumb from "@/components/common/AutoBreadcrumb";
import HomeRollingAlat from "@/pages/pengaturan/rolling-alat/HomeRollingAlat";

export default function RollingAlatPage() {
  return (
    <div>
      <AutoBreadcrumb />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12">
          <HomeRollingAlat />
        </div>
      </div>
    </div>
  );
}
