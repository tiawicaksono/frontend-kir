"use client";

import { useEffect, useState } from "react";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import LoadingButton from "@/components/common/LoadingButton";
import { fetchTableDataKecamatan } from "@/services/wilayah.service";
import AsyncSearchSelect from "@/components/form/AsyncSearchSelect";

interface Props {
  mode?: "create" | "edit";
  initialValues?: any;
  onSuccess?: () => void;
  onSubmit?: (data: any) => Promise<boolean>;
}

export default function KelurahanForm({
  initialValues,
  onSuccess,
  onSubmit,
}: Props) {
  const [loading, setLoading] = useState(false);

  const [id, setID] = useState("");
  const [name, setName] = useState("");
  const [kecamatan, setKecamatan] = useState("");

  const [errors, setErrors] = useState<{
    id?: string;
    name?: string;
    kecamatan?: string;
  }>({});

  // 🔥 FETCHER UNTUK ASYNC SELECT
  const fetchKecamatanOptions = async (search: string) => {
    const res = await fetchTableDataKecamatan({
      search,
      limit: 10,
    });

    return res.data.map((item: any) => ({
      value: String(item.id),
      label: `${item.nama_kecamatan} - ${item.nama_kota}` || item.name,
    }));
  };

  // 🔥 INITIAL VALUE (EDIT)
  useEffect(() => {
    if (initialValues) {
      setID(initialValues.id || "");
      setName(initialValues.name || initialValues.nama_kelurahan || "");
      setKecamatan(
        String(initialValues.kecamatan_id || initialValues.kecamatan || ""),
      );
    }
  }, [initialValues]);

  // 🔥 VALIDATION
  const validate = () => {
    const newErrors: typeof errors = {};

    if (!id.trim()) {
      newErrors.id = "ID is required";
    } else if (id.trim().length > 10) {
      newErrors.id = "ID max 10 characters";
    }

    if (!kecamatan) {
      newErrors.kecamatan = "Kecamatan is required";
    }

    if (!name.trim()) {
      newErrors.name = "Name is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // 🔥 SUBMIT
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = validate();

    if (!validate()) return;

    setLoading(true);

    const payload = {
      id,
      nama_kelurahan: name,
      kecamatan_id: kecamatan,
    };
    // console.log("SUBMIT PAYLOAD:", payload);
    const success = await onSubmit?.(payload);

    setLoading(false);

    if (success) {
      onSuccess?.();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {/* ID */}
      <div>
        <Label className="flex items-center justify-between">
          <span>
            <span className="text-red-500">*</span>
            ID
            <span className="text-xs text-red-500"> (max : 10 characters)</span>
          </span>
          {errors.id && (
            <span className="text-xs text-red-500 mt-1">{errors.id}</span>
          )}
        </Label>

        <Input
          value={id}
          onChange={(val) => setID(val.toUpperCase())}
          disabled={!!initialValues?.id}
        />
      </div>

      {/* KECAMATAN (ASYNC SELECT) */}
      <div>
        <Label className="flex items-center justify-between">
          <span>
            <span className="text-red-500">*</span>
            Kecamatan
          </span>
          {errors.kecamatan && (
            <span className="text-xs text-red-500 mt-1">
              {errors.kecamatan}
            </span>
          )}
        </Label>

        <AsyncSearchSelect
          value={kecamatan}
          onChange={setKecamatan}
          fetchOptions={fetchKecamatanOptions}
          placeholder="Search Kecamatan"
          // error={!!errors.kecamatan}
          // hint={errors.kecamatan}
        />
      </div>

      {/* NAME */}
      <div>
        <Label className="flex items-center justify-between">
          <span>
            <span className="text-red-500">*</span>
            Nama Kelurahan
          </span>
          {errors.name && (
            <span className="text-xs text-red-500 mt-1">{errors.name}</span>
          )}
        </Label>

        <Input value={name} onChange={setName} />
      </div>

      <LoadingButton
        type="submit"
        size="sm"
        loading={loading}
        loadingText="Saving..."
      >
        Save
      </LoadingButton>
    </form>
  );
}
