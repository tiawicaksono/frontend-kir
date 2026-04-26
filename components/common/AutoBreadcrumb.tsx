"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

interface BreadcrumbProps {
  pageTitle?: string;
}

// optional override (kalau mau custom label)
const labelMap: Record<string, string> = {
  master: "Master",
  "data-kendaraan": "Data Kendaraan",
};

const isDynamicSegment = (segment: string) => {
  // angka (id)
  if (!isNaN(Number(segment))) return true;

  // UUID (opsional)
  if (/^[0-9a-fA-F-]{8,}$/.test(segment)) return true;

  return false;
};

const formatLabel = (segment: string) => {
  if (labelMap[segment]) return labelMap[segment];

  return segment.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
};

const AutoBreadcrumb: React.FC<BreadcrumbProps> = ({ pageTitle }) => {
  const pathname = usePathname() || "/";

  const rawSegments = pathname.split("/").filter(Boolean);

  const segments = rawSegments
    .filter((seg) => !isDynamicSegment(seg)) // 🔥 skip id
    .map((segment, index) => {
      const href =
        "/" + rawSegments.slice(0, rawSegments.indexOf(segment) + 1).join("/");

      return {
        href,
        label: formatLabel(segment),
      };
    });

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">
        {pageTitle}
      </h2>

      <nav className="flex items-center text-sm text-gray-500 dark:text-gray-400">
        <Link href="/" className="hover:text-gray-900 dark:hover:text-white">
          Home
        </Link>

        {segments.map((item, i) => {
          const isLast = i === segments.length - 1;

          return (
            <span key={item.href} className="flex items-center">
              <ChevronRight className="mx-2 h-4 w-4" />

              {isLast ? (
                <span className="text-gray-900 dark:text-white">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="hover:text-gray-900 dark:hover:text-white"
                >
                  {item.label}
                </Link>
              )}
            </span>
          );
        })}
      </nav>
    </div>
  );
};

export default AutoBreadcrumb;
