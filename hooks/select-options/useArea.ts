import { useEffect, useState, useRef } from "react";
import { getArea } from "@/services/options.service";

const mapOptions = (data: any[]) =>
  (data || []).map((item: any) => ({
    label: item.label || item.nama || item.name || String(item.id),
    value: Number(item.id ?? item.value),
  }));

export function useArea(enabled: boolean = true) {
  const [area, setArea] = useState<any[]>([]);
  const [loadingArea, setLoadingArea] = useState(false);

  const fetchedRef = useRef(false);

  useEffect(() => {
    if (!enabled) return;

    // optional: allow refetch when enabled changes from false → true
    if (fetchedRef.current) return;

    const fetch = async () => {
      setLoadingArea(true);

      try {
        const res = await getArea();

        setArea(mapOptions(res.data));
        fetchedRef.current = true;
      } finally {
        setLoadingArea(false);
      }
    };

    fetch();
  }, [enabled]);

  return {
    area,
    loadingArea,
  };
}
