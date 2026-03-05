import { useAuth } from "@/auth/auth.context";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

const normalize = (url: string) => url.split("?")[0].replace(/\/+$/, "");

export function useRouteGuard() {
  const { menus, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const clean = normalize(pathname);

  useEffect(() => {
    if (loading) return;

    // allow signin & forbidden page
    if (clean === "/signin" || clean === "/forbidden") return;

    const allowed = menus.flatMap((m) => {
      const routes: string[] = [];
      const walk = (item: any) => {
        if (item.route) routes.push(normalize(item.route));
        if (item.children?.length) item.children.forEach(walk);
      };
      walk(m);
      return routes;
    });

    if (allowed.length > 0 && !allowed.includes(clean)) {
      router.replace("/forbidden");
    }
  }, [loading, clean, menus]);
}
