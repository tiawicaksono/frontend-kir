"use client";

import { useEffect, useState } from "react";
import { Menu } from "@/types/menu";
import { getMenus } from "@/services/menu.service";
import SidebarItem from "@/components/sidebar/SidebarItem";
import { menuIconMap } from "@/icons/menuIcons";
import { formatMenuName } from "@/utils/formatMenuName";

export default function AppSidebar() {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    getMenus().then(setMenus);
  }, []);

  return (
    <aside className="w-64 border-r">
      <div className="px-4 py-3 font-bold">Sistem PKB</div>

      <ul className="space-y-1 px-2">
        {menus.map((menu, index) => {
          const Icon =
            menu.icon && menuIconMap[menu.code]
              ? menuIconMap[menu.code]
              : menuIconMap.default;

          return (
            <SidebarItem
              key={menu.id}
              name={formatMenuName(menu.code)}
              icon={Icon}
              path={menu.route ?? undefined}
              subItems={
                menu.children?.map((c) => ({
                  name: formatMenuName(c.code),
                  path: c.route!,
                })) ?? []
              }
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          );
        })}
      </ul>
    </aside>
  );
}
