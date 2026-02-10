"use client";

import { useLayout } from "@/context/LayoutContext";
import Sidebar from "@/components/sidebar/Sidebar";
import TopMenu from "@/components/topmenu/TopMenu";
import AppHeader from "@/layout/AppHeader";
import ThemeCustomizer from "@/layout/ThemeCustomizer";

export default function AppMenu({ children }: { children: React.ReactNode }) {
  const { menuLayout } = useLayout();

  return (
    <div className="min-h-screen flex">
      {menuLayout === "sidebar" && <Sidebar />}

      <div className="flex flex-1 flex-col">
        <AppHeader />
        {menuLayout === "top" && <TopMenu />}
        <main className="flex-1 p-4">{children}</main>
      </div>

      <ThemeCustomizer />
    </div>
  );
}
