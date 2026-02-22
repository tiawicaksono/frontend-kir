"use client";

import { ThemeProvider } from "@/context/ThemeContext";
import { SidebarProvider } from "@/context/SidebarContext";
import { ThemeCustomizerProvider } from "@/context/ThemeCustomizerContext";
import { LayoutProvider } from "@/context/LayoutContext";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import SplashScreen from "@/components/common/SplashScreen";

function SplashController() {
  const { loading } = useAuth();

  if (!loading) return null;
  return <SplashScreen />;
}

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
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
  );
}
