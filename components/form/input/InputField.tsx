"use client";
import React from "react";

interface InputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange"
> {
  value?: string;
  onChange?: (value: string) => void;
  success?: boolean;
  error?: boolean;
  hint?: string;
}

const Input: React.FC<InputProps> = ({
  className = "",
  success = false,
  error = false,
  hint,
  disabled = false,
  value = "",
  onChange,
  ...props
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  let inputClasses =
    "h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-none focus:ring-1 ";

  if (disabled) {
    inputClasses +=
      "bg-gray-100 opacity-50 text-gray-500 border-gray-300 cursor-not-allowed dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700 ";
  } else if (error) {
    inputClasses +=
      "bg-transparent text-gray-400 border-gray-300 focus:border-error-300 focus:ring-3 focus:ring-error-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-error-800 ";
  } else if (success) {
    inputClasses += "text-green-500 border-green-400 ";
  } else {
    inputClasses +=
      "bg-transparent text-gray-400 border-gray-300 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800 ";
  }

  inputClasses += className;

  return (
    <div className="relative">
      <input
        {...props}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        autoComplete="off"
        className={inputClasses}
      />

      {hint && (
        <p
          className={`mt-1.5 text-xs ${
            error
              ? "text-red-500"
              : success
                ? "text-green-500"
                : "text-gray-500"
          }`}
        >
          {hint}
        </p>
      )}
    </div>
  );
};

export default Input;
