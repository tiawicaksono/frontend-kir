"use client";
import React, { useEffect, useRef, useState } from "react";

interface DropdownProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  isOpen,
  onClose,
  children,
  className = "",
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<"bottom" | "top">("bottom");

  // ✅ Positioning (container aware)
  useEffect(() => {
    if (!isOpen) return;

    const trigger = document.querySelector(
      ".dropdown-toggle-active",
    ) as HTMLElement;

    if (!trigger || !dropdownRef.current) return;

    const triggerRect = trigger.getBoundingClientRect();
    const dropdownHeight = dropdownRef.current.offsetHeight;

    // cari scroll parent terdekat
    let parent: HTMLElement | null = trigger.parentElement;

    while (parent) {
      const overflowY = window.getComputedStyle(parent).overflowY;
      if (overflowY === "auto" || overflowY === "scroll") break;
      parent = parent.parentElement;
    }

    if (!parent) {
      setPosition("bottom");
      return;
    }

    const parentRect = parent.getBoundingClientRect();
    const spaceBelow = parentRect.bottom - triggerRect.bottom;
    const spaceAbove = triggerRect.top - parentRect.top;

    if (spaceBelow < dropdownHeight + 8 && spaceAbove > dropdownHeight) {
      setPosition("top");
    } else {
      setPosition("bottom");
    }
  }, [isOpen]);

  // ✅ Click outside handler
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      const clickedInsideDropdown = dropdownRef.current?.contains(target);

      const clickedToggle = (target as HTMLElement)?.closest(
        ".dropdown-toggle",
      );

      if (!clickedInsideDropdown && !clickedToggle) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className={`absolute z-50 right-0 rounded-xl border border-gray-200 bg-white shadow-theme-lg 
        dark:border-white/20 dark:bg-gray-dark
        ${position === "bottom" ? "mt-2 top-full" : "mb-2 bottom-full"}
        ${className}`}
    >
      {children}
    </div>
  );
};
