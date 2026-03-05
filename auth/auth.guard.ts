import { useAuth } from "./auth.context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const useAuthGuard = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/signin");
    }
  }, [user, loading]);
};
