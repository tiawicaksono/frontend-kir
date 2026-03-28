"use client";

import ChangePassword from "@/pages/change-password/ChangePassword";
import NoteChangePassword from "@/pages/change-password/NoteChangePassword";

export default function UbahPasswordPage() {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12 xl:col-span-7">
        <ChangePassword />
      </div>
      {/* <div className="col-span-12 xl:col-span-5">
        <NoteChangePassword />
      </div> */}
    </div>
  );
}
