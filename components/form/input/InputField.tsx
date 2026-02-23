import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
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
  ...props
}) => {
  let inputClasses = `h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-none focus:ring-3 ${className}`;

  if (disabled) {
    inputClasses += ` text-gray-500 border-gray-300 cursor-not-allowed`;
  } else if (error) {
    inputClasses += ` text-red-800 border-red-500`;
  } else if (success) {
    inputClasses += ` text-green-500 border-green-400`;
  } else {
    inputClasses += ` bg-transparent text-gray-800 border-gray-300`;
  }

  return (
    <div className="relative">
      <input
        {...props}
        disabled={disabled}
        className={inputClasses}
        autoComplete="off"
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
