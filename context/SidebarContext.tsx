"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type SidebarContextType = {
  isExpanded: boolean;
  isMobileOpen: boolean;
  isHovered: boolean;
  toggleSidebar: () => void;
  toggleMobileSidebar: () => void;
  setIsHovered: (v: boolean) => void;
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const useSidebar = () => {
  const ctx = useContext(SidebarContext);
  if (!ctx) throw new Error("useSidebar must be used within SidebarProvider");
  return ctx;
};

export const SidebarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  /** ✅ SSR-safe + no effect */
  const [isExpanded, setIsExpanded] = useState<boolean>(() => {
    if (typeof window === "undefined") return true;
    return localStorage.getItem("sidebarExpanded") !== "false";
  });

  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  /** ✅ effect hanya untuk sync ke external system */
  useEffect(() => {
    localStorage.setItem("sidebarExpanded", String(isExpanded));
  }, [isExpanded]);

  const toggleSidebar = () => setIsExpanded((p) => !p);
  const toggleMobileSidebar = () => setIsMobileOpen((p) => !p);

  return (
    <SidebarContext.Provider
      value={{
        isExpanded,
        isMobileOpen,
        isHovered,
        toggleSidebar,
        toggleMobileSidebar,
        setIsHovered,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};
