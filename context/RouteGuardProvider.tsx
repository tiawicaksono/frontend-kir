"use client";
import { useRouteGuard } from "@/context/useRouteGuard";

export function RouteGuardProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useRouteGuard();
  return <>{children}</>;
}
