interface LegalPageHeaderProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
}

export default function LegalPageHeader({
  eyebrow,
  title,
  subtitle,
  icon,
}: LegalPageHeaderProps) {
  return (
    <section className="relative overflow-hidden px-6 pt-20 pb-14">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -top-40 left-1/2 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-primary/12 blur-[120px] animate-pulse-glow" />
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div
          className="absolute inset-x-0 bottom-0 h-40"
          style={{
            background:
              "linear-gradient(to top, rgba(8,8,12,1), rgba(8,8,12,0))",
          }}
        />
      </div>
      <div className="relative z-10 mx-auto max-w-4xl">
        <div className="flex items-center gap-4 animate-slide-up">
          {icon && (
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border border-card-border bg-card-bg/60 text-primary backdrop-blur">
              {icon}
            </div>
          )}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">
              {eyebrow}
            </p>
            <h1 className="mt-1.5 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              {title}
            </h1>
          </div>
        </div>
        {subtitle && (
          <p className="mt-5 max-w-2xl text-zinc-500 animate-slide-up-delay-1">
            {subtitle}
          </p>
        )}
        <div className="mt-8 h-px w-20 divider-fade animate-slide-up-delay-2" />
      </div>
    </section>
  );
}
