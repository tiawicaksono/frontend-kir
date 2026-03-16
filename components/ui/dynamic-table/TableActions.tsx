"use client";

import { MoreVertical } from "lucide-react";
import { useState } from "react";

export default function TableActions({ row, actions }: any) {
  const [open, setOpen] = useState(false);

  if (!actions) return null;

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)}>
        <MoreVertical size={18} />
      </button>

      {open && (
        <div className="absolute right-0 bg-white shadow rounded text-sm z-10">
          {actions.map((a: any, i: number) => (
            <button
              key={i}
              className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
              onClick={() => {
                a.onClick(row);
                setOpen(false);
              }}
            >
              {a.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
