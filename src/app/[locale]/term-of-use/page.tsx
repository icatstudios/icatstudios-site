import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import LegalPageHeader from "@/components/LegalPageHeader";
import BackToTop from "@/components/BackToTop";
import Reveal from "@/components/Reveal";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "termOfUse" });
  return {
    title: t("metaTitle"),
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

export default async function TermOfUsePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("termOfUse");

  const proBullets = t.raw("paymentProBullets") as string[];

  return (
    <div className="relative">
      <LegalPageHeader
        eyebrow="iCat Studios"
        title={t("title")}
        subtitle={t("subtitle")}
        icon={<DocumentIcon />}
      />

      <article className="relative mx-auto max-w-4xl px-6 pb-24">
        <Reveal>
          <div className="rounded-2xl border border-card-border bg-card-bg/40 p-6 backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
              {t("appName")}
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
