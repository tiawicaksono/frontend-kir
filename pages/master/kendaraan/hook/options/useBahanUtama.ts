import { useEffect, useState } from "react";
import { getBahanUtama } from "@/services/options.service";

export function useBahanUtama() {
  const [bahanUtama, setBahanUtama] = useState<any[]>([]);

  const [loadingBahanUtama, setLoadingBahanUtama] = useState(false);

  useEffect(() => {
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
