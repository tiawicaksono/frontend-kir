import { useEffect, useState } from "react";
import {
  getProvinsi,
  getKota,
  getKecamatan,
  getKelurahan,
} from "@/services/api-cek-data.service";

export function useWilayah(form: any) {
  const [provinsi, setProvinsi] = useState<any[]>([]);
  const [kota, setKota] = useState<any[]>([]);
  const [kecamatan, setKecamatan] = useState<any[]>([]);
  const [kelurahan, setKelurahan] = useState<any[]>([]);

  const [loadingProvinsi, setLoadingProvinsi] = useState(false);
  const [loadingKota, setLoadingKota] = useState(false);
  const [loadingKecamatan, setLoadingKecamatan] = useState(false);
  const [loadingKelurahan, setLoadingKelurahan] = useState(false);

  useEffect(() => {
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

  const onChangeProvinsi = async (id: string) => {
    form.setFieldsValue({
      kota_id: null,
      kecamatan_id: null,
      kelurahan_id: null,
    });

    setKota([]);
    setKecamatan([]);
    setKelurahan([]);

    setLoadingKota(true);
    try {
      const res = await getKota(id);
      setKota(res.data);
    } finally {
      setLoadingKota(false);
    }
  };

  const onChangeKota = async (id: string) => {
    form.setFieldsValue({
      kecamatan_id: null,
      kelurahan_id: null,
    });

    setKecamatan([]);
    setKelurahan([]);

    setLoadingKecamatan(true);
    try {
      const res = await getKecamatan(id);
      setKecamatan(res.data);
    } finally {
      setLoadingKecamatan(false);
    }
  };

  const onChangeKecamatan = async (id: string) => {
    form.setFieldsValue({ kelurahan_id: null });

    setKelurahan([]);

    setLoadingKelurahan(true);
    try {
      const res = await getKelurahan(id);
      setKelurahan(res.data);
    } finally {
      setLoadingKelurahan(false);
    }
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
  };
}
