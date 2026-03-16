"use client";

import { useEffect, useState } from "react";
import { getApiIntegrations } from "@/services/api-integrations.service";
import ApiIntegrationGrid from "./ApiIntegrationGrid";
import { ApiIntegrations } from "@/types/api-integrations.type";

export default function HomeApiIntegration() {
  const [data, setData] = useState<ApiIntegrations[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const res = await getApiIntegrations();
      setData(res);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <ApiIntegrationGrid data={data} loading={loading} />
    </>
  );
}
