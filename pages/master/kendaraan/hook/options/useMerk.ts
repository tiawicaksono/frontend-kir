import { useEffect, useState, useRef } from "react";
import {
  getMerk,
  getTipeVarianMerk,
  getVarianMerk,
} from "@/services/options.service";

export function useMerk(form: any, isInit: boolean) {
  const [merk, setMerk] = useState<any[]>([]);
  const [varianMerk, setVarianMerk] = useState<any[]>([]);
  const [tipeVarianMerk, setTipeVarianMerk] = useState<any[]>([]);

  const [loadingMerk, setLoadingMerk] = useState(false);
  const [loadingVarianMerk, setLoadingVarianMerk] = useState(false);
  const [loadingTipeVarianMerk, setLoadingTipeVarianMerk] = useState(false);

  const fetchedMerk = useRef(false);

  // 🔥 race condition guard
  const lastFetchVarianId = useRef(0);
  const lastFetchTipeId = useRef(0);

  // =========================
  // LOAD MASTER MERK
  // =========================
  useEffect(() => {
    if (fetchedMerk.current) return;
    fetchedMerk.current = true;

    const fetch = async () => {
      setLoadingMerk(true);
      try {
        const res = await getMerk();
        setMerk(res.data);
      } finally {
        setLoadingMerk(false);
      }
    };

    fetch();
  }, []);

  // =========================
  // LOAD VARIAN (PURE FUNCTION)
  // =========================
  const loadVarianMerk = async (id: number | string) => {
    if (!id) return;

    const fetchId = ++lastFetchVarianId.current;

    setLoadingVarianMerk(true);
    try {
      const res = await getVarianMerk(Number(id));

      if (fetchId !== lastFetchVarianId.current) return;

      setVarianMerk(res.data);
    } finally {
      setLoadingVarianMerk(false);
    }
  };

  // =========================
  // LOAD TIPE VARIAN (PURE FUNCTION)
  // =========================
  const loadTipeVarianMerk = async (id: number | string) => {
    if (!id) return;

    const fetchId = ++lastFetchTipeId.current;

    setLoadingTipeVarianMerk(true);
    try {
      const res = await getTipeVarianMerk(Number(id));

      if (fetchId !== lastFetchTipeId.current) return;

      const data = res.data || [];
      setTipeVarianMerk(data);

      // 🔥 AUTO SELECT jika hanya 1
      if (data.length === 1) {
        form.setFieldsValue({
          tipe_varian_merk_id: Number(data[0].id ?? data[0].value),
        });
      }
    } finally {
      setLoadingTipeVarianMerk(false);
    }
  };

  // =========================
  // ON CHANGE MERK
  // =========================
  const onChangeMerk = async (id: number | string) => {
    if (!id) return;

    if (!isInit) {
      form.setFieldsValue({
        varian_merk_id: null,
        tipe_varian_merk_id: null,
      });

      setVarianMerk([]);
      setTipeVarianMerk([]);
    }

    await loadVarianMerk(id);
  };

  // =========================
  // ON CHANGE VARIAN
  // =========================
  const onChangeVarianMerk = async (id: number | string) => {
    if (!id) return;

    if (!isInit) {
      form.setFieldsValue({
        tipe_varian_merk_id: null,
      });

      setTipeVarianMerk([]);
    }

    await loadTipeVarianMerk(id);
  };

  return {
    merk,
    varianMerk,
    tipeVarianMerk,

    loadingMerk,
    loadingVarianMerk,
    loadingTipeVarianMerk,

    onChangeMerk,
    onChangeVarianMerk,

    // 🔥 helper untuk edit mode
    loadVarianMerk,
    loadTipeVarianMerk,

    // 🔥 optional setter
    setVarianMerk,
    setTipeVarianMerk,
  };
}
