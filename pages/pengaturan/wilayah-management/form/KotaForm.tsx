"use client";

import { useEffect, useState } from "react";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import LoadingButton from "@/components/common/LoadingButton";
import { fetchTableDataProvinsi } from "@/services/wilayah.service";
import AsyncSearchSelect from "@/components/form/AsyncSearchSelect";

interface Props {
  mode?: "create" | "edit";
  initialValues?: any;
  onSuccess?: () => void;
  onSubmit?: (data: any) => Promise<boolean>;
}

export default function KotaForm({
  initialValues,
  onSuccess,
  onSubmit,
}: Props) {
  const [loading, setLoading] = useState(false);

  const [id, setID] = useState("");
  const [name, setName] = useState("");
  const [provinsi, setProvinsi] = useState("");

  const [errors, setErrors] = useState<{
    id?: string;
    name?: string;
    provinsi?: string;
  }>({});

  // 🔥 FETCHER UNTUK ASYNC SELECT
  const fetchProvinsiOptions = async (search: string) => {
    const res = await fetchTableDataProvinsi({
      search,
      limit: 10,
    });

    return res.data.map((item: any) => ({
      value: String(item.id),
      label: item.nama_provinsi || item.name,
    }));
  };

  // 🔥 INITIAL VALUE (EDIT)
  useEffect(() => {
    if (initialValues) {
      setID(initialValues.id || "");
      setName(initialValues.name || initialValues.nama_kota || "");
      setProvinsi(
        String(initialValues.provinsi_id || initialValues.provinsi || ""),
      );
    }
  }, [initialValues]);

  // 🔥 VALIDATION
  const validate = () => {
    const newErrors: typeof errors = {};

    if (!id.trim()) {
      newErrors.id = "ID is required";
    } else if (id.trim().length > 4) {
      newErrors.id = "ID max 4 characters";
    }

    if (!provinsi) {
      newErrors.provinsi = "Provinsi is required";
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
    // console.log({ id, name, provinsi, isValid });

    if (!validate()) return;

    setLoading(true);

    const payload = {
      id,
      nama_kota: name,
      provinsi_id: provinsi,
    };
    console.log("SUBMIT PAYLOAD:", payload);
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
            <span className="text-xs text-red-500"> (max : 4 characters)</span>
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

      {/* PROVINSI (ASYNC SELECT) */}
      <div>
        <Label className="flex items-center justify-between">
          <span>
            <span className="text-red-500">*</span>
            Provinsi
          </span>
          {errors.provinsi && (
            <span className="text-xs text-red-500 mt-1">{errors.provinsi}</span>
          )}
        </Label>

        <AsyncSearchSelect
          value={provinsi}
          onChange={setProvinsi}
          fetchOptions={fetchProvinsiOptions}
          placeholder="Search Provinsi"
          error={!!errors.provinsi}
          hint={errors.provinsi}
        />
      </div>

      {/* NAME */}
      <div>
        <Label className="flex items-center justify-between">
          <span>
            <span className="text-red-500">*</span>
            Nama Kota
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
