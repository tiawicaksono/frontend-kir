import { Menu } from "@/types/menu.type";

export const extractRoutes = (menus: Menu[]): string[] => {
  const routes: string[] = [];

  const traverse = (items: Menu[]) => {
    for (const item of items) {
      if (item.route) routes.push(item.route.replace(/\/+$/, ""));
      if (item.children?.length) traverse(item.children);
    }
  };

  traverse(menus);
  return routes;
};

export const setRoutesCookie = (routes: string[]) => {
  document.cookie = `user_routes=${encodeURIComponent(
    JSON.stringify(routes),
  )}; path=/`;
};

export const clearRoutesCookie = () => {
  document.cookie =
    "user_routes=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
};
