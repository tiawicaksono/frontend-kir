"use client";

import { ThemeProvider } from "@/context/ThemeContext";
import { SidebarProvider } from "@/context/SidebarContext";
import { ThemeCustomizerProvider } from "@/context/ThemeCustomizerContext";
import { LayoutProvider } from "@/context/LayoutContext";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <LayoutProvider>
        <SidebarProvider>
          <ThemeCustomizerProvider>{children}</ThemeCustomizerProvider>
        </SidebarProvider>
      </LayoutProvider>
    </ThemeProvider>
  );
}
