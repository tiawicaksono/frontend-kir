"use client";

import { useEffect, useState } from "react";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import LoadingButton from "@/components/common/LoadingButton";

interface Props {
  mode?: "create" | "edit";
  initialValues?: any;
  onSuccess?: () => void;
  onSubmit?: (data: any) => Promise<boolean>;
}

export default function ProvinsiForm({
  initialValues,
  onSuccess,
  onSubmit,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [id, setID] = useState("");
  const [name, setName] = useState("");
  const [errors, setErrors] = useState<{
    name?: string;
    id?: string;
  }>({});

  useEffect(() => {
    if (initialValues) {
      setName(initialValues.nama_provinsi || "");
      setID(initialValues.id || "");
    }
  }, [initialValues]);

  const validate = () => {
    const newErrors: typeof errors = {};

    if (!id.trim()) {
      newErrors.id = "ID is required";
    } else if (id.trim().length > 2) {
      newErrors.id = "ID max 2 characters";
    }

    if (!name.trim()) {
      newErrors.name = "Name is required";
    }
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    const payload = {
      id,
      name,
    };

    // 🔥 PENTING BANGET
    const success = await onSubmit?.(payload);
    // console.log("SUBMIT PAYLOAD:", payload);
    setLoading(false);

    if (success) {
      onSuccess?.();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div>
        <Label className="flex items-center justify-between">
          <span>
            <span className="text-red-500">*</span>
            ID
          </span>
          {errors.id && (
            <span className="text-xs text-red-500 mt-1">{errors.id}</span>
          )}
        </Label>
        <Input
          value={id}
          onChange={setID}
          disabled={initialValues?.id} // jika edit, ID tidak bisa diubah
          className={errors.id ? "border-red-500 focus:border-none" : ""}
        />
      </div>
      <div>
        <Label className="flex items-center justify-between">
          <span>
            <span className="text-red-500">*</span>
            Name
          </span>
          {errors.name && (
            <span className="text-xs text-red-500 mt-1">{errors.name}</span>
          )}
        </Label>
        <Input
          value={name}
          onChange={setName}
          className={errors.name ? "border-red-500 focus:border-none" : ""}
        />
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
