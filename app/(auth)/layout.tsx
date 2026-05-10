"use client";

import { Image } from "antd";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative p-6 bg-white z-1 dark:bg-gray-900 sm:p-0">
      <div className="relative flex lg:flex-row w-full h-screen justify-center flex-col dark:bg-gray-900 sm:p-0">
        {children}

        <div className="lg:w-1/2 w-full h-full bg-brand-950 dark:bg-white/5 lg:grid items-center hidden">
          <div className="relative items-center justify-center flex z-1">
            <div className="flex flex-col items-center max-w-xs">
              <Image width={250} src="./images/logo/logo-dark.svg" alt="Logo" />
              <p className="mt-4 text-center text-gray-400 dark:text-white/60">
                Sistem inspeksi digital untuk memastikan armada kendaraan laik
                jalan dan aman beroperasi.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
