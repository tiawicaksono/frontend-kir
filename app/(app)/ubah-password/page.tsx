"use client";

import AutoBreadcrumb from "@/components/common/AutoBreadcrumb";
import ChangePassword from "@/pages/change-password/ChangePassword";
import NoteChangePassword from "@/pages/change-password/NoteChangePassword";

export default function UbahPasswordPage() {
  return (
    <div>
      <AutoBreadcrumb />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12">
          <ChangePassword />
        </div>
      </div>
    </div>
  );
}
