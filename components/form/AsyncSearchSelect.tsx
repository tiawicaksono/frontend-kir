"use client";

import { useEffect, useState } from "react";
import Input from "@/components/form/input/InputField";

export interface Option {
  value: string;
  label: string;
}

interface Props {
  value?: string;
  onChange: (val: string) => void;
  fetchOptions: (search: string) => Promise<Option[]>;
  placeholder?: string;
  error?: boolean;
  hint?: string;
}

export default function AsyncSearchSelect({
  value,
  onChange,
  fetchOptions,
  placeholder = "Search...",
  error,
  hint,
}: Props) {
  const [options, setOptions] = useState<Option[]>([]);
  const [search, setSearch] = useState("");
  const [selectedLabel, setSelectedLabel] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  // 🔥 debounce search
  useEffect(() => {
    const delay = setTimeout(() => {
      if (!search) {
        setOptions([]);
        return;
      }

      handleFetch(search);
    }, 300);

    return () => clearTimeout(delay);
  }, [search]);

  const handleFetch = async (keyword: string) => {
    try {
      setLoading(true);
      const res = await fetchOptions(keyword);
      setOptions(res);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 sync label saat edit
  useEffect(() => {
    const selected = options.find((opt) => opt.value === value);
    if (selected) {
      setSelectedLabel(selected.label);
    }
  }, [value, options]);

  return (
    <div className="relative">
      {/* 🔥 PAKAI INPUT KAMU */}
      <Input
        value={open ? search : selectedLabel}
        onChange={(val) => {
          setSearch(val);
          setOpen(true);
        }}
        onFocus={() => {
          setSearch("");
          setOpen(true);
        }}
        onBlur={() => {
          setTimeout(() => {
            setOpen(false);
            setSearch("");
          }, 200);
        }}
        placeholder={placeholder}
        error={error}
        hint={hint}
      />

      {/* DROPDOWN */}
      {open && (
        <div className="absolute z-10 w-full border bg-white max-h-40 overflow-auto mt-1 rounded shadow">
          {loading && (
            <div className="px-3 py-2 text-sm text-gray-500">Loading...</div>
          )}

          {!loading && search && options.length === 0 && (
            <div className="px-3 py-2 text-sm text-gray-500">No data</div>
          )}

          {options.map((item) => {
            const isSelected = value === item.value;

            return (
              <div
                key={item.value}
                onClick={() => {
                  onChange(item.value);
                  setSelectedLabel(item.label);
                  setSearch("");
                  setOpen(false);
                }}
                className={`flex justify-between px-3 py-2 cursor-pointer hover:bg-gray-100 ${
                  isSelected ? "bg-blue-100" : ""
                }`}
              >
                <span>{item.label}</span>
                {isSelected && <span>✔</span>}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
