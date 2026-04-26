import { useEffect, useState } from "react";
import {
  getMerk,
  getTipeVarianMerk,
  getVarianMerk,
} from "@/services/options.service";

export function useMerk(form: any) {
  const [merk, setMerk] = useState<any[]>([]);
  const [varianMerk, setVarianMerk] = useState<any[]>([]);
  const [tipeVarianMerk, setTipeVarianMerk] = useState<any[]>([]);

  const [loadingMerk, setLoadingMerk] = useState(false);
  const [loadingVarianMerk, setLoadingVarianMerk] = useState(false);
  const [loadingTipeVarianMerk, setLoadingTipeVarianMerk] = useState(false);

  useEffect(() => {
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

  const onChangeMerk = async (id: number) => {
    form.setFieldsValue({
      varian_merk_id: null,
      tipe_varian_merk_id: null,
    });

    setVarianMerk([]);
    setTipeVarianMerk([]);

    setLoadingVarianMerk(true);
    try {
      const res = await getVarianMerk(id);
      setVarianMerk(res.data);
    } finally {
      setLoadingVarianMerk(false);
    }
  };

  const onChangeVarianMerk = async (id: number) => {
    form.setFieldsValue({
      tipe_varian_merk_id: null,
    });

    setTipeVarianMerk([]);

    setLoadingTipeVarianMerk(true);
    try {
      const res = await getTipeVarianMerk(id);
      setTipeVarianMerk(res.data);
    } finally {
      setLoadingTipeVarianMerk(false);
    }
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
  };
}
