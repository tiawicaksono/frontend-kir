"use client";

import { ThemeProvider } from "@/context/ThemeContext";
import { SidebarProvider } from "@/context/SidebarContext";
import { ThemeCustomizerProvider } from "@/context/ThemeCustomizerContext";
import { LayoutProvider } from "@/context/LayoutContext";
import { AuthProvider } from "@/context/AuthContext";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
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
