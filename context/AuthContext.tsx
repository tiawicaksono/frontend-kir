"use client";

import { createContext, useContext, useEffect, useState } from "react";
import api from "@/services/api";
import { User } from "@/types/user.type";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<string>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // ===============================
  // INITIAL BOOT
  // ===============================
  useEffect(() => {
    const init = async () => {
      try {
        const res = await api.get("/user");
        setUser(res.data);
      } catch (err: any) {
        if (err.response?.status === 401) {
          localStorage.setItem("auth_event", `logout_${Date.now()}`);
        }
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    init();

    // 🔥 Crosstab sync
    const syncAuth = (event: StorageEvent) => {
      if (event.key !== "auth_event") return;

      if (event.newValue === "logout") {
        setUser(null);
        window.location.href = "/signin";
      }

      if (event.newValue === "login") {
        window.location.href = "/dashboard";
      }
    };

    window.addEventListener("storage", syncAuth);
    return () => window.removeEventListener("storage", syncAuth);
  }, []);

  // ===============================
  // LOGIN
  // ===============================
  const login = async (email: string, password: string): Promise<string> => {
    await api.post("/login", { email, password });

    document.cookie = "next_auth=1; path=/";

    try {
      const res = await api.get("/user");
      setUser(res.data);
    } catch {
      setUser(null);
    }

    // 🔥 trigger semua tab
    localStorage.setItem("auth_event", "login");

    return "/dashboard";
  };

  // ===============================
  // LOGOUT
  // ===============================
  const logout = async () => {
    try {
      await api.post("/logout");
    } catch {}

    document.cookie = "next_auth=; path=/; max-age=0";
    setUser(null);

    // crosstab only signal
    localStorage.setItem("auth_event", "logout");

    // redirect single source
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
