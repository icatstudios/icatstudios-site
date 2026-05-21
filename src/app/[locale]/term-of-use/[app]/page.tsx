import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import LegalPageHeader from "@/components/LegalPageHeader";
import LegalMarkdown from "@/components/LegalMarkdown";
import BackToTop from "@/components/BackToTop";
import Reveal from "@/components/Reveal";
import { Link } from "@/i18n/navigation";

/**
 * Per-app Terms of Use page.
 *
 * - "swapmap" renders its own markdown-based terms (swapMapTerms.content) when
 *   the current locale is in the translated set; otherwise the legacy structured
 *   content is shown.
 * - "potentials" and "fast-and-blocky" use the legacy structured terms.
 * - "score-hunter" is redirected to scorehunter.app/{locale}/terms-of-use by
 *   next.config.ts and never reaches this component.
 */
const VALID_APPS = ["potentials", "fast-and-blocky", "swapmap"] as const;
type AppSlug = (typeof VALID_APPS)[number];

const APP_NAME_KEY: Record<AppSlug, string> = {
  potentials: "potentials.name",
  "fast-and-blocky": "fastAndBlocky.name",
  swapmap: "swapMap.name",
};

/** Apps that ship their terms as a single markdown blob under {key}Terms.content */
const MARKDOWN_APP_NAMESPACE: Partial<Record<AppSlug, string>> = {
  swapmap: "swapMapTerms",
};

/** Locales with the markdown-based terms already translated. */
const MARKDOWN_LOCALES: Partial<Record<AppSlug, Set<string>>> = {
  swapmap: new Set(["en", "tr", "de", "fr", "es", "it", "pt-br", "pt", "nl", "no", "da", "sv", "cs", "pl", "ru", "ja", "ko", "zh"]),
};

function usesMarkdown(app: AppSlug, locale: string): boolean {
  const ns = MARKDOWN_APP_NAMESPACE[app];
  const set = MARKDOWN_LOCALES[app];
  return !!ns && !!set?.has(locale);
}

type Props = {
  params: Promise<{ locale: string; app: string }>;
};

export function generateStaticParams() {
  return VALID_APPS.map((app) => ({ app }));
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { locale, app } = await params;
  if (!VALID_APPS.includes(app as AppSlug)) return {};
  const tp = await getTranslations({ locale, namespace: "products" });
  const appName = tp(APP_NAME_KEY[app as AppSlug]);
  const useMd = usesMarkdown(app as AppSlug, locale);
  const ns = useMd ? MARKDOWN_APP_NAMESPACE[app as AppSlug]! : "termOfUse";
  const t = await getTranslations({ locale, namespace: ns });
  return {
    title: useMd
      ? t("metaTitle")
      : `${t("metaTitle")} — ${appName}`,
    description: t("metaDescription"),
  };
}

function DocumentIcon() {
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
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="8" y1="13" x2="16" y2="13" />
      <line x1="8" y1="17" x2="14" y2="17" />
    </svg>
  );
}

function Section({
  title,
  children,
  level = 2,
}: {
  title: string;
  children: React.ReactNode;
  level?: 2 | 3;
}) {
  return (
    <Reveal>
      <section className="mt-10">
        {level === 2 ? (
          <h2 className="relative pl-5 text-2xl font-semibold text-foreground">
            <span className="absolute left-0 top-1.5 h-6 w-1 rounded-full bg-gradient-to-b from-primary to-accent" />
            {title}
          </h2>
        ) : (
          <h3 className="relative pl-4 text-lg font-semibold text-foreground">
            <span className="absolute left-0 top-1.5 h-5 w-0.5 rounded-full bg-primary/60" />
            {title}
          </h3>
        )}
        <div className="mt-3 space-y-4 leading-relaxed text-zinc-400">
          {children}
        </div>
      </section>
    </Reveal>
  );
}

