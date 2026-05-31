"use client";

import { useState } from "react";

import { ModalContext, ModalOptions } from "./modal.context";

import ModalDialog from "./modal.dialog";

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [options, setOptions] = useState<ModalOptions | null>(null);

  const openModal = (options: ModalOptions) => {
    setOptions(options);
  };

  const closeModal = () => {
    setOptions(null);
  };

  return (
    <ModalContext.Provider
      value={{
        openModal,
        closeModal,
      }}
    >
      {children}

      {options && <ModalDialog options={options} onClose={closeModal} />}
    </ModalContext.Provider>
  );
}
