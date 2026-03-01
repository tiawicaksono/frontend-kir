"use client";

import HomeApi from "@/components/pages/api/HomeApi";

export default function ApiIntegrationsPage() {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12">
        <HomeApi />
      </div>
    </div>
  );
}
