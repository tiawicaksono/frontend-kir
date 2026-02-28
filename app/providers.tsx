"use client";

import { ThemeProvider } from "@/context/ThemeContext";
import { SidebarProvider } from "@/context/SidebarContext";
import { ThemeCustomizerProvider } from "@/context/ThemeCustomizerContext";
import { LayoutProvider } from "@/context/LayoutContext";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import SplashScreen from "@/components/common/SplashScreen";
import { AlertProvider } from "@/context/AlertContext";

function SplashController() {
  const { loading } = useAuth();

  return loading ? <SplashScreen show /> : null;
}

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <AlertProvider>
      <AuthProvider>
        <SplashController />
        <ThemeProvider>
          <LayoutProvider>
            <SidebarProvider>
              <ThemeCustomizerProvider>{children}</ThemeCustomizerProvider>
            </SidebarProvider>
          </LayoutProvider>
        </ThemeProvider>
      </AuthProvider>
    </AlertProvider>
  );
}
