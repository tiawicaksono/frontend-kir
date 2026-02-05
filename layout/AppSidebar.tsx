"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useSidebar } from "../context/SidebarContext";
import {
  CalenderIcon,
  ChevronDownIcon,
  GridIcon,
  UserCircleIcon,
  ListIcon,
  TableIcon,
  PageIcon,
} from "../icons";

/* ========================================================= */

type NavItem = {
  name: string;
  icon: string;
  path?: string;
  subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
};

/* ========================================================= */

const navItems: NavItem[] = [
  {
    icon: GridIcon.src,
    name: "Dashboard",
    subItems: [{ name: "Ecommerce", path: "/" }],
  },
  { icon: CalenderIcon.src, name: "Calendar", path: "/calendar" },
  { icon: UserCircleIcon.src, name: "User Profile", path: "/profile" },
  {
    icon: ListIcon.src,
    name: "Forms",
    subItems: [{ name: "Form Elements", path: "/form-elements" }],
  },
  {
    icon: TableIcon.src,
    name: "Tables",
    subItems: [{ name: "Basic Tables", path: "/basic-tables" }],
  },
  {
    icon: PageIcon.src,
    name: "Pages",
    subItems: [
      { name: "Blank Page", path: "/blank" },
      { name: "404 Error", path: "/error-404" },
    ],
  },
];
/* ========================================================= */

export default function AppSidebar() {
  const { isExpanded } = useSidebar();
  const pathname = usePathname();

  /* MODE */
  const expanded = isExpanded; // FLUID
  const compact = !isExpanded; // BOX

  /* ACCORDION (FLUID MODE) */
  const [openSubmenu, setOpenSubmenu] = useState<number | null>(null);
  const [heights, setHeights] = useState<Record<number, number>>({});
  const subMenuRefs = useRef<Record<number, HTMLDivElement | null>>({});

  /* FLYOUT (BOX MODE) */
  const [hovered, setHovered] = useState<number | null>(null);
  const hoverTimer = useRef<NodeJS.Timeout | null>(null);

  const isActive = useCallback((path: string) => pathname === path, [pathname]);

  /* ========================================================= */

  useEffect(() => {
    if (openSubmenu !== null) {
      const ref = subMenuRefs.current[openSubmenu];
      if (ref) {
        setHeights((prev) => ({
          ...prev,
          [openSubmenu]: ref.scrollHeight,
        }));
      }
    }
  }, [openSubmenu]);

  const handleHover = (index: number) => {
    hoverTimer.current = setTimeout(() => setHovered(index), 120);
  };

  const clearHover = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    setHovered(null);
  };

  /* ========================================================= */

  const renderItems = (items: NavItem[]) => (
    <ul className="flex flex-col gap-3">
      {items.map((item, index) => {
        const isOpen = openSubmenu === index;

        return (
          <li key={item.name} className="relative">
            {/* ================= BUTTON ================= */}
            <button
              onClick={() => expanded && setOpenSubmenu(isOpen ? null : index)}
              onMouseEnter={() => compact && handleHover(index)}
              onMouseLeave={() => compact && clearHover()}
              className={`menu-item group ${isOpen && "menu-item-active"} ${
                expanded ? "justify-start" : "justify-center"
              }`}
            >
              <Image
                src={item.icon}
                alt=""
                width={20}
                height={20}
                className={`${isOpen && "icon-active"} dark:invert`}
              />
              {expanded && <span className="menu-item-text">{item.name}</span>}
              {expanded && item.subItems && (
                <Image
                  src={ChevronDownIcon.src}
                  alt="chevron"
                  width={20}
                  height={20}
                  className={`ml-auto transition ${isOpen && "rotate-180 icon-active"} dark:invert`}
                />
              )}
            </button>

            {/* ================= FLUID SUBMENU ================= */}
            {expanded && item.subItems && (
              <div
                ref={(el) => {
                  if (el) {
                    subMenuRefs.current[index] = el;
                  }
                }}
                className="overflow-hidden transition-all duration-300"
                style={{
                  height: isOpen ? heights[index] || 0 : 0,
                }}
              >
                <ul className="ml-9 mt-2 space-y-1">
                  {item.subItems.map((sub) => (
                    <li key={sub.name}>
                      <Link
                        href={sub.path}
                        className={`menu-dropdown-item ${
                          isActive(sub.path) ? "menu-dropdown-item-active" : ""
                        }`}
                      >
                        {sub.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* ================= FLYOUT ================= */}
            <AnimatePresence>
              {compact && hovered === index && item.subItems && (
                <motion.div
                  initial={{ opacity: 0, x: -10, scale: 0.98 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.18 }}
                  className="absolute left-18 top-0 z-50"
                >
                  {/* ARROW */}
                  <div className="absolute -left-2 top-4 w-3 h-3 rotate-45 bg-white/80 backdrop-blur" />

                  {/* PANEL */}
                  <div className="min-w-55 rounded-xl bg-white/80 backdrop-blur-xl shadow-xl p-4">
                    <p className="mb-2 text-sm font-semibold">{item.name}</p>

                    <ul className="space-y-1">
                      {item.subItems.map((sub) => (
                        <li key={sub.name}>
                          <Link
                            href={sub.path}
                            className="block rounded-md px-3 py-2 text-sm hover:bg-black/5"
                          >
                            {sub.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );

  /* ========================================================= */

  return (
    <aside
      className={`
    fixed lg:static top-0 left-0 z-40
    h-screen border-r
    bg-white dark:bg-slate-900
    border-slate-200 dark:border-slate-800

    text-slate-800 dark:text-slate-100

    transition-[width,background-color,border-color] 
    duration-300 ease-out

    ${expanded ? "w-72" : "w-20"}
  `}
    >
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

      <nav className="px-3 space-y-8">{renderItems(navItems)}</nav>
    </aside>
  );
}
