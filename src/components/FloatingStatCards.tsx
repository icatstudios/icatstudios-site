"use client";

import { useTranslations } from "next-intl";

/**
 * Banner-style floating holographic stat cards positioned around the mascot.
 * 4 cards with real iCat Studios metrics.
 */
export default function FloatingStatCards() {
  const t = useTranslations("heroStats");

  return (
    <>
      {/* Top-left: Downloads */}
      <div
        className="stat-card animate-float-a hidden sm:flex"
        style={{ top: "4%", left: "-6%" }}
      >
        <span
          className="flex h-9 w-9 items-center justify-center rounded-lg"
          style={{
            background:
              "linear-gradient(135deg, rgba(47,187,179,0.25), rgba(110,70,221,0.15))",
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#2fbbb3"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
        </span>
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-zinc-400">
            {t("downloadsLabel")}
          </div>
          <div className="text-sm font-bold text-foreground">
            {t("downloadsValue")}
          </div>
        </div>
      </div>

      {/* Top-right: Apps Shipped */}
      <div
        className="stat-card animate-float-b hidden md:flex"
        style={{ top: "14%", right: "-8%" }}
      >
        <span
          className="flex h-9 w-9 items-center justify-center rounded-lg"
          style={{
            background:
              "linear-gradient(135deg, rgba(110,70,221,0.3), rgba(227,94,199,0.15))",
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#9677e8"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2" y="3" width="20" height="14" rx="2" />
            <line x1="8" y1="21" x2="16" y2="21" />
            <line x1="12" y1="17" x2="12" y2="21" />
          </svg>
        </span>
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-zinc-400">
            {t("appsLabel")}
          </div>
          <div className="text-sm font-bold text-foreground">
            {t("appsValue")}
          </div>
        </div>
      </div>

      {/* Bottom-left: Since 2016 */}
      <div
        className="stat-card animate-float-c hidden md:flex"
        style={{ bottom: "18%", left: "-4%" }}
      >
        <span
          className="flex h-9 w-9 items-center justify-center rounded-lg"
          style={{
            background:
              "linear-gradient(135deg, rgba(47,187,179,0.25), rgba(227,94,199,0.15))",
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#5fd1ca"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
        </span>
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-zinc-400">
            {t("foundedLabel")}
          </div>
          <div className="text-sm font-bold text-foreground">
            {t("foundedValue")}
          </div>
        </div>
      </div>

      {/* Bottom-right: Türkiye */}
      <div
        className="stat-card animate-float-a hidden sm:flex"
        style={{ bottom: "4%", right: "-2%" }}
      >
        <span
          className="flex h-9 w-9 items-center justify-center rounded-lg"
          style={{
            background:
              "linear-gradient(135deg, rgba(227,94,199,0.25), rgba(110,70,221,0.2))",
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#e35ec7"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="10" r="3" />
            <path d="M12 2a8 8 0 0 0-8 8c0 6 8 12 8 12s8-6 8-12a8 8 0 0 0-8-8z" />
          </svg>
        </span>
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-zinc-400">
            {t("locationLabel")}
          </div>
          <div className="text-sm font-bold text-foreground">
            {t("locationValue")}
          </div>
        </div>
      </div>
    </>
  );
}
