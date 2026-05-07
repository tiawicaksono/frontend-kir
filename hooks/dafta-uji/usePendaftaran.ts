import { useState } from "react";
import {
  searchKendaraan,
  createPendaftaran,
} from "@/services/pendaftaran.service";

type StateType = "idle" | "found" | "not_found" | "error";

type SourceType = "local" | "kementrian" | "none";

export function usePendaftaran() {
  const [state, setState] = useState<StateType>("idle");
  const [source, setSource] = useState<SourceType>("none");
  const [kendaraan, setKendaraan] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // 🔎 SEARCH
  const search = async (q: string, status_penerbitan_id: number) => {
    if (!q || !status_penerbitan_id) return;

    setLoading(true);
    setState("idle");

    try {
      const res = await searchKendaraan(q, status_penerbitan_id);

      setSource(res.source || "none");

      if (!res.found) {
        setState("not_found");
        setKendaraan(null);
        return;
      }

      setKendaraan(res.data);
      setState("found");
    } catch (e) {
      setState("error");
      setKendaraan(null);
    } finally {
      setLoading(false);
    }
  };

  // 🧾 SUBMIT
  const submit = async (form: any) => {
    if (!form.status_penerbitan_id) {
      throw new Error("Status penerbitan wajib dipilih");
    }

    return createPendaftaran(form);
  };

  // 🔄 RESET (dipanggil saat status berubah)
  const reset = () => {
    setState("idle");
    setKendaraan(null);
    setSource("none");
  };

  return {
    state,
    source,
    kendaraan,
    loading,
    search,
    submit,
    reset,
  };
}
