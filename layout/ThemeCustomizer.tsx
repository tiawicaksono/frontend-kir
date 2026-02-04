"use client";

import { X } from "lucide-react";
import { useThemeCustomizer } from "@/context/ThemeCustomizerContext";
import { useTheme } from "@/context/ThemeContext";
import { useSidebar } from "@/context/SidebarContext";

export default function ThemeCustomizer() {
  const { theme, toggleTheme } = useTheme();
  const { open, close } = useThemeCustomizer();
  const { isExpanded, toggleSidebar } = useSidebar();

  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          onClick={close}
          className="
      fixed inset-0 z-40
      bg-black/30 dark:bg-black/60
      backdrop-blur-sm
    "
        />
      )}

      {/* Drawer */}
      <aside
        className={`
    fixed top-0 right-0 h-full w-90 z-50
    bg-white text-slate-900
    dark:bg-slate-900 dark:text-slate-100
    shadow-2xl
    transform transition-transform duration-300
    ${open ? "translate-x-0" : "translate-x-full"}
  `}
      >
        {/* Header */}
        <div
          className="
    flex items-center justify-between px-5 py-4 border-b
    border-slate-200 dark:border-white/10
    bg-slate-100 dark:bg-slate-800
  "
        >
          <h2 className="font-semibold tracking-wide">Theme Customizer</h2>
          <button
            onClick={close}
            className="text-slate-400 hover:text-white transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-6 text-sm">
          <Section title="Layout">
            <div className="grid grid-cols-3 gap-3">
              <Option label="Vertical" />
              <Option label="Horizontal" />
              <Option label="Two Column" />
            </div>
          </Section>

          <Section title="Color Scheme">
            <div className="flex gap-3">
              <Option
                label="Light"
                active={theme === "light"}
                onClick={() => theme !== "light" && toggleTheme()}
              />
              <Option
                label="Dark"
                active={theme === "dark"}
                onClick={() => theme !== "dark" && toggleTheme()}
              />
            </div>
          </Section>

          <Section title="Layout Width">
            <div className="flex gap-3">
              <Option
                label="Fluid"
                active={isExpanded}
                onClick={toggleSidebar}
              />
              <Option
                label="Boxed"
                active={!isExpanded}
                onClick={toggleSidebar}
              />
            </div>
          </Section>
        </div>
      </aside>
    </>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h3 className="mb-3 font-medium text-slate-300 uppercase text-xs tracking-wider">
        {title}
      </h3>
      {children}
    </section>
  );
}

function Option({
  label,
  active = false,
  onClick,
}: {
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        w-full rounded-lg border px-3 py-2 text-center transition
        ${
          active
            ? "border-blue-500 bg-blue-500/10 text-blue-600 dark:text-blue-400"
            : `
              border-slate-300 text-slate-600
              hover:bg-slate-100
              dark:border-white/10 dark:text-slate-300
              dark:hover:bg-white/5
            `
        }
      `}
    >
      {label}
    </button>
  );
}
