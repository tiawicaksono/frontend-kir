export default function Section({
  title,
  subTitle,
  children,
}: {
  title: string;
  subTitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h3 className="mb-3 text-xs font-medium uppercase tracking-wider dark:text-white/70">
        {title}
      </h3>
      {subTitle && (
        <p className="mb-4 text-xs text-slate-500 dark:text-slate-400">
          {subTitle}
        </p>
      )}
      {children}
    </section>
  );
}
