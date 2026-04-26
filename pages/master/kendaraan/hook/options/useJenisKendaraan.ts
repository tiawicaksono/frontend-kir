import { useEffect, useState } from "react";
import {
  getJenisKendaraan,
  getSubJenisKendaraan,
} from "@/services/options.service";

export function useJenisKendaraan(form: any) {
  const [jenisKendaraan, setJenisKendaraan] = useState<any[]>([]);
  const [subJenisKendaraan, setSubJenisKendaraan] = useState<any[]>([]);

  const [loadingJenisKendaraan, setLoadingJenisKendaraan] = useState(false);
  const [loadingSubJenisKendaraan, setLoadingSubJenisKendaraan] =
    useState(false);

  useEffect(() => {
    const fetch = async () => {
      setLoadingJenisKendaraan(true);
      try {
        const res = await getJenisKendaraan();
        setJenisKendaraan(res.data);
      } finally {
        setLoadingJenisKendaraan(false);
      }
    };
    fetch();
  }, []);

  const onChangeJenisKendaraan = async (id: number) => {
    form.setFieldsValue({
      sub_jenis_kendaraan_id: null,
    });

    setSubJenisKendaraan([]);
    setLoadingSubJenisKendaraan(true);
    try {
      const res = await getSubJenisKendaraan(id);
      setSubJenisKendaraan(res.data);
    } finally {
      setLoadingSubJenisKendaraan(false);
    }
  };

  return {
    jenisKendaraan,
    subJenisKendaraan,
    loadingJenisKendaraan,
    loadingSubJenisKendaraan,
    onChangeJenisKendaraan,
  };
}
