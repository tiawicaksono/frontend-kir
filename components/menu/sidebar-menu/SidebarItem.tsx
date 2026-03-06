"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { ChevronDown, MenuSquareIcon } from "lucide-react";

interface SubItem {
  name: string;
  path: string;
}

interface Props {
  index: number;
  name: string;
  path?: string;
  subItems?: SubItem[];
  expanded: boolean;
  compact: boolean;
  isOpen: boolean;
  onToggle: () => void;
}

export default function SidebarItem({
  name,
  path,
  subItems = [],
  expanded,
  compact,
  isOpen,
  onToggle,
}: Props) {
  const pathname = usePathname();
  const hasSubmenu = subItems.length > 0;

  /* ===== FLYOUT STATE ===== */
  const [hovered, setHovered] = useState(false);
  const hoverTimer = useRef<NodeJS.Timeout | null>(null);
  const closeTimer = useRef<NodeJS.Timeout | null>(null);

  const isActive =
    pathname === path || subItems.some((s) => s.path === pathname);

  /* ===== FLYOUT LOGIC ===== */
  const openHover = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    hoverTimer.current = setTimeout(() => {
      setHovered(true);
    }, 120);
  };

  const closeHover = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    closeTimer.current = setTimeout(() => {
      setHovered(false);
    }, 200);
  };

  return (
    <li
      className="relative"
      onMouseEnter={() => compact && openHover()}
      onMouseLeave={() => compact && closeHover()}
    >
      {!hasSubmenu && path ? (
        /* ============ LINK (NO SUBMENU) ============ */
        <Link
          href={path}
          className={`
        menu-item group
        ${isActive ? "menu-item-active" : "menu-item-inactive"}
        ${expanded ? "justify-start" : "justify-center"}
      `}
        >
          <motion.div
            animate={{ scale: isActive ? 1.1 : 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <MenuSquareIcon
              size={20}
              className={`${isActive && "icon-active"} icon-inactive`}
            />
          </motion.div>

          {expanded && <span>{name}</span>}
        </Link>
      ) : (
        /* ============ BUTTON (HAS SUBMENU) ============ */
        <button
          type="button"
          onClick={() => expanded && hasSubmenu && onToggle()}
          onMouseEnter={() => compact && openHover()}
          onMouseLeave={() => compact && closeHover()}
          className={`
        menu-item group
        ${isActive ? "menu-item-active" : "menu-item-inactive"}
        ${expanded ? "justify-start" : "justify-center"}
      `}
        >
          <motion.div
            animate={{ scale: isOpen ? 1.1 : 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <MenuSquareIcon
              size={20}
              className={`${isActive && "icon-active"} icon-inactive`}
            />
          </motion.div>

          {expanded && <span>{name}</span>}

          {expanded && hasSubmenu && (
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="ml-auto"
            >
              <ChevronDown className="h-4 w-4" />
            </motion.div>
          )}
        </button>
      )}

      {/* ================= FLUID SUBMENU ================= */}
      {expanded && hasSubmenu && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: isOpen ? "auto" : 0,
            opacity: isOpen ? 1 : 0,
          }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <ul className="ml-9 mt-2 space-y-1">
            {subItems.map((sub) => (
              <li key={sub.path}>
                <Link
                  href={sub.path}
                  className={`block rounded-md px-3 py-2 text-sm transition-colors
                    ${
                      pathname === sub.path
                        ? "menu-dropdown-item-active"
                        : "menu-dropdown-item-inactive"
                    }
                  `}
                >
                  <span>{sub.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* ================= FLYOUT ================= */}
      <AnimatePresence>
        {compact && hovered && (
          <motion.div
            initial={{ opacity: 0, x: -8, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute left-18 top-0 z-[1200]"
            onMouseEnter={() => {
              if (closeTimer.current) clearTimeout(closeTimer.current);
            }}
            onMouseLeave={() => closeHover()}
          >
            {/* HOVER BRIDGE */}
            <div className="absolute -left-4 top-0 h-full w-4" />

            {/* ARROW */}
            <div className="absolute -left-2 top-4 w-3 h-3 rotate-45 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md shadow-sm" />

            {/* PANEL */}
            <div className="min-w-55 rounded-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-xl border p-4">
              <p className="menu-item">{name}</p>

              {subItems.length > 0 && (
                <ul className="space-y-1">
                  {subItems.map((sub) => (
                    <li key={sub.path}>
                      <Link
                        href={sub.path}
                        className={`block rounded-md px-3 py-2 text-sm
                ${
                  pathname === sub.path
                    ? "menu-dropdown-item-active"
                    : "menu-dropdown-item-inactive"
                }
              `}
                      >
                        {sub.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}
