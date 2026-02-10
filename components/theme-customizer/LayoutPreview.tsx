"use client";

import { Check } from "lucide-react";
import { motion } from "framer-motion";
import clsx from "clsx";

type Props = {
  label: "Expanded" | "Collapsed";
  active: boolean;
  onClick: () => void;
};

export default function LayoutPreview({ label, active, onClick }: Props) {
  const isBoxed = label === "Collapsed";

  return (
    <button
      type="button"
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
          "bg-slate-100 dark:bg-slate-800",
        )}
      >
        {!isBoxed ? (
          /* ---------------- BOXED (kayak ThemePreview) ---------------- */
          <div className="flex h-full gap-2">
            {/* Sidebar */}
            <div className="w-5 rounded-md bg-slate-200 dark:bg-slate-700 p-1 space-y-1">
              {[1, 2, 3, 4].map((i) => (
                <span
                  key={i}
                  className="block h-1.5 rounded bg-blue-300 dark:bg-slate-500"
                />
              ))}
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col gap-1">
              <span className="h-2 rounded bg-slate-300 dark:bg-slate-600" />
              <span className="mt-auto h-2 rounded bg-slate-300 dark:bg-slate-600" />
            </div>
          </div>
        ) : (
          /* ---------------- FLUID (design lama, full width) ---------------- */
          <div className="mx-auto h-full w-full rounded-md bg-white dark:bg-slate-700" />
        )}

        {active && (
          <span className="absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-white">
            <Check size={12} />
          </span>
        )}
      </motion.div>

      <span className="text-sm font-medium dark:invert">{label}</span>
    </button>
  );
}
