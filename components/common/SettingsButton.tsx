"use client";

import { Settings } from "lucide-react";
import { useThemeCustomizer } from "@/context/ThemeCustomizerContext";
import { useState } from "react";

export default function SettingsButton() {
  const { toggle } = useThemeCustomizer();
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={toggle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="
        fixed bottom-6 right-6
        bg-cyan-600 text-white
        p-4 rounded-full shadow-lg
        transition-transform hover:scale-110 z-999999
      "
      aria-label="Theme Settings"
    >
      <Settings
        size={24}
        style={{
          transition: "transform 0.5s ease",
          transform: hovered ? "rotate(180deg)" : "rotate(0deg)",
        }}
      />
    </button>
  );
}
