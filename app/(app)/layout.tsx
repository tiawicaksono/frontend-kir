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
import SplashScreen from "@/components/common/SplashScreen";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/signin");
    }
  }, [loading, user, router]);

  // ⛔ Jangan render apa pun saat loading
  if (loading) {
    return <SplashScreen show />;
  }

  // ⛔ Jangan render kalau belum ada user
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
