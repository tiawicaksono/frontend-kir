"use client";

import AutoBreadcrumb from "@/components/common/AutoBreadcrumb";
import KendaraanForm from "@/pages/master/kendaraan/KendaraanForm";

export default function DataKendaraanPage() {
  return (
    <div>
      <AutoBreadcrumb />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12">
          <KendaraanForm />
        </div>
      </div>
    </div>
  );
}
