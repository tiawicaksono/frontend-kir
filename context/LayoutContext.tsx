"use client";

import { createContext, useContext, useEffect, useState } from "react";

type MenuLayout = "sidebar" | "top";

type LayoutContextType = {
  menuLayout: MenuLayout;
  setMenuLayout: (layout: MenuLayout) => void;
};

const LayoutContext = createContext<LayoutContextType | null>(null);

export function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [menuLayout, setMenuLayoutState] = useState<MenuLayout>("sidebar");

  /* LOAD SAVED LAYOUT */
  useEffect(() => {
    const saved = localStorage.getItem("menu-layout") as MenuLayout | null;

    if (saved) {
      setMenuLayoutState(saved);
    }
  }, []);

  /* UPDATE + SAVE */
  const setMenuLayout = (layout: MenuLayout) => {
    setMenuLayoutState(layout);

    localStorage.setItem("menu-layout", layout);
  };

  return (
    <LayoutContext.Provider
      value={{
        menuLayout,
        setMenuLayout,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
}

export function useLayout() {
  const ctx = useContext(LayoutContext);

  if (!ctx) {
    throw new Error("useLayout must be used inside LayoutProvider");
  }

  return ctx;
}
