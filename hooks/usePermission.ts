import { useAuth } from "@/context/AuthContext";
import { hasRouteAccess } from "@/utils/permission";
import { usePathname } from "next/navigation";

export const usePermission = () => {
  const { user } = useAuth();
  const pathname = usePathname();

  const canAccess = (path?: string) => {
    if (!user) return false;
    return hasRouteAccess(user.menus || [], path || pathname);
  };

  return { canAccess };
};

/**
 * Ini enak banget buat hide button sesuai permission.
 */
// const { canAccess } = usePermission();

// if (!canAccess("/loket/pembayaran")) {
//   return null;
// }