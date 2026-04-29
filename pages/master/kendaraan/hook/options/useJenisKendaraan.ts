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
  // LOAD SUB JENIS (FORCE - UNTUK EDIT)
  // =========================
  const loadSubJenis = async (id: number | string) => {
    if (!id) return;

    const numId = Number(id);

    setLoadingSubJenisKendaraan(true);
    try {
      const res = await getSubJenisKendaraan(numId);
      setSubJenisKendaraan(res.data);
    } catch (err) {
      console.error("getSubJenisKendaraan error:", err);
    } finally {
      setLoadingSubJenisKendaraan(false);
    }
  };

  // =========================
  // ON CHANGE (USER ACTION)
  // =========================
  const onChangeJenisKendaraan = async (id: number | string) => {
    if (!id) return;

    // ❗ saat init (edit), jangan reset field
    if (!isInit) {
      form.setFieldsValue({
        sub_jenis_kendaraan_id: null,
      });
    }

    setSubJenisKendaraan([]);

    await loadSubJenis(id);
  };

  return {
    jenisKendaraan,
    subJenisKendaraan,

    loadingJenisKendaraan,
    loadingSubJenisKendaraan,

    onChangeJenisKendaraan,

    // 🔥 dipakai di edit mode
    loadSubJenis,

    // 🔥 dipakai di useKendaraanForm
    setSubJenisKendaraan,
  };
}
