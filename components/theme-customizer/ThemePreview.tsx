"use client";

import { Check } from "lucide-react";
import { motion } from "framer-motion";
import clsx from "clsx";

export default function ThemePreview({
  label,
  mode,
  active,
  onClick,
}: {
  label: string;
  mode: "light" | "dark";
  active: boolean;
  onClick: () => void;
}) {
  const isDark = mode === "dark";

  return (
    <button
      onClick={onClick}
      className="group flex flex-col items-center gap-2"
    >
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 300 }}
        className={clsx(
          "relative h-22.5 w-35 rounded-xl border p-2",
          active
            ? "border-blue-500 ring-2 ring-blue-500/30"
            : "border-slate-300 dark:border-white/10",
          isDark ? "bg-slate-900" : "bg-slate-50",
        )}
      >
        {/* Sidebar */}
        <div
          className={clsx(
            "absolute left-2 top-2 bottom-2 w-6 rounded-md",
            isDark ? "bg-slate-800" : "bg-slate-200",
          )}
        >
          <div className="mt-2 space-y-1 px-1">
            {[1, 2, 3, 4].map((i) => (
              <span
                key={i}
                className={clsx(
                  "block h-2 rounded",
                  isDark ? "bg-slate-600" : "bg-blue-200",
                )}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="ml-9 flex h-full flex-col gap-2">
          <span
            className={clsx(
              "h-3 rounded",
              isDark ? "bg-slate-700" : "bg-slate-300",
            )}
          />
          <span
            className={clsx(
              "mt-auto h-3 rounded",
              isDark ? "bg-slate-700" : "bg-slate-300",
            )}
          />
        </div>
        {active && (
          <span className="absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-white">
            <Check size={12} />
          </span>
        )}
      </motion.div>

      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}
