import { useEffect, useState, useRef } from "react";
import { getBahanBakar } from "@/services/options.service";

export function useBahanBakar(enabled: boolean) {
  const [bahanBakar, setBahanBakar] = useState<any[]>([]);
  const [loadingBahanBakar, setLoadingBahanBakar] = useState(false);

  const fetchedRef = useRef(false);

  useEffect(() => {
    if (!enabled || fetchedRef.current) return;

    fetchedRef.current = true;

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
