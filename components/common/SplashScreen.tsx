"use client";

export default function SplashScreen() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white dark:bg-gray-900 transition-opacity duration-500 animate-fadeOut">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-brand-500 rounded-full animate-spin" />
      </div>
    </div>
  );
}
