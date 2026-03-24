"use client";

import AutoBreadcrumb from "@/components/common/AutoBreadcrumb";
import HomeUserManagement from "@/components/pages/pengaturan/user-management/HomeUserManagement";

export default function UserManagementPage() {
  return (
    <div>
      <AutoBreadcrumb pageTitle="User Management" />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12">
          <HomeUserManagement />
        </div>
      </div>
    </div>
  );
}
