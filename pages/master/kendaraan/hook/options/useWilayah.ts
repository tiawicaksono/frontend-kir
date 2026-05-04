import { useEffect, useState, useRef } from "react";
import {
  getProvinsi,
  getKota,
  getKecamatan,
  getKelurahan,
} from "@/services/options.service";

export function useWilayah(form: any, isInit: boolean) {
  const [provinsi, setProvinsi] = useState<any[]>([]);
  const [kota, setKota] = useState<any[]>([]);
  const [kecamatan, setKecamatan] = useState<any[]>([]);
  const [kelurahan, setKelurahan] = useState<any[]>([]);

  const [loadingProvinsi, setLoadingProvinsi] = useState(false);
  const [loadingKota, setLoadingKota] = useState(false);
  const [loadingKecamatan, setLoadingKecamatan] = useState(false);
  const [loadingKelurahan, setLoadingKelurahan] = useState(false);

  const fetched = useRef(false);

  // 🔥 race guards
  const lastFetchKota = useRef(0);
  const lastFetchKecamatan = useRef(0);
  const lastFetchKelurahan = useRef(0);

  // =========================
  // LOAD PROVINSI
  // =========================
  useEffect(() => {
    if (fetched.current) return;
    fetched.current = true;

    const fetch = async () => {
      setLoadingProvinsi(true);
      try {
        const res = await getProvinsi();
        setProvinsi(res.data);
      } finally {
        setLoadingProvinsi(false);
      }
    };

    fetch();
  }, []);

  // =========================
  // LOAD KOTA (PURE)
  // =========================
  const loadKota = async (id: number | string) => {
    if (!id) return;

    const fetchId = ++lastFetchKota.current;

    setLoadingKota(true);
    try {
      const res = await getKota(Number(id));

      if (fetchId !== lastFetchKota.current) return;

      setKota(res.data);
    } finally {
      setLoadingKota(false);
    }
  };

  // =========================
  // LOAD KECAMATAN (PURE)
  // =========================
  const loadKecamatan = async (id: number | string) => {
    if (!id) return;

    const fetchId = ++lastFetchKecamatan.current;

    setLoadingKecamatan(true);
    try {
      const res = await getKecamatan(Number(id));

      if (fetchId !== lastFetchKecamatan.current) return;

      setKecamatan(res.data);
    } finally {
      setLoadingKecamatan(false);
    }
  };

  // =========================
  // LOAD KELURAHAN (PURE)
  // =========================
  const loadKelurahan = async (id: number | string) => {
    if (!id) return;

    const fetchId = ++lastFetchKelurahan.current;

    setLoadingKelurahan(true);
    try {
      const res = await getKelurahan(Number(id));

      if (fetchId !== lastFetchKelurahan.current) return;

      setKelurahan(res.data);
    } finally {
      setLoadingKelurahan(false);
    }
  };

  // =========================
  // ON CHANGE PROVINSI
  // =========================
  const onChangeProvinsi = async (id: number | string) => {
    if (!id) return;

    if (!isInit) {
      form.setFieldsValue({
        kota_id: null,
        kecamatan_id: null,
        kelurahan_id: null,
      });

      setKota([]);
      setKecamatan([]);
      setKelurahan([]);
    }

    await loadKota(id);
  };

  // =========================
  // ON CHANGE KOTA
  // =========================
  const onChangeKota = async (id: number | string) => {
    if (!id) return;

    if (!isInit) {
      form.setFieldsValue({
        kecamatan_id: null,
        kelurahan_id: null,
      });

      setKecamatan([]);
      setKelurahan([]);
    }

    await loadKecamatan(id);
  };

  // =========================
  // ON CHANGE KECAMATAN
  // =========================
  const onChangeKecamatan = async (id: number | string) => {
    if (!id) return;

    if (!isInit) {
      form.setFieldsValue({
        kelurahan_id: null,
      });

      setKelurahan([]);
    }

    await loadKelurahan(id);
  };

  return {
    provinsi,
    kota,
    kecamatan,
    kelurahan,

    loadingProvinsi,
    loadingKota,
    loadingKecamatan,
    loadingKelurahan,

    onChangeProvinsi,
    onChangeKota,
    onChangeKecamatan,

    // 🔥 helper edit mode
    loadKota,
    loadKecamatan,
    loadKelurahan,

    // 🔥 optional setter
    setKota,
    setKecamatan,
    setKelurahan,
  };
}
