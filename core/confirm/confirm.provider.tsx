"use client";

import { useState } from "react";
import { ConfirmContext, ConfirmOptions } from "./confirm.context";
import ConfirmDialog from "./confirm.dialog";

export function ConfirmProvider({ children }: { children: React.ReactNode }) {
  const [options, setOptions] = useState<ConfirmOptions | null>(null);
  const [resolver, setResolver] = useState<(value: boolean) => void>();

  const confirm = (opts: ConfirmOptions) => {
    setOptions(opts);

    return new Promise<boolean>((resolve) => {
      setResolver(() => resolve);
    });
  };

  const handleClose = (result: boolean) => {
    setOptions(null);
    resolver?.(result);
  };

  return (
    <ConfirmContext.Provider value={{ confirm }}>
      {children}

      {options && <ConfirmDialog options={options} onClose={handleClose} />}
    </ConfirmContext.Provider>
  );
}
