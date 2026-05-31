"use client";

import { createContext } from "react";

export interface ModalRenderProps {
  close: () => void;
}

export interface ModalOptions {
  content: React.ReactNode | ((props: ModalRenderProps) => React.ReactNode);

  className?: string;
  showCloseButton?: boolean;
  isFullscreen?: boolean;
}

export interface ModalContextType {
  openModal: (options: ModalOptions) => void;
  closeModal: () => void;
}

export const ModalContext = createContext<ModalContextType | null>(null);
