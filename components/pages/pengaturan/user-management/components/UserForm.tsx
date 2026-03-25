"use client";

import { useEffect, useState } from "react";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import LoadingButton from "@/components/common/LoadingButton";
import MultiSelect from "@/components/form/MultiSelect";
import { fetchRoles } from "@/services/user-management.service";

interface Props {
  mode?: "create" | "edit";
  initialValues?: any;
  onSuccess?: () => void;
  onSubmit?: (data: any) => Promise<boolean>;
}

export default function UserForm({
  initialValues,
  onSuccess,
  onSubmit,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [selectedValues, setSelectedValues] = useState<number[]>([]);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    phone?: string;
    role?: string;
  }>({});
  const [roleOptions, setRoleOptions] = useState<any[]>([]);
  useEffect(() => {
    const loadRoles = async () => {
      try {
        const res = await fetchRoles({
          page: 1,
          limit: 100, // 🔥 ambil semua (untuk select)
        });

        const mapped = res.data.map((role: any) => ({
          value: role.id,
          text: role.name,
        }));

        setRoleOptions(mapped);
      } catch (err) {
        console.error(err);
      }
    };

    loadRoles();
  }, []);

  useEffect(() => {
    if (initialValues) {
      setName(initialValues.name || "");
      setEmail(initialValues.email || "");
      setPhone(initialValues.phone || "");

      setSelectedValues(initialValues.roles?.map((r: any) => r.id) || []);
    }
  }, [initialValues]);

  const validateEmail = (value: string) => {
    const isValidEmail =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
    return isValidEmail;
  };

  const validate = () => {
    const newErrors: typeof errors = {};

    if (!name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!phone.trim()) {
      newErrors.phone = "Phone is required";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else {
      if (!validateEmail(email)) {
        newErrors.email = "Email format is not valid";
      }
    }

    if (selectedValues.length === 0) {
      newErrors.role = "Role is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    const payload = {
      id: initialValues?.id,
      name,
      email,
      phone,
      roles: selectedValues,
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

      <div>
        <Label className="flex items-center justify-between">
          <span>
            <span className="text-red-500">*</span>
            Phone
          </span>
          {errors.phone && (
            <span className="text-xs text-red-500 mt-1">{errors.phone}</span>
          )}
        </Label>
        <Input
          value={phone}
          onChange={setPhone}
          className={errors.phone ? "border-red-500 focus:border-none" : ""}
        />
      </div>

      <div>
        <Label className="flex items-center justify-between">
          <span>
            <span className="text-red-500">*</span>
            Email
          </span>
          {errors.email && (
            <span className="text-xs text-red-500 mt-1">{errors.email}</span>
          )}
        </Label>
        <Input
          value={email}
          onChange={setEmail}
          className={errors.email ? "border-red-500 focus:border-none" : ""}
        />
      </div>

      <div>
        <Label className="flex items-center justify-between">
          <span>
            <span className="text-red-500">*</span>
            Role
          </span>
          {errors.role && (
            <span className="text-xs text-red-500 mt-1">{errors.role}</span>
          )}
        </Label>
        <MultiSelect
          value={selectedValues}
          options={roleOptions}
          onChange={(values) => setSelectedValues(values)}
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
