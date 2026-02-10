"use client";

import { AnimatePresence } from "framer-motion";
import { useThemeCustomizer } from "@/context/ThemeCustomizerContext";
import {
  ThemeCustomizerOverlay,
  ThemeCustomizerDrawer,
} from "@/components/theme-customizer";

export default function ThemeCustomizer() {
  const { open, close } = useThemeCustomizer();

  return (
    <AnimatePresence>
      {open && (
        <>
          <ThemeCustomizerOverlay onClose={close} />
          <ThemeCustomizerDrawer />
        </>
      )}
    </AnimatePresence>
  );
}
