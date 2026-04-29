import { useEffect, useState, useRef } from "react";
import { getKelasJalan } from "@/services/options.service";

export function useKelasJalan(enabled: boolean) {
  const [kelasJalan, setKelasJalan] = useState<any[]>([]);
  const [loadingKelasJalan, setLoadingKelasJalan] = useState(false);

  const fetchedRef = useRef(false);

  useEffect(() => {
    if (!enabled || fetchedRef.current) return;

    fetchedRef.current = true;

    const fetch = async () => {
      setLoadingKelasJalan(true);
      try {
        const res = await getKelasJalan();
        setKelasJalan(res.data);
      } finally {
        setLoadingKelasJalan(false);
      }
    };

    fetch();
  }, [enabled]);

  return {
    kelasJalan,
    loadingKelasJalan,
  };
}
