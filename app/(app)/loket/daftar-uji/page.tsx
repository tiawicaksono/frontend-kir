"use client";

import AutoBreadcrumb from "@/components/common/AutoBreadcrumb";
import HomePendaftaran from "@/pages/pendaftaran/hook/HomePendaftaran";

export default function DaftarUjiPage() {
  return (
    <div>
      <AutoBreadcrumb />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12">
          <HomePendaftaran />
        </div>
      </div>
    </div>
  );
}
