"use client";

import { Outfit } from "next/font/google";
import "../globals.css";
import AppMenu from "@/layout/AppMenu";
import BackToTopButton from "@/components/common/BackToTopButton";
import SettingsButton from "@/components/common/SettingsButton";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import FullScreenLoader from "@/components/common/FullScreenLoader";
import RouteTransition from "@/components/layout/RouteTransition";

const outfit = Outfit({ subsets: ["latin"] });

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/signin");
    }
  }, [loading, user, router]);

  if (loading) return <FullScreenLoader />;

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
