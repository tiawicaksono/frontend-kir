"use client";

import { useLayout } from "@/context/LayoutContext";
import SidebarMenu from "@/components/menu/sidebar-menu/SidebarMenu";
import TopMenu from "@/components/menu/top-menu/TopMenu";
import AppHeader from "@/layout/AppHeader";
import ThemeCustomizer from "@/layout/ThemeCustomizer";

export default function AppMenu({ children }: { children: React.ReactNode }) {
  const { menuLayout } = useLayout();

  return (
    <div className="h-screen flex overflow-hidden">
      {menuLayout === "sidebar" && <SidebarMenu />}

      <div className="flex flex-1 flex-col">
        <AppHeader />
        {menuLayout === "top" && <TopMenu />}

        {/* CONTENT YANG SCROLL */}
        <main id="main-scroll" className="flex-1 overflow-y-auto p-4">
          {children}
        </main>
      </div>

      <ThemeCustomizer />
    </div>
  );
}
