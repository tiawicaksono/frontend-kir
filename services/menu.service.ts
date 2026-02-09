import { Menu } from "@/types/menu";

const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function getMenus(): Promise<Menu[]> {
  try {
    const res = await fetch(`${API_URL}/api/menus/me`, {
      cache: "no-store",
    });

    if (!res.ok) return [];

    const json = await res.json();
    return Array.isArray(json) ? json : [];
  } catch {
    return [];
  }
}