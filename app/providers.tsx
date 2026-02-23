"use client";

import { ThemeProvider } from "@/context/ThemeContext";
import { SidebarProvider } from "@/context/SidebarContext";
import { ThemeCustomizerProvider } from "@/context/ThemeCustomizerContext";
import { LayoutProvider } from "@/context/LayoutContext";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import SplashScreen from "@/components/common/SplashScreen";
import { ToastProvider } from "@/context/ToastContext";

function SplashController() {
  const { loading } = useAuth();

  return loading ? <SplashScreen show /> : null;
}

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <SplashController />
      <ToastProvider>
        <ThemeProvider>
          <LayoutProvider>
            <SidebarProvider>
              <ThemeCustomizerProvider>{children}</ThemeCustomizerProvider>
            </SidebarProvider>
          </LayoutProvider>
        </ThemeProvider>
      </ToastProvider>
    </AuthProvider>
  );
}
