"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

interface BreadcrumbProps {
  pageTitle?: string;
}
const AutoBreadcrumb: React.FC<BreadcrumbProps> = ({ pageTitle }) => {
  const pathname = usePathname() || "/";

  const segments = pathname
    .split("/")
    .filter(Boolean)
    .map((segment, index, arr) => {
      const href = "/" + arr.slice(0, index + 1).join("/");
      const label = segment
        .replace(/-/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase());

      return { href, label };
    });

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
      <h2
        className="text-xl font-semibold text-gray-800 dark:text-white/90"
        x-text="pageName"
      >
        {pageTitle}
      </h2>
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
    </div>
  );
};

export default AutoBreadcrumb;
