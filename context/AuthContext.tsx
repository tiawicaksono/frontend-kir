"use client";

import { createContext, useContext, useEffect, useState } from "react";
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
  const [user, setUser] = useState<User | null>(null);
  const [menus, setMenus] = useState<Menu[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const channel = new BroadcastChannel("auth");

    const init = async () => {
      try {
        const res = await api.get("/user");
        setUser(res.data);

        const m = await api.get("/menus/me");
        setMenus(m.data);

        document.cookie = `user_routes=${encodeURIComponent(
          JSON.stringify(extractRoutes(m.data)),
        )}; path=/`;
      } catch {
        setUser(null);
        setMenus([]);
      } finally {
        setLoading(false);
      }
    };

    init();

    channel.onmessage = (event) => {
      if (event.data === "LOGOUT") {
        setUser(null);
        setMenus([]);

        document.cookie =
          "user_routes=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

        window.location.href = "/signin";
      }

      if (event.data === "LOGIN") {
        window.location.href = "/dashboard";
      }
    };

    return () => {
      channel.close();
    };
  }, []);

  const login = async (email: string, password: string) => {
    await api.post("/login", { email, password });

    const res = await api.get("/user");
    setUser(res.data);

    const m = await api.get("/menus/me");
    setMenus(m.data);

    document.cookie = `user_routes=${encodeURIComponent(
      JSON.stringify(extractRoutes(m.data)),
    )}; path=/`;

    const channel = new BroadcastChannel("auth");
    channel.postMessage("LOGIN");
    channel.close();
  };

  const logout = async () => {
    try {
      await api.post("/logout");
    } catch {}

    setUser(null);
    setMenus([]);

    document.cookie =
      "user_routes=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

    const channel = new BroadcastChannel("auth");
    channel.postMessage("LOGOUT");
    channel.close();

    window.location.href = "/signin";
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
