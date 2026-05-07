import { useEffect, useState, useRef } from "react";
import {
  getJenisKendaraan,
  getSubJenisKendaraan,
} from "@/services/options.service";

export function useJenisKendaraan(form: any, isInit: boolean) {
  const [jenisKendaraan, setJenisKendaraan] = useState<any[]>([]);
  const [subJenisKendaraan, setSubJenisKendaraan] = useState<any[]>([]);

  const [loadingJenisKendaraan, setLoadingJenisKendaraan] = useState(false);
  const [loadingSubJenisKendaraan, setLoadingSubJenisKendaraan] =
    useState(false);

  const fetchedJenis = useRef(false);

  // 🔥 race condition guard
  const lastFetchId = useRef(0);

  // =========================
  // LOAD MASTER JENIS
  // =========================
  useEffect(() => {
    if (fetchedJenis.current) return;
    fetchedJenis.current = true;

    const fetch = async () => {
      setLoadingJenisKendaraan(true);
      try {
        const res = await getJenisKendaraan();
        setJenisKendaraan(res.data);
      } catch (err) {
        console.error("getJenisKendaraan error:", err);
      } finally {
        setLoadingJenisKendaraan(false);
      }
    };

    fetch();
  }, []);

  // =========================
  // LOAD SUB JENIS (PURE)
  // =========================
  const loadSubJenis = async (id: number | string) => {
    if (!id) return;

    const fetchId = ++lastFetchId.current;

    setLoadingSubJenisKendaraan(true);
    try {
      const res = await getSubJenisKendaraan(Number(id));

      if (fetchId !== lastFetchId.current) return;

      setSubJenisKendaraan(res.data);
    } catch (err) {
      console.error("getSubJenisKendaraan error:", err);
    } finally {
      setLoadingSubJenisKendaraan(false);
    }
  };

  // =========================
  // ON CHANGE
  // =========================
  const onChangeJenisKendaraan = async (id: number | string) => {
    if (!id) return;

    if (!isInit) {
      form.setFieldsValue({
        sub_jenis_kendaraan_id: null,
      });

      setSubJenisKendaraan([]);
    }

    await loadSubJenis(id);
  };

  return {
    jenisKendaraan,
    subJenisKendaraan,

    loadingJenisKendaraan,
    loadingSubJenisKendaraan,

    onChangeJenisKendaraan,

    // 🔥 helper edit mode
    loadSubJenis,

    // 🔥 optional setter
    setSubJenisKendaraan,
  };
}