export default async function PerAppTermOfUse({ params }: Props) {
  const { locale, app } = await params;
  if (!VALID_APPS.includes(app as AppSlug)) {
    notFound();
  }
  setRequestLocale(locale);

  const tp = await getTranslations("products");
  const tIndex = await getTranslations("legalIndex");
  const appName = tp(APP_NAME_KEY[app as AppSlug]);

  // Branch 1: markdown-based terms (SwapMap, locales with translation ready)
  if (usesMarkdown(app as AppSlug, locale)) {
    const markdownNs = MARKDOWN_APP_NAMESPACE[app as AppSlug]!;
    const t = await getTranslations(markdownNs);
    return (
      <div className="relative">
        <LegalPageHeader
          eyebrow={appName}
          title={t("title")}
          subtitle={t("subtitle")}
          icon={<DocumentIcon />}
        />

        <article className="relative mx-auto max-w-4xl px-6 pb-24">
          <Reveal>
            <Link
              href="/term-of-use"
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
              {tIndex("backToListTerms")}
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

  // Branch 2: legacy structured terms (Potentials, Fast and Blocky, and
  // non-en SwapMap until translations land)
  const t = await getTranslations("termOfUse");
  const proBullets = t.raw("paymentProBullets") as string[];

  return (
    <div className="relative">
      <LegalPageHeader
        eyebrow={appName}
        title={t("title")}
        subtitle={t("subtitle")}
        icon={<DocumentIcon />}
      />

      <article className="relative mx-auto max-w-4xl px-6 pb-24">
        <Reveal>
          <Link
            href="/term-of-use"
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
            {tIndex("backToListTerms")}
          </Link>
        </Reveal>

        <Reveal>
          <div className="mt-6 rounded-2xl border border-card-border bg-card-bg/40 p-6 backdrop-blur">
            <p
              lang="en"
              className="text-xs font-semibold uppercase tracking-[0.25em] text-primary"
            >
              {appName}
            </p>
            <h2 className="mt-2 text-xl font-semibold text-foreground">
              {t("licenseTitle")}
            </h2>
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-8 space-y-4 leading-relaxed text-zinc-400">
            <p>{t("intro1")}</p>
            <p>{t("intro2")}</p>
            <p>{t("intro3")}</p>
            <p>{t("intro4")}</p>
          </div>
        </Reveal>

        <Section title={t("section1Title")}>
          <p>{t("section1")}</p>
        </Section>

        <Section title={t("paymentTitle")} level={3}>
          <p>{t("payment1")}</p>
          <p className="font-semibold text-foreground">
            {t("paymentProLabel")}
          </p>
          <ul className="list-disc space-y-1 pl-6">
            {proBullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
          <p>{t("payment2")}</p>
        </Section>

        <Section title={t("section2Title")}>
          <p>{t("section2")}</p>
        </Section>

        <Section title={t("section3Title")}>
          <p>{t("section3")}</p>
        </Section>

        <Section title={t("section4Title")}>
          <p>{t("section4")}</p>
        </Section>

        <Section title={t("section5Title")}>
          <p>{t("section5")}</p>
        </Section>

        <Section title={t("section6Title")}>
          <p>{t("section6")}</p>
        </Section>

        <Section title={t("section7Title")}>
          <p>{t("section7")}</p>
        </Section>

        <Section title={t("section8Title")}>
          <p>{t("section8")}</p>
        </Section>

        <Section title={t("section9Title")}>
          <p>{t("section9")}</p>
        </Section>

        <Section title={t("section10Title")}>
          <p>{t("section10")}</p>
        </Section>

        <Section title={t("section11Title")}>
          <p>{t("section11")}</p>
        </Section>

        <Section title={t("section12Title")}>
          <p>{t("section12a")}</p>
          <p>{t("section12b")}</p>
        </Section>

        <Section title={t("section13Title")}>
          <p>{t("section13")}</p>
        </Section>

        <p className="mt-16 text-center text-xs text-zinc-600">
          {t("copyright")}
        </p>
      </article>

      <BackToTop />
    </div>
  );
}
