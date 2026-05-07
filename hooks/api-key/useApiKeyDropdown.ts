import { useState } from "react";

export function useApiKeyDropdown() {
  const [openId, setOpenId] = useState<number | null>(null);
  const [isHeaderOpen, setIsHeaderOpen] = useState(false);

  const toggleDropdown = (id: number) =>
    setOpenId((prev) => (prev === id ? null : id));

  const closeDropdown = () => setOpenId(null);

  const toggleHeader = () => setIsHeaderOpen((prev) => !prev);
  const closeHeader = () => setIsHeaderOpen(false);

  return {
    openId,
    isHeaderOpen,
    toggleDropdown,
    closeDropdown,
    toggleHeader,
    closeHeader,
  };
}
