"use client";

import { useLocale } from "next-intl";
import { useEffect, useRef, useState, useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { localeFlags, localeNames, routing } from "@/i18n/routing";
import Flag from "./Flag";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const switchTo = (next: string) => {
    setOpen(false);
    if (next === locale) return;
    startTransition(() => {
      router.replace(pathname, {
        locale: next as (typeof routing.locales)[number],
      });
    });
  };

  const currentFlag = localeFlags[locale];
  // Display code: uppercase last segment so "pt-br" shows "BR-PT" alike.
  // Keep it simple: just upper the locale tag.
  const displayCode = locale.toUpperCase();

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Select language"
        className={`inline-flex items-center gap-2 rounded-lg border border-card-border bg-card-bg/40 px-2.5 py-1.5 text-xs font-semibold text-foreground backdrop-blur transition-colors hover:border-[var(--brand-purple)] ${
          isPending ? "opacity-70" : ""
        }`}
      >
        {currentFlag && <Flag country={currentFlag} className="h-3.5 w-5" />}
        <span className="uppercase tracking-wide">{displayCode}</span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`text-zinc-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div
          role="listbox"
          aria-label="Languages"
          className="absolute end-0 mt-2 w-60 max-h-[60vh] overflow-y-auto rounded-xl border border-card-border bg-card-bg/95 backdrop-blur-md z-50 p-1.5"
          style={{
            boxShadow:
              "0 20px 50px rgba(0,0,0,0.5), 0 0 30px rgba(110,70,221,0.15), inset 0 1px 0 rgba(255,255,255,0.05)",
          }}
        >
          {routing.locales.map((l) => {
            const isActive = l === locale;
            const flag = localeFlags[l];
            return (
              <button
                key={l}
                type="button"
                role="option"
                aria-selected={isActive}
                onClick={() => switchTo(l)}
                className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                  isActive
                    ? "bg-primary/15 text-primary"
                    : "text-zinc-300 hover:bg-white/5 hover:text-foreground"
                }`}
              >
                <span className="flex items-center gap-3">
                  {flag && <Flag country={flag} className="h-4 w-6" />}
                  <span className="font-medium">{localeNames[l]}</span>
                </span>
                {isActive && (
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="flex-shrink-0"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
