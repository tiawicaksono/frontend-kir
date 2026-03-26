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

    initAuth();

    channel.onmessage = async (event) => {
      if (event.data === "LOGOUT") {
        setUser(null);
        setMenus([]);
        clearRoutesCookie();
        router.replace("/signin");
      }

      if (event.data === "LOGIN") {
        await initAuth();
        router.replace("/dashboard");
      }
    };

    return () => {
      channel.close();
    };
  }, []);

  const login = async (email: string, password: string) => {
    await loginRequest(email, password);

    await initAuth();

    broadcastLogin();

    router.replace("/dashboard");
  };

  const logout = async () => {
    try {
      await logoutRequest();
    } catch {}

    setUser(null);
    setMenus([]);

    clearRoutesCookie();

    broadcastLogout();

    router.replace("/signin");
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
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
