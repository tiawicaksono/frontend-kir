"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

const LABEL_MAP: Record<string, string> = {
  dashboard: "Dashboard",
  analytics: "Analytics",
  forms: "Forms",
  "form-elements": "Form Elements",
  pages: "Pages",
  "error-404": "Error 404",
  profile: "Profile",
  calendar: "Calendar",
};

export default function AutoBreadcrumb() {
  const pathname = usePathname();

  const segments = pathname
    .split("/")
    .filter(Boolean)
    .map((segment, index, arr) => {
      const href = "/" + arr.slice(0, index + 1).join("/");
      const label =
        LABEL_MAP[segment] ||
        segment.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

      return { href, label };
    });

  return (
    <nav className="flex items-center text-sm text-gray-500 dark:text-gray-400">
      <Link href="/" className="hover:text-gray-900 dark:hover:text-white">
        Home
      </Link>

      {segments.map((item) => (
        <span key={item.href} className="flex items-center">
          <ChevronRight className="mx-2 h-4 w-4" />
          <Link
            href={item.href}
            className="hover:text-gray-900 dark:hover:text-white"
          >
            {item.label}
          </Link>
        </span>
      ))}
    </nav>
  );
}
