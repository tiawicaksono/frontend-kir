"use client";

import { X } from "lucide-react";
import { motion } from "framer-motion";
import clsx from "clsx";
import { useTheme } from "@/context/ThemeContext";
import { useSidebar } from "@/context/SidebarContext";
import { useThemeCustomizer } from "@/context/ThemeCustomizerContext";
import Section from "./Section";
import ThemePreview from "./ThemePreview";
import LayoutPreview from "./LayoutPreview";

export default function ThemeCustomizerDrawer() {
  const { theme, toggleTheme } = useTheme();
  const { isExpanded, toggleSidebar } = useSidebar();
  const { close } = useThemeCustomizer();

  return (
    <motion.aside
      key="drawer"
      initial={{ x: 380, opacity: 0.8 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 380, opacity: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 30 }}
      className={clsx(
        "fixed top-0 right-0 z-50 h-full w-90",
        "bg-white dark:bg-slate-900 shadow-2xl",
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-slate-800">
        <h2 className="font-semibold tracking-wide">Theme Customizer</h2>
        <button
          onClick={close}
          className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition"
        >
          <X size={20} />
        </button>
      </div>

      {/* Content */}
      <div className="p-5 space-y-6 text-sm">
        <Section title="Theme Scheme" subTitle="Choose Light or Dark Mode">
          <div className="flex gap-4">
            <ThemePreview
              label="Light"
              mode="light"
              active={theme === "light"}
              onClick={() => theme !== "light" && toggleTheme()}
            />
            <ThemePreview
              label="Dark"
              mode="dark"
              active={theme === "dark"}
              onClick={() => theme !== "dark" && toggleTheme()}
            />
          </div>
        </Section>

        <Section
          title="Menu (Navigation)"
          subTitle="Choose Expanded or Collapsed"
        >
          <div className="flex gap-4">
            <LayoutPreview
              label="Expanded"
              active={isExpanded}
              onClick={toggleSidebar}
            />
            <LayoutPreview
              label="Collapsed"
              active={!isExpanded}
              onClick={toggleSidebar}
            />
          </div>
        </Section>
      </div>
    </motion.aside>
  );
}
