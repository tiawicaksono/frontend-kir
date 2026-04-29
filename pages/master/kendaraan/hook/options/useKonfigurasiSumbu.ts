import { useEffect, useState, useRef } from "react";
import { getKonfigurasiSumbu } from "@/services/options.service";

export function useKonfigurasiSumbu(enabled: boolean) {
  const [konfigurasiSumbu, setKonfigurasiSumbu] = useState<any[]>([]);
  const [loadingKonfigurasiSumbu, setLoadingKonfigurasiSumbu] = useState(false);

  const fetchedRef = useRef(false);

  useEffect(() => {
    if (!enabled || fetchedRef.current) return;

    fetchedRef.current = true;

    const fetch = async () => {
      setLoadingKonfigurasiSumbu(true);
      try {
        const res = await getKonfigurasiSumbu();
        setKonfigurasiSumbu(res.data);
      } catch (err) {
        console.error("Konfigurasi Sumbu Error:", err);
      } finally {
        setLoadingKonfigurasiSumbu(false);
      }
    };

    fetch();
  }, [enabled]);

  return {
    konfigurasiSumbu,
    loadingKonfigurasiSumbu,
  };
}
