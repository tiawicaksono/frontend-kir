"use client";

import { useEffect, useState } from "react";
import { getApiIntegrations } from "@/services/api-integrations.service";
import ApiIntegrationGrid from "./ApiIntegrationGrid";
import { ApiIntegrations } from "@/types/api-integrations.type";

export default function HomeApiIntegration() {
  const [data, setData] = useState<ApiIntegrations[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const res = await getApiIntegrations();
    console.log("API RESPONSE:", res);
    setData(res);
  }

  return (
    <>
      <ApiIntegrationGrid data={data} />
    </>
  );
}
