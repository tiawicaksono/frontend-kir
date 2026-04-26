import { useEffect, useState } from "react";
import { getBahanBakar } from "@/services/options.service";

export function useBahanBakar(enabled: boolean) {
  const [bahanBakar, setBahanBakar] = useState<any[]>([]);
  const [loadingBahanBakar, setLoadingBahanBakar] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    const fetch = async () => {
      setLoadingBahanBakar(true);
      try {
        const res = await getBahanBakar();
        setBahanBakar(res.data);
      } finally {
        setLoadingBahanBakar(false);
      }
    };
    fetch();
  }, [enabled]);

  return {
    bahanBakar,
    loadingBahanBakar,
  };
}
