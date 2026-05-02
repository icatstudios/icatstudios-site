interface StoreBadgesProps {
  appStoreUrl?: string;
  playStoreUrl?: string;
  /** Theme accent color for border/glow — defaults to brand teal */
  accent?: string;
}

function AppleIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-5 w-5 flex-shrink-0"
    >
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
  );
}

function GooglePlayIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-5 w-5 flex-shrink-0"
    >
      <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.491-2.491zM5.864 2.658L16.802 8.99l-2.302 2.302-8.636-8.634z" />
    </svg>
  );
}

export default function StoreBadges({
  appStoreUrl,
  playStoreUrl,
  accent = "#2fbbb3",
}: StoreBadgesProps) {
  const cardStyle = {
    color: "rgba(255,255,255,0.92)",
    borderColor: `${accent}55`,
    background: "rgba(18,18,26,0.6)",
    boxShadow: `0 0 24px ${accent}20, inset 0 1px 0 rgba(255,255,255,0.05)`,
    ["--btn-color" as string]: accent,
  } as React.CSSProperties;

  return (
    <div className="flex flex-wrap gap-3">
      {appStoreUrl && (
        <a
          href={appStoreUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="themed-btn group inline-flex items-center gap-3 rounded-xl border px-4 py-2.5 backdrop-blur"
          style={cardStyle}
        >
          <AppleIcon />
          <span className="flex flex-col leading-tight text-left">
            <span className="text-[9px] uppercase tracking-[0.18em] text-zinc-400 transition-colors group-hover:text-zinc-300">
              Download on the
            </span>
            <span className="text-sm font-semibold">App Store</span>
          </span>
        </a>
      )}
      {playStoreUrl && (
        <a
          href={playStoreUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="themed-btn group inline-flex items-center gap-3 rounded-xl border px-4 py-2.5 backdrop-blur"
          style={cardStyle}
        >
          <GooglePlayIcon />
          <span className="flex flex-col leading-tight text-left">
            <span className="text-[9px] uppercase tracking-[0.18em] text-zinc-400 transition-colors group-hover:text-zinc-300">
              Get it on
            </span>
            <span className="text-sm font-semibold">Google Play</span>
          </span>
        </a>
      )}
    </div>
  );
}
