"use client";

import { createContext, useContext, useEffect, useState } from "react";
import api from "@/services/api";
import { User } from "@/types/user";
import { extractRoutes } from "@/utils/permission";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // fetch user dari session cookie Laravel
  const fetchUser = async () => {
    try {
      const res = await api.get("/api/user");
      const userData = res.data;

      // fetch menus
      const menuRes = await api.get("/api/menus/me");
      userData.menus = menuRes.data;
      setUser(userData);
      return userData;
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const login = async (email: string, password: string) => {
    await api.get("/sanctum/csrf-cookie");
    await api.post("/api/login", { email, password });

    const userData = await fetchUser();

    const routes = extractRoutes(userData.menus);

    const expiry = Date.now() + 120 * 60 * 1000;

    // ✅ Set cookies
    document.cookie = `auth_token=true; path=/`;
    document.cookie = `auth_expiry=${expiry}; path=/`;
    document.cookie = `user_routes=${encodeURIComponent(
      JSON.stringify(routes),
    )}; path=/`;
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
