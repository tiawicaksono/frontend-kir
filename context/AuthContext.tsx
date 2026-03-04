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
const authChannel = new BroadcastChannel("auth");
const normalize = (url: string) => url.replace(/\/+$/, "");
const setRouteCookie = (menus: Menu[]) => {
  const routes = extractRoutes(menus);
  document.cookie = `user_routes=${encodeURIComponent(
    JSON.stringify(extractRoutes(menus)),
  )}; path=/`;
};

export const extractRoutes = (menus: Menu[]): string[] => {
  const routes: string[] = [];

  const traverse = (items: Menu[]) => {
    for (const item of items) {
      if (item.route) {
        routes.push(normalize(item.route));
      }

      if (item.children?.length) {
        traverse(item.children);
      }
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
    const init = async () => {
      try {
        const res = await api.get("/user");
        setUser(res.data);

        const m = await api.get("/menus/me");
        setMenus(m.data);
        setRouteCookie(m.data);
      } catch {
        setUser(null);
        setMenus([]);
      } finally {
        setLoading(false);
      }
    };

    init();

    authChannel.onmessage = (event) => {
      const { type } = event.data;

      if (type === "LOGOUT") {
        setUser(null);
        setMenus([]);
        window.location.href = "/signin";
      }

      if (type === "LOGIN") {
        window.location.href = "/dashboard";
      }
    };

    return () => {
      authChannel.close();
    };
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    await api.post("/login", { email, password });

    try {
      const res = await api.get("/user");
      setUser(res.data);

      const m = await api.get("/menus/me");
      setMenus(m.data);
      setRouteCookie(m.data);
    } catch {
      setUser(null);
      setMenus([]);
    }

    authChannel.postMessage({ type: "LOGIN" });
  };

  const logout = async () => {
    try {
      await api.post("/logout");
    } catch {}

    setUser(null);
    setMenus([]);

    authChannel.postMessage({ type: "LOGOUT" });

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
