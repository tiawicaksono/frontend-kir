"use client";

import { createContext, useContext, useEffect, useState } from "react";
import api from "@/services/api";
import { User } from "@/types/user";
import { extractRoutes } from "@/utils/permission";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<string>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

// 🔥 BroadcastChannel instance
let authChannel: BroadcastChannel | null = null;

if (typeof window !== "undefined") {
  authChannel = new BroadcastChannel("auth_channel");
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // ===============================
  // FETCH USER
  // ===============================
  const fetchUser = async (skipLoading = false) => {
    if (!skipLoading) setLoading(true);

    try {
      const res = await api.get("/api/user");
      const userData = res.data;

      const menuRes = await api.get("/api/menus/me");
      userData.menus = menuRes.data;

      setUser(userData);
      return userData;
    } catch {
      setUser(null);
      return null;
    } finally {
      if (!skipLoading) setLoading(false);
    }
  };

  // ===============================
  // INITIAL LOAD + LISTENER
  // ===============================
  useEffect(() => {
    fetchUser();

    if (!authChannel) return;

    authChannel.onmessage = async (event) => {
      const { type } = event.data;

      if (type === "LOGOUT") {
        setUser(null);
        window.location.href = "/signin";
      }

      if (type === "LOGIN") {
        await fetchUser(true);
        window.location.reload(); // biar middleware sinkron
      }
    };

    return () => {
      authChannel?.close();
    };
  }, []);

  // ===============================
  // LOGIN
  // ===============================
  const login = async (email: string, password: string): Promise<string> => {
    await api.get("/sanctum/csrf-cookie");
    await api.post("/api/login", { email, password });

    const userData = await fetchUser();

    if (!userData) throw new Error("Failed to fetch user");

    const routes = extractRoutes(userData.menus);

    const expiry = Date.now() + 120 * 60 * 1000;

    document.cookie = `auth_token=true; path=/`;
    document.cookie = `auth_expiry=${expiry}; path=/`;
    document.cookie = `user_routes=${encodeURIComponent(
      JSON.stringify(routes),
    )}; path=/`;

    // 🔥 Broadcast ke tab lain
    authChannel?.postMessage({ type: "LOGIN" });

    await new Promise((resolve) => setTimeout(resolve, 100));
    if (userData.roleId === 3) return "/penguji";
    return "/dashboard";
  };

  // ===============================
  // LOGOUT
  // ===============================
  const logout = async () => {
    try {
      await api.get("/sanctum/csrf-cookie");
      await api.post("/api/logout");
    } catch (error) {
      console.error("Logout error:", error);
    }

    document.cookie = "auth_token=; path=/; max-age=0";
    document.cookie = "auth_expiry=; path=/; max-age=0";
    document.cookie = "user_routes=; path=/; max-age=0";

    authChannel?.postMessage({ type: "LOGOUT" });

    window.location.href = "/signin";
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
