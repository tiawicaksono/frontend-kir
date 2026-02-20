import { Menu } from "@/types/menu";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getMenus(): Promise<Menu[]> {
  try {
    // Ambil CSRF cookie dulu
    await fetch(`${API_URL}/sanctum/csrf-cookie`, {
      credentials: "include",
      cache: "no-store",
    });

    // Ambil menus dengan cookie
    const res = await fetch(`${API_URL}/api/menus/me`, {
      credentials: "include", // ✅ wajib biar laravel_session + XSRF-TOKEN dikirim
      cache: "no-store",
      headers: {
        "Accept": "application/json",
      },
    });

    if (!res.ok) return [];

    const json = await res.json();
    return Array.isArray(json) ? json : [];
  } catch (err) {
    console.error(err);
    return [];
  }
}
