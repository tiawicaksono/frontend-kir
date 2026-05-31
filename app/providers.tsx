"use client";

import { ThemeProvider } from "@/context/ThemeContext";
import { SidebarProvider } from "@/context/SidebarContext";
import { ThemeCustomizerProvider } from "@/context/ThemeCustomizerContext";
import { LayoutProvider } from "@/context/LayoutContext";
import SplashController from "@/context/SplashController";

import { AuthProvider } from "@/core/auth/auth.context";
import { AuthGuardProvider } from "@/core/auth/auth.provider";

import { AlertProvider } from "@/core/alert/alert.provider";
import { ConfirmProvider } from "@/core/confirm/confirm.provider";
import { ModalProvider } from "@/core/modal/modal.provider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <AlertProvider>
      <ThemeProvider>
        <LayoutProvider>
          <SidebarProvider>
            <ThemeCustomizerProvider>
              {/* 🔥 AUTH HARUS DI DALAM CLIENT BOUNDARY */}
              <AuthProvider>
                <ConfirmProvider>
                  <ModalProvider>
                    <SplashController />

                    {/* ⚠️ Guard HARUS PALING DALAM */}
                    <AuthGuardProvider>{children}</AuthGuardProvider>
                  </ModalProvider>
                </ConfirmProvider>
              </AuthProvider>
            </ThemeCustomizerProvider>
          </SidebarProvider>
        </LayoutProvider>
      </ThemeProvider>
    </AlertProvider>
  );
}
