"use client";

import { ChevronDown, LayoutDashboardIcon, MenuIcon } from "lucide-react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";

interface SubItem {
  name: string;
  path: string;
}

interface Props {
  name: string;
  icon: string;
  path?: string;
  subItems?: SubItem[];
  isOpen: boolean;
  onToggle: () => void;
}

export default function SidebarItem({
  name,
  icon,
  path,
  subItems = [],
  isOpen,
  onToggle,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const hasSubmenu = subItems.length > 0;

  const isActive =
    pathname === path || subItems.some((s) => pathname === s.path);

  return (
    <li>
      {/* ===== Parent ===== */}
      <button
        onClick={() => {
          if (hasSubmenu) onToggle();
          else if (path) router.push(path);
        }}
        className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition
          ${isActive ? "bg-blue-600 text-white" : "hover:bg-slate-100"}
        `}
      >
        {/* ✅ Icon */}
        {/* {icon ? (
          <Image
            src={icon}
            alt={`${name} icon`}
            width={16}
            height={16}
            className="h-4 w-4"
          />
        ) : ( */}
        <LayoutDashboardIcon className="h-4 w-4" />
        {/* )} */}

        <span className="flex-1 text-left">{name}</span>

        {/* ✅ Chevron ONLY jika ada submenu */}
        {hasSubmenu && (
          <ChevronDown
            className={`h-4 w-4 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        )}
      </button>

      {/* ===== Sub Menu ===== */}
      {hasSubmenu && isOpen && (
        <ul className="mt-1 space-y-1 pl-9">
          {subItems.map((sub) => (
            <li key={sub.path}>
              <button
                onClick={() => router.push(sub.path)}
                className={`w-full rounded-md px-3 py-2 text-left text-sm transition
                  ${
                    pathname === sub.path
                      ? "bg-slate-200 font-semibold"
                      : "hover:bg-slate-100"
                  }
                `}
              >
                {sub.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}
