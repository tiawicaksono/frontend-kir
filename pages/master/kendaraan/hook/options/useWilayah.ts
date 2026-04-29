import { useEffect, useState, useRef } from "react";
import {
  getProvinsi,
  getKota,
  getKecamatan,
  getKelurahan,
} from "@/services/options.service";

// const mapOptions = (data: any[]) =>
//   data.map((item) => ({
//     label:
//       item.label ||
//       item.nama ||
//       item.name ||
//       item.text ||
//       item.kota_nama_kota ||
//       item.kecamatan_nama_kecamatan ||
//       item.kelurahan_nama_kelurahan,
//     value: Number(item.value ?? item.id),
//   }));

export function useWilayah(form: any, isInit: boolean) {
  const [provinsi, setProvinsi] = useState<any[]>([]);
  const [kota, setKota] = useState<any[]>([]);
  const [kecamatan, setKecamatan] = useState<any[]>([]);
  const [kelurahan, setKelurahan] = useState<any[]>([]);

  const fetched = useRef(false);

  useEffect(() => {
    if (fetched.current) return;
    fetched.current = true;

    const fetch = async () => {
      const res = await getProvinsi();
      setProvinsi(res.data);
    };

    fetch();
  }, []);

  const onChangeProvinsi = async (id: number) => {
    if (!id || isInit) return;

    form.setFieldsValue({
      kota_id: null,
      kecamatan_id: null,
      kelurahan_id: null,
    });

    const res = await getKota(id);
    setKota(res.data);
  };

  const onChangeKota = async (id: number) => {
    if (!id || isInit) return;

    form.setFieldsValue({
      kecamatan_id: null,
      kelurahan_id: null,
    });

    const res = await getKecamatan(id);
    setKecamatan(res.data);
  };

  const onChangeKecamatan = async (id: number) => {
    if (!id || isInit) return;

    form.setFieldsValue({ kelurahan_id: null });

    const res = await getKelurahan(id);
    setKelurahan(res.data);
  };

  return {
    provinsi,
    kota,
    kecamatan,
    kelurahan,
    onChangeProvinsi,
    onChangeKota,
    onChangeKecamatan,

    // 🔥 penting untuk preload edit
    setKota,
    setKecamatan,
    setKelurahan,
  };
}
