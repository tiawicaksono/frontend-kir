"use client";

import { ThemeProvider } from "@/context/ThemeContext";
import { SidebarProvider } from "@/context/SidebarContext";
import { ThemeCustomizerProvider } from "@/context/ThemeCustomizerContext";
import { LayoutProvider } from "@/context/LayoutContext";
import SplashController from "@/context/SplashController";
import { AuthGuardProvider } from "@/core/auth/auth.provider";
import { AuthProvider } from "@/core/auth/auth.context";
import { AlertProvider } from "@/core/alert/alert.provider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <AlertProvider>
      <ThemeProvider>
        <LayoutProvider>
          <SidebarProvider>
            <ThemeCustomizerProvider>
              <AuthProvider>
                <SplashController />
                <AuthGuardProvider>{children}</AuthGuardProvider>
              </AuthProvider>
            </ThemeCustomizerProvider>
          </SidebarProvider>
        </LayoutProvider>
      </ThemeProvider>
    </AlertProvider>
  );
}
