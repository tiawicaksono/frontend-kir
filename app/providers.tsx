"use client";

import { ThemeProvider } from "@/context/ThemeContext";
import { SidebarProvider } from "@/context/SidebarContext";
import { ThemeCustomizerProvider } from "@/context/ThemeCustomizerContext";
import { LayoutProvider } from "@/context/LayoutContext";
import { AlertProvider } from "@/context/AlertContext";
import SplashController from "@/context/SplashController";
import { AuthGuardProvider } from "@/auth/auth.provider";
import { AuthProvider } from "@/auth/auth.context";

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
