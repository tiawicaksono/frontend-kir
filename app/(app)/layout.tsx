"use client";

import "../globals.css";
import AppMenu from "@/layout/AppMenu";
import BackToTopButton from "@/components/common/BackToTopButton";
import SettingsButton from "@/components/common/SettingsButton";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BackToTopButton />
      <SettingsButton />
      <AppMenu>{children}</AppMenu>
    </>
  );
}
