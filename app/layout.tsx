import { Outfit } from "next/font/google";
import "./globals.css";

import AppHeader from "@/layout/AppHeader";
// import AppSidebar from "@/layout/AppSidebar";
import { ThemeProvider } from "@/context/ThemeContext";
import { SidebarProvider } from "@/context/SidebarContext";
import BackToTopButton from "@/components/common/BackToTopButton";
import SettingsButton from "@/components/common/SettingsButton";
import { ThemeCustomizerProvider } from "@/context/ThemeCustomizerContext";
import ThemeCustomizer from "@/layout/ThemeCustomizer";
import Sidebar from "@/components/sidebar/Sidebar";

const outfit = Outfit({
  subsets: ["latin"],
});
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.className} dark:bg-gray-900`}>
        <ThemeProvider>
          <SidebarProvider>
            <ThemeCustomizerProvider>
              <div className="min-h-screen flex">
                {/* Floating buttons */}
                <BackToTopButton />
                <SettingsButton />

                {/* Sidebar */}
                <Sidebar />

                {/* Main area */}
                <div className="flex flex-1 flex-col transition-all duration-300">
                  <AppHeader />

                  <main className="flex-1 p-4 z-10 mx-auto w-full max-w-(--breakpoint-2xl) md:p-6">
                    {children}
                  </main>
                </div>

                {/* Theme Customizer Drawer */}
                <ThemeCustomizer />
              </div>
            </ThemeCustomizerProvider>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
