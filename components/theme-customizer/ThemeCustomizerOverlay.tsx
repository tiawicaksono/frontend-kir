"use client";

import { motion } from "framer-motion";

export default function ThemeCustomizerOverlay({
  onClose,
}: {
  onClose: () => void;
}) {
  return (
    <motion.div
      key="overlay"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="fixed inset-0 z-40 bg-black/30 dark:bg-black/60 backdrop-blur-sm"
    />
  );
}
