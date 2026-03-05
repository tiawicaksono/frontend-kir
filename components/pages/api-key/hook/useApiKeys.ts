import { useEffect, useState } from "react";
import { getApiKey } from "@/services/api-keys.service";
import { ApiKeys } from "@/types/api-keys.type";
import { useShowAlert } from "@/core/alert/alert.hook";

export function useApiKeys() {
  const [apiKeys, setApiKeys] = useState<ApiKeys[]>([]);
  const [loading, setLoading] = useState(true);
  const { showErrorAlert } = useShowAlert();

  const fetch = async () => {
    try {
      setLoading(true);
      const data = await getApiKey();
      setApiKeys(data);
    } catch (err) {
      showErrorAlert(err, "Gagal memuat data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return { apiKeys, setApiKeys, loading, refetch: fetch };
}
