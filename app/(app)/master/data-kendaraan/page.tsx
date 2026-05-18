"use client";

import AutoBreadcrumb from "@/components/common/AutoBreadcrumb";
import HomeKendaraan from "@/pages/master/kendaraan/HomeKendaraan";

export default function DataKendaraanPage() {
  return (
    <div>
      <AutoBreadcrumb pageTitle="Manajemen Kendaraan" />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12">
          <HomeKendaraan />
        </div>
      </div>
    </div>
  );
}
