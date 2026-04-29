"use client";

import AutoBreadcrumb from "@/components/common/AutoBreadcrumb";
import KendaraanDetailContainer from "@/pages/master/kendaraan/KendaraanDetailContainer";
import { useParams } from "next/navigation";

export default function Page() {
  const params = useParams();

  return (
    <div>
      <AutoBreadcrumb pageTitle="Detail Data Kendaraan" />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12">
          <KendaraanDetailContainer id={params?.id as string} />
        </div>
      </div>
    </div>
  );
}
