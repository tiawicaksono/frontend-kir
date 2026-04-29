import { useEffect, useState, useRef } from "react";
import { getBahanUtama } from "@/services/options.service";

export function useBahanUtama() {
  const [bahanUtama, setBahanUtama] = useState<any[]>([]);
  const [loadingBahanUtama, setLoadingBahanUtama] = useState(false);

  const fetchedRef = useRef(false);

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;

    const fetch = async () => {
      setLoadingBahanUtama(true);
      try {
        const res = await getBahanUtama();
        setBahanUtama(res.data);
      } finally {
        setLoadingBahanUtama(false);
      }
    };

    fetch();
  }, []);

  return {
    bahanUtama,
    loadingBahanUtama,
  };
}
