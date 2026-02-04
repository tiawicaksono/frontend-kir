"use client";

import { ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";

const BackToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 50);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-24 right-6 bg-red-300 text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center"
      aria-label="Back to Top"
    >
      <ChevronUp size={24} />
    </button>
  );
};

export default BackToTopButton;
