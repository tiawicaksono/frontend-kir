"use client";

import { ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";

const BackToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const container = document.getElementById("main-scroll");
    const toggleVisibility = () => {
      if (container) {
        setVisible(container.scrollTop > 150);
      }
    };

    toggleVisibility(); // cek posisi awal (misal reload di tengah)

    container?.addEventListener("scroll", toggleVisibility);

    return () => {
      container?.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    const container = document.getElementById("main-scroll");
    container?.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-24 right-6 p-4 bg-red-300 text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform z-50"
    >
      <ChevronUp size={24} />
    </button>
  );
};

export default BackToTopButton;
