"use client";

import { useAuth } from "@/context/AuthContext";
import SplashScreen from "@/components/common/SplashScreen";

export default function SplashController() {
  const { loading } = useAuth();

  // 🔥 Splash hanya saat first load
  return loading ? <SplashScreen show /> : null;
}
