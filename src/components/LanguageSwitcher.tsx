"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useTransition } from "react";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const switchTo = (nextLocale: "en" | "tr") => {
    if (nextLocale === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

  const base =
    "px-2.5 py-1 text-xs font-semibold tracking-wide uppercase rounded-md transition-all";
  const active = "bg-primary/15 text-primary";
  const idle = "text-zinc-500 hover:text-foreground";

  return (
    <div
      className={`inline-flex items-center gap-1 rounded-lg border border-card-border bg-card-bg/40 p-0.5 backdrop-blur ${
        isPending ? "opacity-70" : ""
      }`}
      aria-label="Language selector"
    >
      <button
        onClick={() => switchTo("en")}
        className={`${base} ${locale === "en" ? active : idle}`}
        aria-current={locale === "en"}
        aria-label="English"
      >
        EN
      </button>
      <button
        onClick={() => switchTo("tr")}
        className={`${base} ${locale === "tr" ? active : idle}`}
        aria-current={locale === "tr"}
        aria-label="Türkçe"
      >
        TR
      </button>
    </div>
  );
}
