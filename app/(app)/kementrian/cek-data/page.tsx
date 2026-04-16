"use client";

import AutoBreadcrumb from "@/components/common/AutoBreadcrumb";
import PostmanLikeForm from "@/pages/kementrian/cek-data/HomeCekData";

export default function CekDataPage() {
  return (
    <div>
      <AutoBreadcrumb pageTitle="API Cek Data" />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12">
          <PostmanLikeForm />
        </div>
      </div>
    </div>
  );
}
