"use client";

import { ThemeProvider } from "@/context/ThemeContext";
import { SidebarProvider } from "@/context/SidebarContext";
import { ThemeCustomizerProvider } from "@/context/ThemeCustomizerContext";
import { LayoutProvider } from "@/context/LayoutContext";
import { AuthProvider } from "@/context/AuthContext";
import { AlertProvider } from "@/context/AlertContext";
import SplashController from "@/context/SplashController";
import { RouteGuardProvider } from "@/context/RouteGuardProvider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <AlertProvider>
      <AuthProvider>
        <SplashController />
        <ThemeProvider>
          <LayoutProvider>
            <SidebarProvider>
              <ThemeCustomizerProvider>
                <RouteGuardProvider>{children}</RouteGuardProvider>
              </ThemeCustomizerProvider>
            </SidebarProvider>
          </LayoutProvider>
        </ThemeProvider>
      </AuthProvider>
    </AlertProvider>
  );
}
