"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { User } from "@/types/user.type";
import { Menu } from "@/types/menu.type";

import { loginRequest, logoutRequest, getCurrentUser } from "./auth.service";

import {
  broadcastLogin,
  broadcastLogout,
  getAuthChannel,
} from "./auth.broadcast";

import {
  extractRoutes,
  setRoutesCookie,
  clearRoutesCookie,
} from "./permission.service";
import { useAutoLogout } from "./use-auto-logout";

type AuthContextType = {
  user: User | null;
  menus: Menu[];
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [menus, setMenus] = useState<Menu[]>([]);
  const [loading, setLoading] = useState(true);

  const initAuth = async () => {
    try {
      const res = await getCurrentUser();
      const data = res.data;
      setUser({
        id: data.id,
        name: data.name,
        email: data.email,
      });
      setMenus(res.data.menus);

      const routes = extractRoutes(res.data.menus);
      setRoutesCookie(routes);
    } catch {
      setUser(null);
      setMenus([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const channel = getAuthChannel();
    const AUTH_PAGES = ["/signin", "/signup", "/reset-password"];

    initAuth();

    channel.onmessage = async (event) => {
      if (event.data === "LOGOUT") {
        setUser(null);
        setMenus([]);
        clearRoutesCookie();
      }

      if (event.data === "LOGIN") {
        await initAuth();

        if (typeof window !== "undefined") {
          const currentPath = window.location.pathname;
          const searchParams = new URLSearchParams(window.location.search);
          const redirect = searchParams.get("redirect");

          if (AUTH_PAGES.includes(currentPath)) {
            if (redirect && redirect.startsWith("/")) {
              router.replace(redirect);
            } else {
              router.replace("/dashboard");
            }
          }
        }
      }
    };

    return () => {
      channel.close();
    };
  }, [router]);

  const login = async (email: string, password: string) => {
    await loginRequest(email, password);
    await initAuth();
    broadcastLogin();
  };

  const logout = async () => {
    try {
      await logoutRequest();
    } catch {}

    const currentPath =
      typeof window !== "undefined" ? window.location.pathname : "/";
    const currentUrl =
      typeof window !== "undefined"
        ? window.location.pathname + window.location.search
        : "/";
    const AUTH_PAGES = ["/signin", "/signup", "/reset-password"];

    setUser(null);
    setMenus([]);
    clearRoutesCookie();

    broadcastLogout();

    if (AUTH_PAGES.includes(currentPath)) {
      router.replace("/signin");
    } else {
      router.replace(`/signin?redirect=${encodeURIComponent(currentUrl)}`);
    }
  };
  useAutoLogout(logout);

  return (
    <AuthContext.Provider value={{ user, menus, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    // During SSR, return a mock context to prevent errors
    if (typeof window === "undefined") {
      return {
        user: null,
        menus: [],
        loading: true,
        login: async () => {},
        logout: async () => {},
      };
    }
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
};
