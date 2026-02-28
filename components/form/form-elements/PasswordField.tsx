"use client";

import { useState } from "react";
import { EyeIcon, EyeClosedIcon } from "lucide-react";
import Input from "../input/InputField";

interface PasswordInputProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  className?: string;
  name?: string;
}

export default function PasswordInput({
  label,
  value,
  onChange,
  placeholder = "Enter your password",
  disabled = false,
  error,
  className,
  name,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full space-y-2">
      {label && (
        <label className="text-sm font-medium text-gray-500 dark:text-white">
          {label}
        </label>
      )}

      <div className="relative">
        <Input
          name={name}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
        />

        <span
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
        >
          {showPassword ? (
            <EyeIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          ) : (
            <EyeClosedIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          )}
        </span>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
