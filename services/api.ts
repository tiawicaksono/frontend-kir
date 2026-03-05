import axios, { InternalAxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

const sanctum = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,
});

// ✅ CSRF Interceptor (transport concern only)
api.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  if (["post", "put", "patch", "delete"].includes(config.method || "")) {
    let token = Cookies.get("XSRF-TOKEN");

    if (!token) {
      await sanctum.get("/sanctum/csrf-cookie");
      token = Cookies.get("XSRF-TOKEN");
    }

    if (token) {
      config.headers.set("X-XSRF-TOKEN", token);
    }
  }

  return config;
});

// ✅ Response pass-through (NO redirect here)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  },
);

export default api;
