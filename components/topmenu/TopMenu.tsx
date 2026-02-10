"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, MenuIcon } from "lucide-react";
import { useEffect, useState } from "react";
import clsx from "clsx";

import { useSidebar } from "@/context/SidebarContext";
import { getMenus } from "@/services/menu.service";
import { Menu } from "@/types/menu";
import { formatMenuName } from "@/utils/formatMenuName";
import { useLayout } from "@/context/LayoutContext";

export default function TopMenu() {
  const pathname = usePathname();
  const { toggleSidebar } = useSidebar();

  const [menus, setMenus] = useState<Menu[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { menuLayout } = useLayout();

  /* ================= FETCH MENU ================= */
  useEffect(() => {
    getMenus().then((res) => {
      setMenus(res ?? []);
    });
  }, []);

  /* ===== AUTO OPEN BASED ON ROUTE ===== */
  // useEffect(() => {
  //   menus.forEach((menu, index) => {
  //     if (menu.children?.some((c) => c.route === pathname)) {
  //       setOpenIndex(index);
  //     }
  //   });
  // }, [pathname, menus]);
  useEffect(() => {
    const handleMenuLayoutChange = () => {
      if (menuLayout === "top") {
        setOpenIndex(null);
      }
    };
    handleMenuLayoutChange();
    return () => handleMenuLayoutChange();
  }, [menuLayout]);

  return (
    <nav className="sticky top-0 z-30 border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-(--breakpoint-2xl) items-center px-4 md:px-6">
        {/* Mobile toggle */}
        <button
          onClick={toggleSidebar}
          className="mr-3 rounded-lg p-2 md:hidden hover:bg-black/5 dark:hover:bg-white/10"
        >
          <MenuIcon size={20} />
        </button>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-6">
          {menus.map((menu, index) => {
            const hasSubmenu = !!menu.children?.length;
            const isOpen = openIndex === index;

            const isActive =
              pathname === menu.route ||
              menu.children?.some((c) => c.route === pathname);

            /* ================= MENU WITH SUB ================= */
            if (hasSubmenu) {
              return (
                <div
                  key={menu.id}
                  className="relative"
                  onMouseEnter={() => setOpenIndex(index)}
                  onMouseLeave={() => setOpenIndex(null)}
                >
                  <button
                    className={clsx(
                      "flex items-center gap-1 text-sm font-medium transition",
                      isActive
                        ? "text-blue-600"
                        : "text-slate-700 dark:text-slate-300",
                    )}
                  >
                    {formatMenuName(menu.code)}
                    <ChevronDown
                      size={14}
                      className={clsx(
                        "transition-transform",
                        isOpen && "rotate-180",
                      )}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.18, ease: "easeOut" }}
                        className="absolute top-full left-0 mt-3 min-w-[220px] rounded-xl border
                          bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl
                          shadow-xl overflow-hidden"
                      >
                        <ul className="py-2">
                          {menu.children!.map((child) => (
                            <li key={child.id}>
                              <Link
                                href={child.route!}
                                className={clsx(
                                  "block px-4 py-2 text-sm transition-colors",
                                  pathname === child.route
                                    ? "bg-blue-50 text-blue-600"
                                    : "hover:bg-black/5 dark:hover:bg-white/10",
                                )}
                              >
                                {formatMenuName(child.code)}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            /* ================= SINGLE MENU ================= */
            return (
              <Link
                key={menu.id}
                href={menu.route!}
                className={clsx(
                  "flex items-center gap-1 text-sm font-medium transition",
                  isActive
                    ? "text-blue-600"
                    : "text-slate-700 dark:text-slate-300",
                )}
              >
                {formatMenuName(menu.code)}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
