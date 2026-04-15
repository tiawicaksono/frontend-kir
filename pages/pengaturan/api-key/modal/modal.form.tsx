"use client";

import { useState, useEffect } from "react";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import { ApiKeys } from "@/types/api-keys.type";
import TextArea from "@/components/form/input/TextArea";
import LoadingButton from "@/components/common/LoadingButton";

interface Props {
  data?: ApiKeys | null;
  onSubmit: (form: { name: string; urlApi: string; token: string }) => void;
  isSubmitting?: boolean;
}

export default function ApiKeyForm({ data, onSubmit, isSubmitting }: Props) {
  const [name, setName] = useState("");
  const [urlApi, setUrlApi] = useState("");
  const [token, setToken] = useState("");

  const [errors, setErrors] = useState<{
    name?: string;
    urlApi?: string;
    token?: string;
  }>({});

  // 🔥 FIX: reset + fill
  useEffect(() => {
    if (data) {
      // EDIT MODE
      setName(data.name);
      setUrlApi(data.urlApi);
      setToken(data.token);
    } else {
      // CREATE MODE
      setName("");
      setUrlApi("");
      setToken("");
      setErrors({});
    }
  }, [data]);

  const validate = () => {
    const newErrors: typeof errors = {};

    if (!name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!urlApi.trim()) {
      newErrors.urlApi = "URL API is required";
    } else {
      try {
        new URL(urlApi);
      } catch {
        newErrors.urlApi = "URL API format is not valid";
      }
    }

    if (!token.trim()) {
      newErrors.token = "Token is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      name,
      urlApi,
      token,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      {/* NAME */}
      <div>
        <Label className="flex items-center justify-between">
          <span>
            <span className="text-red-500">*</span>
            Name
          </span>
          {errors.name && (
            <span className="text-xs text-red-500">{errors.name}</span>
          )}
        </Label>
        <Input
          value={name}
          onChange={setName}
          className={errors.name ? "border-red-500" : ""}
        />
      </div>

      {/* URL */}
      <div>
        <Label className="flex items-center justify-between">
          <span>
            <span className="text-red-500">*</span>
            URL API
          </span>
          {errors.urlApi && (
            <span className="text-xs text-red-500">{errors.urlApi}</span>
          )}
        </Label>
        <Input
          value={urlApi}
          onChange={setUrlApi}
          placeholder="https://example.com"
          className={errors.urlApi ? "border-red-500" : ""}
        />
      </div>

      {/* TOKEN */}
      <div>
        <Label className="flex items-center justify-between">
          <span>
            <span className="text-red-500">*</span>
            Token
          </span>
          {errors.token && (
            <span className="text-xs text-red-500">{errors.token}</span>
          )}
        </Label>
        <TextArea
          rows={4}
          value={token}
          onChange={setToken}
          className={errors.token ? "border-red-500" : ""}
        />
      </div>

      <LoadingButton
        type="submit"
        size="sm"
        loading={isSubmitting}
        loadingText="Saving..."
      >
        Save
      </LoadingButton>
    </form>
  );
}
