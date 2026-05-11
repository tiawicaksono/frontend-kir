"use client";

import AutoBreadcrumb from "@/components/common/AutoBreadcrumb";
import HomePendaftaran from "@/pages/pendaftaran/HomePendaftaran";
import PendaftaranListCard from "@/pages/pendaftaran/PendaftaranTable";

export default function DaftarUjiPage() {
  return (
    <div>
      <AutoBreadcrumb pageTitle="Form Pendaftaran" />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12">
          <HomePendaftaran />
          <PendaftaranListCard />
        </div>
      </div>
    </div>
  );
}
