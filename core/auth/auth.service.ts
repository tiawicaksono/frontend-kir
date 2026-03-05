import api from "@/services/api";

export const loginRequest = (email: string, password: string) => {
  return api.post("/login", { email, password });
};

export const logoutRequest = () => {
  return api.post("/logout");
};

export const getCurrentUser = () => {
  return api.get("/user");
};
