import { useAuth } from "./auth.context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const useAuthGuard = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    const path = window.location.pathname;
    const AUTH_PAGES = ["/signin", "/signup", "/reset-password"];

    if (AUTH_PAGES.includes(path)) return;

    if (user === null) {
      const current = window.location.pathname + window.location.search;

      router.replace(`/signin?redirect=${encodeURIComponent(current)}`);
    }
  }, [user, loading]);
};
