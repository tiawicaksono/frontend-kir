"use client";

export default function FullScreenLoader({
  text = "Checking authentication...",
}: {
  text?: string;
}) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-brand-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-gray-500 dark:text-gray-400">{text}</p>
      </div>
    </div>
  );
}
