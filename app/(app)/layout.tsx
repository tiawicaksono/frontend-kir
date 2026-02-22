"use client";

import "../globals.css";
import AppMenu from "@/layout/AppMenu";
import BackToTopButton from "@/components/common/BackToTopButton";
import SettingsButton from "@/components/common/SettingsButton";
import { useAuth } from "@/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import RouteTransition from "@/components/layout/RouteTransition";
import { hasRouteAccess } from "@/utils/permission";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.replace("/signin");
        return;
      }

      const publicRoutes = ["/dashboard", "/ubah-password"];

      if (!publicRoutes.includes(pathname)) {
        const allowed = hasRouteAccess(user.menus || [], pathname);

        if (!allowed) {
          router.replace("/forbidden");
        }
      }
    }
  }, [loading, user, pathname, router]);

  if (!user) return null;

  return (
    <>
      <BackToTopButton />
      <SettingsButton />
      <AppMenu>
        <RouteTransition>{children}</RouteTransition>
      </AppMenu>
    </>
  );
}
