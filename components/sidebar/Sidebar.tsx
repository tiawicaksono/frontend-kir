"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useSidebar } from "@/context/SidebarContext";
import { usePathname } from "next/navigation";

import SidebarItem from "./SidebarItem";
import { getMenus } from "@/services/menu.service";
import { formatMenuName } from "@/utils/formatMenuName";
import { Menu } from "@/types/menu";

export default function Sidebar() {
  const { isExpanded } = useSidebar();
  const pathname = usePathname();

  const expanded = isExpanded;
  const compact = !isExpanded;

  const [menus, setMenus] = useState<Menu[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  /* ================= FETCH MENU ================= */
  useEffect(() => {
    getMenus().then((res) => {
      setMenus(res ?? []);
    });
  }, []);

  /* ===== AUTO OPEN BASED ON ROUTE ===== */
  useEffect(() => {
    menus.forEach((menu, index) => {
      if (menu.children?.some((c) => c.route === pathname)) {
        setOpenIndex(index);
      }
    });
  }, [pathname, menus]);

  return (
    <motion.aside
      animate={{ width: expanded ? 288 : 80 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="
        fixed lg:static top-0 left-0 z-40
        h-screen border-r
        bg-white dark:bg-slate-900
        border-slate-200 dark:border-slate-800
        overflow-visible
      "
    >
      {/* ===== LOGO ===== */}
      <div className="p-6">
        <Image
          src={
            expanded ? "/images/logo/logo.svg" : "/images/logo/logo-icon.svg"
          }
          alt="logo"
          width={expanded ? 140 : 32}
          height={32}
          className="dark:invert"
        />
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
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
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
    </motion.aside>
  );
}
