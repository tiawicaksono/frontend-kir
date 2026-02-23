"use client";

import { createContext, useContext, useEffect, useState } from "react";
import api from "@/services/api";
import { User } from "@/types/user";
import { extractRoutes } from "@/utils/permission";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<string>; // ⬅ return route
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const syncLogout = (event: StorageEvent) => {
      if (event.key === "logout_event") {
        setUser(null);
        window.location.href = "/signin";
      }

      if (event.key === "login_event") {
        fetchUser(); // 🔥 refetch user
        window.location.reload(); // supaya middleware + UI sinkron
      }
    };

    window.addEventListener("storage", syncLogout);

    return () => {
      window.removeEventListener("storage", syncLogout);
    };
  }, []);

  // fetch user dari session cookie Laravel
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
    } finally {
      if (!skipLoading) setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const login = async (email: string, password: string): Promise<string> => {
    await api.get("/sanctum/csrf-cookie");
    await api.post("/api/login", { email, password });

    const res = await api.get("/api/user");
    const menuRes = await api.get("/api/menus/me");

    const userData = res.data;
    userData.menus = menuRes.data;

    setUser(userData);

    const routes = extractRoutes(userData.menus);

    const expiry = Date.now() + 120 * 60 * 1000;

    document.cookie = `auth_token=true; path=/`;
    document.cookie = `auth_expiry=${expiry}; path=/`;
    document.cookie = `user_routes=${encodeURIComponent(
      JSON.stringify(routes),
    )}; path=/`;

    // 🔥 Broadcast login ke tab lain
    localStorage.setItem("login_event", Date.now().toString());

    if (userData.roleId === 3) return "/penguji";
    return "/dashboard";
  };

  const logout = async () => {
    try {
      await api.get("/sanctum/csrf-cookie");
      await api.post("/api/logout"); // Sanctum logout
    } catch (error) {
      console.error("Logout error:", error);
    }

    // Hapus semua cookie
    document.cookie = "auth_token=; path=/; max-age=0";
    document.cookie = "auth_expiry=; path=/; max-age=0";
    document.cookie = "user_routes=; path=/; max-age=0";

    // 🔥 Broadcast logout ke tab lain
    localStorage.setItem("logout_event", Date.now().toString());

    // Redirect ke signin
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
