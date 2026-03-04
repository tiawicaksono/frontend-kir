"use client";

import { createContext, useContext, useEffect, useState } from "react";
import api from "@/services/api";
import { User } from "@/types/user.type";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

// BroadcastChannel
const authChannel = new BroadcastChannel("auth");

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // ============================
  // INITIAL BOOT (session source)
  // ============================
  useEffect(() => {
    const init = async () => {
      try {
        const res = await api.get("/user");
        setUser(res.data);
      } catch (err: any) {
        if (err.response?.status === 401) {
          setUser(null);
        }
      } finally {
        setLoading(false);
      }
    };

    init();

    // Crosstab listener
    authChannel.onmessage = (event) => {
      const { type } = event.data;

      if (type === "LOGOUT") {
        setUser(null);
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

  // ============================
  // LOGIN
  // ============================
  const login = async (email: string, password: string): Promise<void> => {
    await api.post("/login", { email, password });

    try {
      const res = await api.get("/user");
      setUser(res.data);
    } catch {
      setUser(null);
    }

    // broadcast
    authChannel.postMessage({ type: "LOGIN" });
  };

  // ============================
  // LOGOUT
  // ============================
  const logout = async () => {
    try {
      await api.post("/logout");
    } catch {}

    setUser(null);

    // broadcast
    authChannel.postMessage({ type: "LOGOUT" });

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
