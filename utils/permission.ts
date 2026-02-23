import { Menu } from "@/types/menu";

/**
 * Normalisasi path
 */
const normalize = (url: string) => url.replace(/\/+$/, "");

/**
 * Flatten semua route termasuk children
 */
export const extractRoutes = (menus: Menu[]): string[] => {
  const routes: string[] = [];

  const traverse = (items: Menu[]) => {
    for (const item of items) {
      if (item.route) {
        routes.push(normalize(item.route));
      }

      if (item.children?.length) {
        traverse(item.children);
      }
    }
  };

  traverse(menus);

  return routes;
};

/**
 * Cek apakah user punya akses ke suatu path
 */
export const hasRouteAccess = (
  menus: Menu[],
  pathname: string
): boolean => {
  const routes = extractRoutes(menus);
  const current = normalize(pathname);

  return routes.some((route) => {
    return (
      current === route ||
      current.startsWith(route + "/")
    );
  });
};