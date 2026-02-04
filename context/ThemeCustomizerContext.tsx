"use client";

import { createContext, useContext, useState } from "react";

type ThemeCustomizerContextType = {
  open: boolean;
  toggle: () => void;
  close: () => void;
};

const ThemeCustomizerContext = createContext<ThemeCustomizerContextType | null>(
  null,
);

export const ThemeCustomizerProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen((prev) => !prev);
  const close = () => setOpen(false);

  return (
    <ThemeCustomizerContext.Provider value={{ open, toggle, close }}>
      {children}
    </ThemeCustomizerContext.Provider>
  );
};

export const useThemeCustomizer = () => {
  const context = useContext(ThemeCustomizerContext);
  if (!context) {
    throw new Error(
      "useThemeCustomizer must be used within ThemeCustomizerProvider",
    );
  }
  return context;
};
