"use client";

import { useAuth } from "@/core/auth/auth.context";
import SplashScreen from "@/components/common/SplashScreen";

export default function SplashController() {
  const { loading } = useAuth();

  // 🔥 Splash hanya saat first load
  return loading ? <SplashScreen show /> : null;
}
