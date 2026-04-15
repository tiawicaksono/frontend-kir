"use client";

import { useEffect, useState } from "react";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import LoadingButton from "@/components/common/LoadingButton";
import { fetchTableDataKota } from "@/services/wilayah.service";
import AsyncSearchSelect from "@/components/form/AsyncSearchSelect";

interface Props {
  mode?: "create" | "edit";
  initialValues?: any;
  onSuccess?: () => void;
  onSubmit?: (data: any) => Promise<boolean>;
}

export default function KecamatanForm({
  initialValues,
  onSuccess,
  onSubmit,
}: Props) {
  const [loading, setLoading] = useState(false);

  const [id, setID] = useState("");
  const [name, setName] = useState("");
  const [kota, setKota] = useState("");

  const [errors, setErrors] = useState<{
    id?: string;
    name?: string;
    kota?: string;
  }>({});

  // 🔥 FETCHER UNTUK ASYNC SELECT
  const fetchKotaOptions = async (search: string) => {
    const res = await fetchTableDataKota({
      search,
      limit: 10,
    });

    return res.data.map((item: any) => ({
      value: String(item.id),
      label: `${item.nama_kota} - ${item.nama_provinsi}` || item.name,
    }));
  };

  // 🔥 INITIAL VALUE (EDIT)
  useEffect(() => {
    if (initialValues) {
      setID(initialValues.id || "");
      setName(initialValues.name || initialValues.nama_kecamatan || "");
      setKota(String(initialValues.kota_id || initialValues.kota || ""));
    }
  }, [initialValues]);

  // 🔥 VALIDATION
  const validate = () => {
    const newErrors: typeof errors = {};

    if (!id.trim()) {
      newErrors.id = "ID is required";
    } else if (id.trim().length > 6) {
      newErrors.id = "ID max 6 characters";
    }

    if (!kota) {
      newErrors.kota = "Kota is required";
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
      nama_kecamatan: name,
      kota_id: kota,
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
            <span className="text-xs text-red-500"> (max : 6 characters)</span>
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

      {/* KOTA (ASYNC SELECT) */}
      <div>
        <Label className="flex items-center justify-between">
          <span>
            <span className="text-red-500">*</span>
            Kota
          </span>
          {errors.kota && (
            <span className="text-xs text-red-500 mt-1">{errors.kota}</span>
          )}
        </Label>

        <AsyncSearchSelect
          value={kota}
          onChange={setKota}
          fetchOptions={fetchKotaOptions}
          placeholder="Search Kota"
          // error={!!errors.kota}
          // hint={errors.kota}
        />
      </div>

      {/* NAME */}
      <div>
        <Label className="flex items-center justify-between">
          <span>
            <span className="text-red-500">*</span>
            Nama Kecamatan
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
