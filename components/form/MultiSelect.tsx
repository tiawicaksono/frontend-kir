"use client";

import React, { useEffect, useState } from "react";

interface Option {
  value: number;
  text: string;
  selected: boolean;
}

interface MultiSelectProps {
  label?: string;
  options: Option[];
  value?: number[];
  onChange?: (selected: number[]) => void;
  disabled?: boolean;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  label,
  options,
  value = [],
  onChange,
  disabled = false,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    if (disabled) return;
    setIsOpen((prev) => !prev);
  };

  // 🔥 FIX: pakai number
  const handleSelect = (optionValue: number) => {
    const newSelectedOptions = selectedOptions.includes(optionValue)
      ? selectedOptions.filter((value) => value !== optionValue)
      : [...selectedOptions, optionValue];

    setSelectedOptions(newSelectedOptions);
    onChange?.(newSelectedOptions);
  };

  const removeOption = (value: number) => {
    const newSelectedOptions = selectedOptions.filter((opt) => opt !== value);
    setSelectedOptions(newSelectedOptions);
    onChange?.(newSelectedOptions);
  };

  // 🔥 FIX: find by value, bukan object
  const selectedValuesText = selectedOptions.map(
    (value) => options.find((option) => option.value === value)?.text || "",
  );

  useEffect(() => {
    if (value) {
      setSelectedOptions(value);
    }
  }, [value]);
  return (
    <div className="w-full">
      <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
        {label}
      </label>

      <div className="relative z-20 inline-block w-full">
        <div className="relative flex flex-col items-center">
          <div onClick={toggleDropdown} className="w-full">
            <div className="mb-2 flex min-h-11 rounded-lg border border-gray-300 py-1.5 pl-3 pr-3 shadow-theme-xs">
              <div className="flex flex-wrap flex-auto gap-2">
                {selectedValuesText.length > 0 ? (
                  selectedOptions.map((value, index) => {
                    const text =
                      options.find((opt) => opt.value === value)?.text || "";

                    return (
                      <div
                        key={value}
                        className="group flex items-center rounded-full bg-gray-100 py-1 pl-2.5 pr-2 text-sm"
                      >
                        <span>{text}</span>
                        <div
                          onClick={(e) => {
                            e.stopPropagation(); // 🔥 biar gak toggle dropdown
                            removeOption(value);
                          }}
                          className="pl-2 cursor-pointer text-gray-500"
                        >
                          ✕
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <input
                    placeholder="Select option"
                    className="w-full h-full p-1 text-sm bg-transparent outline-none"
                    readOnly
                  />
                )}
              </div>

              <div className="flex items-center w-7">
                <button
                  type="button"
                  onClick={toggleDropdown}
                  className="w-5 h-5"
                >
                  ▼
                </button>
              </div>
            </div>
          </div>

          {isOpen && (
            <div className="absolute left-0 z-40 w-full bg-white rounded-lg shadow-sm top-full">
              {options.map((option) => (
                <div
                  key={option.value}
                  className={`p-2 cursor-pointer ${
                    selectedOptions.includes(option.value) ? "bg-blue-100" : ""
                  }`}
                  onClick={() => handleSelect(option.value)} // 🔥 FIX
                >
                  {option.text}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MultiSelect;
