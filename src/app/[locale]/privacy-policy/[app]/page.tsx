import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import LegalPageHeader from "@/components/LegalPageHeader";
import LegalMarkdown from "@/components/LegalMarkdown";
import BackToTop from "@/components/BackToTop";
import Reveal from "@/components/Reveal";
import { Link } from "@/i18n/navigation";

/**
 * Per-app Privacy Policy page.
 *
 * - "swapmap" renders its own markdown-based policy (swapMapPrivacy.content)
 * - "potentials" and "fast-and-blocky" render the legacy iCat Studios policy
 *   via the structured privacyPolicy.* keys.
 * - "score-hunter" is redirected at the router level (see next.config.ts) to
 *   scorehunter.app/{locale}/privacy-policy and never reaches this component.
 */
const VALID_APPS = ["potentials", "fast-and-blocky", "swapmap"] as const;
type AppSlug = (typeof VALID_APPS)[number];

const APP_NAME_KEY: Record<AppSlug, string> = {
  potentials: "potentials.name",
  "fast-and-blocky": "fastAndBlocky.name",
  swapmap: "swapMap.name",
};

/** Apps that ship their policy as a single markdown blob under {key}Privacy.content */
const MARKDOWN_APP_NAMESPACE: Partial<Record<AppSlug, string>> = {
  swapmap: "swapMapPrivacy",
};

/**
 * Locales that already have the markdown-based policy translated.
 * For other locales, the page falls back to the legacy structured content.
 * Expand this set as translations land.
 */
const MARKDOWN_LOCALES: Partial<Record<AppSlug, Set<string>>> = {
  swapmap: new Set(["en", "tr", "de", "fr", "es", "it", "pt-br", "pt", "nl"]),
};

type Props = {
  params: Promise<{ locale: string; app: string }>;
};

export function generateStaticParams() {
  return VALID_APPS.map((app) => ({ app }));
}

function usesMarkdown(app: AppSlug, locale: string): boolean {
  const ns = MARKDOWN_APP_NAMESPACE[app];
  const set = MARKDOWN_LOCALES[app];
  return !!ns && !!set?.has(locale);
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { locale, app } = await params;
  if (!VALID_APPS.includes(app as AppSlug)) return {};
  const tp = await getTranslations({ locale, namespace: "products" });
  const appName = tp(APP_NAME_KEY[app as AppSlug]);
  const useMd = usesMarkdown(app as AppSlug, locale);
  const ns = useMd ? MARKDOWN_APP_NAMESPACE[app as AppSlug]! : "privacyPolicy";
  const t = await getTranslations({ locale, namespace: ns });
  return {
    title: useMd
      ? t("metaTitle")
      : `${t("metaTitle")} — ${appName}`,
    description: t("metaDescription"),
  };
}

function ShieldIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal>
      <section className="mt-12">
        <h2 className="relative pl-5 text-2xl font-semibold text-foreground">
          <span className="absolute left-0 top-1.5 h-6 w-1 rounded-full bg-gradient-to-b from-primary to-accent" />
          {title}
        </h2>
        <div className="mt-4 space-y-4 leading-relaxed text-zinc-400">
          {children}
        </div>
      </section>
    </Reveal>
  );
}

export default async function PerAppPrivacyPolicy({ params }: Props) {
  const { locale, app } = await params;
  if (!VALID_APPS.includes(app as AppSlug)) {
    notFound();
  }
  setRequestLocale(locale);

  const tp = await getTranslations("products");
  const tIndex = await getTranslations("legalIndex");
  const appName = tp(APP_NAME_KEY[app as AppSlug]);

  // Branch 1: markdown-based policy (SwapMap, locales with translation ready)
  if (usesMarkdown(app as AppSlug, locale)) {
    const markdownNs = MARKDOWN_APP_NAMESPACE[app as AppSlug]!;
    const t = await getTranslations(markdownNs);
    return (
      <div className="relative">
        <LegalPageHeader
          eyebrow={appName}
          title={t("title")}
          subtitle={t("subtitle")}
          icon={<ShieldIcon />}
        />

        <article className="relative mx-auto max-w-4xl px-6 pb-24">
          <Reveal>
            <Link
              href="/privacy-policy"
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500 transition-colors hover:text-foreground"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
              {tIndex("backToList")}
            </Link>
          </Reveal>

          <Reveal>
            <div className="mt-2">
              <LegalMarkdown>{t("content")}</LegalMarkdown>
            </div>
          </Reveal>

          <p className="mt-16 text-center text-xs text-zinc-600">
            {t("copyright")}
          </p>
        </article>

        <BackToTop />
      </div>
    );
  }

  // Branch 2: legacy structured policy (Potentials, Fast and Blocky)
  const t = await getTranslations("privacyPolicy");
  const thirdParties = t.raw("thirdParties") as string[];
  const reasons = t.raw("serviceProvidersReasons") as string[];

  return (
    <div className="relative">
      <LegalPageHeader
        eyebrow={appName}
        title={t("title")}
        subtitle={t("subtitle")}
        icon={<ShieldIcon />}
      />

      <article className="relative mx-auto max-w-4xl px-6 pb-24">
        <Reveal>
          <Link
            href="/privacy-policy"
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500 transition-colors hover:text-foreground"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
            {tIndex("backToList")}
          </Link>
        </Reveal>

        <Reveal>
          <div className="mt-6 space-y-4 leading-relaxed text-zinc-400">
            <p>{t("p1")}</p>
            <p>{t("p2")}</p>
            <p>{t("p3")}</p>
            <p>{t("p4")}</p>
          </div>
        </Reveal>

        <Section title={t("infoCollectionTitle")}>
          <p>{t("infoCollection1")}</p>
          <p>{t("infoCollection2")}</p>
          <p>{t("infoCollection3")}</p>
          <ul className="flex flex-wrap gap-2">
            {thirdParties.map((name) => (
              <li
                key={name}
                className="rounded-full border border-card-border bg-card-bg/40 px-3 py-1 text-xs font-medium text-zinc-300 backdrop-blur"
              >
                {name}
              </li>
            ))}
          </ul>
        </Section>

        <Section title={t("logDataTitle")}>
          <p>{t("logData")}</p>
        </Section>

        <Section title={t("cookiesTitle")}>
          <p>{t("cookies1")}</p>
          <p>{t("cookies2")}</p>
        </Section>

        <Section title={t("serviceProvidersTitle")}>
          <p>{t("serviceProviders1")}</p>
          <ul className="list-disc space-y-1 pl-6">
            {reasons.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
          <p>{t("serviceProviders2")}</p>
        </Section>

        <Section title={t("securityTitle")}>
          <p>{t("security")}</p>
        </Section>

        <Section title={t("linksTitle")}>
          <p>{t("links")}</p>
        </Section>

        <Section title={t("childrenTitle")}>
          <p>{t("children")}</p>
        </Section>

        <Section title={t("changesTitle")}>
          <p>{t("changes")}</p>
        </Section>

        <Section title={t("contactTitle")}>
          <p>{t("contact")}</p>
          <a
            href="mailto:support@icatstudios.com"
            className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-5 py-2 text-sm font-semibold text-primary transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/15 hover:shadow-[0_0_24px_rgba(47,187,179,0.5)]"
          >
            support@icatstudios.com
          </a>
        </Section>

        <p className="mt-16 text-center text-xs text-zinc-600">
          {t("copyright")}
        </p>
      </article>

      <BackToTop />
    </div>
  );
}
