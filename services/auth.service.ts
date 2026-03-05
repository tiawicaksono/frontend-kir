import { User } from "@/types/user.type";
import api from "@/services/api";

export async function getUser(): Promise<User> {
  const res = await api.get<User>("/user");
  return res.data;
}

export async function login(email: string, password: string) {
  await api.get("/sanctum/csrf-cookie");

  const res = await api.post("/login", {
    email,
    password,
  });

  return res.data;
}

export async function logout() {
  await api.post("/logout");
}
