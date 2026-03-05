"use client";

import { useState, useEffect } from "react";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import { ApiKeys } from "@/types/api-keys.type";
import TextArea from "@/components/form/input/TextArea";

interface Props {
  data?: ApiKeys | null;
  onSubmit: (form: { name: string; urlApi: string; token: string }) => void;
}

export default function ApiKeyForm({ data, onSubmit }: Props) {
  const [name, setName] = useState("");
  const [urlApi, setUrlApi] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    if (data) {
      setName(data.name);
      setUrlApi(data.urlApi);
      setToken(data.token);
    }
  }, [data]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit({
      name,
      urlApi,
      token,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label>Name</Label>
        <Input value={name} onChange={setName} />
      </div>

      <div>
        <Label>URL API</Label>
        <Input value={urlApi} onChange={setUrlApi} />
      </div>

      <div>
        <Label>Token</Label>
        <TextArea rows={4} value={token} onChange={setToken} />
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <button
          type="submit"
          className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white"
        >
          Save
        </button>
      </div>
    </form>
  );
}
