"use client";

import { useAuthGuard } from "./auth.guard";

export function AuthGuardProvider({ children }: { children: React.ReactNode }) {
  useAuthGuard();
  return <>{children}</>;
}
