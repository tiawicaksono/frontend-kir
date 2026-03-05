"use client";

import { createContext, useContext, useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import api from "@/services/api";
import { User } from "@/types/user.type";
import { Menu } from "@/types/menu.type";

type AuthContextType = {
  user: User | null;
  menus: Menu[];
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const extractRoutes = (menus: Menu[]): string[] => {
  const routes: string[] = [];

  const traverse = (items: Menu[]) => {
    for (const item of items) {
      if (item.route) routes.push(item.route.replace(/\/+$/, ""));
      if (item.children?.length) traverse(item.children);
    }
  };

  traverse(menus);
  return routes;
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [menus, setMenus] = useState<Menu[]>([]);
  const [loading, setLoading] = useState(true);

  const channelRef = useRef<BroadcastChannel | null>(null);

  const setRoutesCookie = (menus: Menu[]) => {
    document.cookie = `user_routes=${encodeURIComponent(
      JSON.stringify(extractRoutes(menus)),
    )}; path=/`;
  };

  const clearRoutesCookie = () => {
    document.cookie =
      "user_routes=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
  };

  const initAuth = async () => {
    try {
      const res = await api.get("/user");

      setUser(res.data.user);
      setMenus(res.data.menus);

      setRoutesCookie(res.data.menus);
    } catch {
      setUser(null);
      setMenus([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    channelRef.current = new BroadcastChannel("auth");

    initAuth();

    channelRef.current.onmessage = (event) => {
      if (event.data === "LOGOUT") {
        setUser(null);
        setMenus([]);
        clearRoutesCookie();
        router.replace("/signin");
      }

      if (event.data === "LOGIN") {
        router.replace("/dashboard");
      }
    };

    return () => {
      channelRef.current?.close();
    };
  }, []);

  const login = async (email: string, password: string) => {
    await api.post("/login", { email, password });

    await initAuth();

    channelRef.current?.postMessage("LOGIN");

    router.replace("/dashboard");
  };

  const logout = async () => {
    try {
      await api.post("/logout");
    } catch {}

    setUser(null);
    setMenus([]);

    clearRoutesCookie();

    channelRef.current?.postMessage("LOGOUT");

    router.replace("/signin");
  };

  return (
    <AuthContext.Provider value={{ user, menus, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
