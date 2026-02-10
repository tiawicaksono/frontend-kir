"use client";

import { Check } from "lucide-react";
import { motion } from "framer-motion";
import clsx from "clsx";

type Props = {
  label: "Sidebar" | "Top Menu";
  active: boolean;
  onClick: () => void;
};

export default function MenuPreview({ label, active, onClick }: Props) {
  const isTop = label === "Top Menu";

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
          "bg-slate-100 dark:bg-slate-800",
        )}
      >
        {isTop ? (
          <>
            {/* Top bar */}
            <div className="h-3 w-full rounded bg-blue-300 dark:bg-slate-600 mb-2" />
            <div className="flex-1 rounded bg-white dark:bg-slate-700" />
          </>
        ) : (
          <div className="flex h-full gap-2">
            <div className="w-5 rounded bg-blue-300 dark:bg-slate-600" />
            <div className="flex-1 rounded bg-white dark:bg-slate-700" />
          </div>
        )}

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
