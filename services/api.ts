import axios from "axios";
import Cookies from "js-cookie";
import type { InternalAxiosRequestConfig } from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // http://localhost:8000/api
  withCredentials: true,
});

// 🔥 axios instance khusus TANPA /api
const sanctum = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL, // http://localhost:8000
  withCredentials: true,
});

// Interceptor type-safe untuk CSRF
api.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  if (["post", "put", "delete", "patch"].includes(config.method || "")) {
    let token = Cookies.get("XSRF-TOKEN");

    if (!token) {
      await sanctum.get("/sanctum/csrf-cookie");
      token = Cookies.get("XSRF-TOKEN");
    }

    if (token) {
      // pastikan config.headers adalah AxiosHeaders
      if (!config.headers) {
        config.headers = new axios.AxiosHeaders();
      }

      config.headers.set("X-XSRF-TOKEN", token); // ✅ type-safe
    }
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const currentPath = window.location.pathname;
    const requestUrl = error.config?.url || "";

    // Jangan intercept request auth/me
    const isAuthRequest =
      requestUrl.includes("/user") || requestUrl.includes("/menus/me");

    if (status === 401 && !isAuthRequest) {
      if (currentPath !== "/signin") {
        window.location.href = "/signin";
      }
    }

    if (status === 403) {
      // Jangan redirect kalau sudah di forbidden
      if (currentPath !== "/forbidden") {
        window.location.href = "/forbidden";
      }
    }

    return Promise.reject(error);
  },
);

export default api;
