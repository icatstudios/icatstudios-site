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
  const t = await getTranslations({ locale, namespace: "privacyPolicy" });
  return {
    title: t("metaTitle"),
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

export default async function PrivacyPolicyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("privacyPolicy");

  const appsList = t.raw("appsList") as string[];
  const thirdParties = t.raw("thirdParties") as string[];
  const reasons = t.raw("serviceProvidersReasons") as string[];

  return (
    <div className="relative">
      <LegalPageHeader
        eyebrow="iCat Studios"
        title={t("title")}
        subtitle={t("subtitle")}
        icon={<ShieldIcon />}
      />

      <article className="relative mx-auto max-w-4xl px-6 pb-24">
        <Reveal>
          <p className="leading-relaxed text-zinc-400">{t("intro")}</p>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {appsList.map((app) => (
              <li
                key={app}
                className="flex items-center gap-2 rounded-lg border border-card-border bg-card-bg/40 px-3 py-2 text-sm text-zinc-300 backdrop-blur"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                {app}
              </li>
            ))}
          </ul>
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
