export interface MenuItem {
  route: string | null;
  children?: MenuItem[];
}

/**
 * Flatten semua route termasuk children
 */
export const extractRoutes = (menus: MenuItem[]): string[] => {
  return menus.flatMap((menu) => {
    const current = menu.route ? [normalize(menu.route)] : [];
    const children = menu.children
      ? extractRoutes(menu.children)
      : [];
    return [...current, ...children];
  });
};

const normalize = (url: string) => url.replace(/\/$/, "");

/**
 * Cek apakah user punya akses ke suatu path
 */
export const hasRouteAccess = (
  menus: MenuItem[],
  pathname: string
): boolean => {
  const routes = extractRoutes(menus);
  const current = normalize(pathname);

  return routes.some((route) =>
    current === route || current.startsWith(route + "/")
  );
};