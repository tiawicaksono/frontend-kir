"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useSidebar } from "@/context/SidebarContext";
import { usePathname } from "next/navigation";

import SidebarItem from "./SidebarItem";
import { formatMenuName } from "@/utils/formatMenuName";
import { useAuth } from "@/core/auth/auth.context";

export default function SidebarMenu() {
  const { isExpanded } = useSidebar();
  const pathname = usePathname();
  const { menus } = useAuth();

  const expanded = isExpanded;
  const compact = !isExpanded;

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  /* ===== AUTO OPEN BASED ON ROUTE ===== */
  useEffect(() => {
    menus.forEach((menu, index) => {
      if (menu.children?.some((c) => c.route === pathname)) {
        setOpenIndex(index);
      }
    });
  }, [pathname, menus]);

  return (
    <aside
      className="
    sticky top-0
    h-screen
    border-r
    bg-white dark:bg-slate-900
    border-slate-200 dark:border-slate-800
    overflow-visible
    relative z-[2000]
  "
    >
      <motion.div
        animate={{ width: expanded ? 288 : 80 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="
        sticky top-0
        h-screen
        border-r
        bg-white dark:bg-slate-900
        border-slate-200 dark:border-slate-800
        overflow-visible
        relative z-[2000]
      "
      >
        {/* ===== LOGO ===== */}
        <div className="relative min-h-[72px] mb-4 px-4 py-3 flex items-center">
          {/* FULL LOGO */}
          <motion.div
            animate={{
              opacity: expanded ? 1 : 0,
              x: expanded ? 0 : -12,
            }}
            transition={{ duration: 0.2 }}
            className="absolute left-4 origin-left"
          >
            <Image
              src="/images/logo/logo.svg"
              alt="logo"
              width={190}
              height={36}
              priority
              className="block dark:hidden"
            />

            <Image
              src="/images/logo/logo-dark.svg"
              alt="logo"
              width={190}
              height={36}
              priority
              className="hidden dark:block"
            />
          </motion.div>

          {/* COLLAPSE ICON */}
          <motion.div
            animate={{
              opacity: expanded ? 0 : 1,
              scale: expanded ? 0.85 : 1,
            }}
            transition={{ duration: 0.2 }}
            className="absolute left-1/2 -translate-x-1/2"
          >
            <Image
              src="/images/logo/logo-icon.svg"
              alt="logo icon"
              width={44}
              height={44}
              priority
            />
          </motion.div>
        </div>

        {/* ===== MENU ===== */}
        <nav className="px-3 space-y-8">
          <ul className="flex flex-col gap-3">
            {menus.map((menu, index) => (
              <SidebarItem
                key={menu.id}
                index={index}
                expanded={expanded}
                compact={compact}
                isOpen={openIndex === index}
                onToggle={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                name={formatMenuName(menu.code)}
                path={menu.route ?? undefined}
                subItems={menu.children?.map((c) => ({
                  name: formatMenuName(c.code),
                  path: c.route!,
                }))}
              />
            ))}
          </ul>
        </nav>
      </motion.div>
    </aside>
  );
}
