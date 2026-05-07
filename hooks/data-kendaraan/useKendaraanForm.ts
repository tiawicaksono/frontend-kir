import { useState, useEffect, useRef } from "react";
import {
  createKendaraan,
  updateKendaraan,
  detailKendaraan,
} from "@/services/data-kendaraan.service";

import {
  getKota,
  getKecamatan,
  getKelurahan,
  getVarianMerk,
  getTipeVarianMerk,
  getSubJenisKendaraan,
} from "@/services/options.service";

import {
  mapApiToForm,
  transformValues,
} from "../../pages/master/kendaraan/utils/formMapper";
import { extractFieldsFromSection } from "../../pages/master/kendaraan/utils/schemaHelper";
import { kendaraanSteps } from "../../pages/master/kendaraan/schema";
import { useShowAlert } from "@/core/alert/alert.hook";

// 🔥 helper WAJIB (biar label muncul)
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

export function useKendaraanForm({
  form,
  mode,
  id,
  wilayah,
  merk,
  jenisKendaraan,
  onInitDone,
}: any) {
  const [loading, setLoading] = useState(mode === "edit");
  const [submitting, setSubmitting] = useState(false);

  const { showErrorAlert, showSuccessAlert } = useShowAlert();

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

        // 🔥 mapping dari API ke form
        const mapped = mapApiToForm(res, kendaraanSteps);

        // =========================
        // 🔥 FIX TYPE (HANYA ID FIELD)
        // =========================
        const numberFields = [
          "provinsi_id",
          "kota_id",
          "kecamatan_id",
          "kelurahan_id",
          "merk_id",
          "varian_merk_id",
          "tipe_varian_merk_id",
          "jenis_kendaraan_id",
          "sub_jenis_kendaraan_id",
        ];

        numberFields.forEach((field) => {
          if (mapped[field] !== undefined && mapped[field] !== null) {
            mapped[field] = Number(mapped[field]);
          }
        });

        // =========================
        // 🔥 LOAD DEPENDENT OPTIONS (WAJIB DI MAP)
        // =========================

        if (mapped.provinsi_id) {
          const resKota = await getKota(String(mapped.provinsi_id));
          wilayah.setKota?.(resKota.data);
        }

        if (mapped.kota_id) {
          const resKec = await getKecamatan(String(mapped.kota_id));
          wilayah.setKecamatan?.(resKec.data);
        }

        if (mapped.kecamatan_id) {
          const resKel = await getKelurahan(String(mapped.kecamatan_id));
          wilayah.setKelurahan?.(resKel.data);
        }

        if (mapped.merk_id) {
          const resVarian = await getVarianMerk(mapped.merk_id);
          merk.setVarianMerk?.(resVarian.data);
        }

        if (mapped.varian_merk_id) {
          const resTipe = await getTipeVarianMerk(mapped.varian_merk_id);
          merk.setTipeVarianMerk?.(resTipe.data);
        }

        if (mapped.jenis_kendaraan_id) {
          const resSub = await getSubJenisKendaraan(mapped.jenis_kendaraan_id);
          jenisKendaraan.setSubJenisKendaraan?.(resSub.data);
        }

        // =========================
        // 🔥 SET FORM VALUE (TERAKHIR)
        // =========================
        form.setFieldsValue(mapped);

        fetchedRef.current = true;

        // 🔥 kasih tahu init selesai
        onInitDone?.();
      } catch (err) {
        console.error("FETCH DETAIL ERROR:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [mode, id]);

  // =========================
  // NEXT (VALIDATION ONLY)
  // =========================
  const next = async (step: any) => {
    try {
      const fields = step.sections.flatMap((s: any) =>
        extractFieldsFromSection(s),
      );

      await form.validateFields(fields);
    } catch (err) {
      console.error("VALIDATION ERROR:", err);
      throw err;
    }
  };

  // =========================
  // PREV
  // =========================
  const prev = (setCurrent: any) => {
    setCurrent((p: number) => p - 1);
  };

  // =========================
  // SUBMIT
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

      showSuccessAlert("Berhasil menyimpan");
    } catch (err) {
      console.error(err);
      showErrorAlert("Gagal menyimpan");
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
