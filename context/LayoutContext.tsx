"use client";

import { createContext, useContext, useState } from "react";

type MenuLayout = "sidebar" | "top";

type LayoutContextType = {
  menuLayout: MenuLayout;
  setMenuLayout: (layout: MenuLayout) => void;
};

const LayoutContext = createContext<LayoutContextType | null>(null);

export function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [menuLayout, setMenuLayout] = useState<MenuLayout>("sidebar");

  return (
    <LayoutContext.Provider value={{ menuLayout, setMenuLayout }}>
      {children}
    </LayoutContext.Provider>
  );
}

export function useLayout() {
  const ctx = useContext(LayoutContext);
  if (!ctx) throw new Error("useLayout must be used inside LayoutProvider");
  return ctx;
}
