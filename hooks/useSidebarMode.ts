"use client";

export type SidebarMode = "fluid" | "box";

/**
 * fluid = sidebar seperti master (expand + height submenu)
 * box   = sidebar kecil + flyout submenu
 */
export const useSidebarMode = (): SidebarMode => {
  // sementara hardcode
  // nanti bisa kamu sambungkan ke setting / toggle
  return "fluid"; // ganti ke "box" kalau mau
};
