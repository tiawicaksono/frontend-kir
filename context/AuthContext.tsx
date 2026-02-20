"use client";

import { createContext, useContext, useEffect, useState } from "react";
import api from "@/services/api";

type User = { id: number; name: string; email: string };
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
      setUser(res.data);
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
    await fetchUser();
  };

  const logout = async () => {
    try {
      await api.post("/api/logout");
    } catch (error) {
      console.log("Logout 401 ignored");
    } finally {
      localStorage.removeItem("token");
      setUser(null);
    }
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
