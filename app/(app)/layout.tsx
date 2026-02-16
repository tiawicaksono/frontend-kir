import { Outfit } from "next/font/google";
import "../globals.css";
import { AppProviders } from "../providers";
import AppMenu from "@/layout/AppMenu";
import BackToTopButton from "@/components/common/BackToTopButton";
import SettingsButton from "@/components/common/SettingsButton";

const outfit = Outfit({ subsets: ["latin"] });

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppProviders>
      <BackToTopButton />
      <SettingsButton />
      <AppMenu>{children}</AppMenu>
    </AppProviders>
  );
}
