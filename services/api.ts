import axios from "axios";
import Cookies from "js-cookie";
import type { InternalAxiosRequestConfig } from "axios";


const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

// Interceptor type-safe untuk CSRF
api.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  if (["post", "put", "delete", "patch"].includes(config.method || "")) {
    let token = Cookies.get("XSRF-TOKEN");

    if (!token) {
      await api.get("/sanctum/csrf-cookie");
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


// Auto redirect kalau 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
