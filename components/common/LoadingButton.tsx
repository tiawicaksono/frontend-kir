"use client";

import React from "react";
import Button from "@/components/form/Button";

type LoadingButtonProps = {
  children: React.ReactNode;
  loading?: boolean;
  loadingText?: string;
  className?: string;
  size?: "sm" | "md";
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
};

export default function LoadingButton({
  children,
  loading = false,
  loadingText = "Processing...",
  className = "",
  size = "sm",
  type = "button",
  onClick,
}: LoadingButtonProps) {
  return (
    <Button
      type={type}
      size={size}
      className={`w-full ${className}`}
      disabled={loading}
      onClick={onClick}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          {loadingText}
        </span>
      ) : (
        children
      )}
    </Button>
  );
}
