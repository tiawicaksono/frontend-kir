export default function FullscreenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      {children}
    </div>
  );
}
