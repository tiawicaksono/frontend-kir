import { useState, useEffect, useRef } from "react";
import {
  createKendaraan,
  updateKendaraan,
  detailKendaraan,
} from "@/services/data-kendaraan.service";

import { mapApiToForm, transformValues } from "../utils/formMapper";
import { extractFieldsFromSection } from "../utils/schemaHelper";
import { kendaraanSteps } from "../schema";

export function useKendaraanForm({
  form,
  mode,
  id,
  wilayah,
  merk,
  jenisKendaraan,
}: any) {
  const [loading, setLoading] = useState(mode === "edit");
  const [submitting, setSubmitting] = useState(false);
  const [kendaraanId, setKendaraanId] = useState<number | null>(
    id ? Number(id) : null,
  );

  const fetchedRef = useRef(false);

  // =========================
  // FETCH EDIT
  // =========================
  useEffect(() => {
    if (mode !== "edit" || !id || fetchedRef.current) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await detailKendaraan(Number(id));
        const mapped = mapApiToForm(res, kendaraanSteps);

        if (mapped.provinsi_id)
          await wilayah.onChangeProvinsi(mapped.provinsi_id);
        if (mapped.kota_id) await wilayah.onChangeKota(mapped.kota_id);
        if (mapped.kecamatan_id)
          await wilayah.onChangeKecamatan(mapped.kecamatan_id);

        if (mapped.merk_id) await merk.onChangeMerk(mapped.merk_id);
        if (mapped.varian_merk_id)
          await merk.onChangeVarianMerk(mapped.varian_merk_id);

        if (mapped.jenis_kendaraan_id)
          await jenisKendaraan.onChangeJenisKendaraan(
            mapped.jenis_kendaraan_id,
          );

        form.setFieldsValue(mapped);
        fetchedRef.current = true;
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [mode, id]);

  // =========================
  // NEXT STEP & SAVE
  // =========================
  // const next = async (step: any) => {
  //   try {
  //     setSubmitting(true);

  //     const fields = step.sections.flatMap((s: any) =>
  //       extractFieldsFromSection(s),
  //     );

  //     const values = await form.validateFields(fields);
  //     const payload = transformValues(values);

  //     if (!kendaraanId) {
  //       const res = await createKendaraan(payload);
  //       setKendaraanId(res.id);
  //     } else {
  //       await updateKendaraan(kendaraanId, payload);
  //     }
  //   } catch (err) {
  //     console.error("NEXT STEP ERROR:", err);
  //     throw err;
  //   } finally {
  //     setSubmitting(false);
  //   }
  // };

  // =========================
  // NEXT ONLY (NO SAVE)
  // =========================
  const next = async (step: any) => {
    try {
      const fields = step.sections.flatMap((s: any) =>
        extractFieldsFromSection(s),
      );

      await form.validateFields(fields);

      // ❗ NO API CALL HERE
      // hanya validasi
    } catch (err) {
      console.error("VALIDATION ERROR:", err);
      throw err;
    }
  };

  // =========================
  // PREV STEP
  // =========================
  const prev = (setCurrent: any) => {
    setCurrent((p: number) => p - 1);
  };

  // =========================
  // SAVE ONLY (NO NEXT)
  // =========================
  const submit = async (onSuccess?: any) => {
    try {
      setSubmitting(true);

      const payload = transformValues(form.getFieldsValue(true));

      if (!kendaraanId) {
        const res = await createKendaraan(payload);
        setKendaraanId(res.id);
      } else {
        await updateKendaraan(kendaraanId, payload);
      }
    } catch (err) {
      console.error("SAVE ERROR:", err);
    } finally {
      setSubmitting(false);
      onSuccess?.();
    }
  };

  return {
    loading,
    submitting,
    next,
    prev,
    submit,
  };
}
