"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface ApiKeyFieldProps {
  value: string;
}

export default function ApiKeyField({ value }: ApiKeyFieldProps) {
  const [copied, setCopied] = useState(false);

  const maskedValue = `${value.slice(0, 7)}********${value.slice(-4)}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  return (
    <div className="w-80 flex items-center justify-between max-w-md rounded-xl border border-gray-300 bg-gray-100 px-4 py-3 dark:border-gray-700 dark:bg-gray-800">
      <span className="text-sm font-mono text-gray-800 dark:text-gray-200">
        {maskedValue}
      </span>

      <button
        onClick={handleCopy}
        className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white transition"
      >
        {copied ? <Check size={16} /> : <Copy size={16} />}
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}
