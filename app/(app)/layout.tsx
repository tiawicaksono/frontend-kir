"use client";

import AppMenu from "@/layout/AppMenu";
import BackToTopButton from "@/components/common/BackToTopButton";
import SettingsButton from "@/components/common/SettingsButton";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppMenu>
      <BackToTopButton />
      <SettingsButton />

      <div className="p-4 w-full transition-all duration-300">{children}</div>
    </AppMenu>
  );
}
