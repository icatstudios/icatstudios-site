import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import LegalPageHeader from "@/components/LegalPageHeader";
import Reveal from "@/components/Reveal";
import { Link } from "@/i18n/navigation";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "support" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

const SUPPORT_EMAIL = "support@icatstudios.com";

function HeadsetIcon() {
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
      <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
      <path d="M21 19a2 2 0 0 1-2 2h-1v-7h3v5zM3 19a2 2 0 0 0 2 2h1v-7H3v5z" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function CardIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <line x1="2" y1="10" x2="22" y2="10" />
    </svg>
  );
}

function BugIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="8" y="6" width="8" height="14" rx="4" />
      <path d="M12 6V4M9 4l-2-2M15 4l2-2M5 10H3M19 10h2M5 14H3M19 14h2M5 18l-2 2M19 18l2 2" />
    </svg>
  );
}

function LightbulbIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.2 1 2V17h6v-.3c0-.8.4-1.5 1-2A7 7 0 0 0 12 2z" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

export default async function SupportPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("support");

  const categories = [
    {
      key: "accountLogin",
      title: t("categories.accountLogin.title"),
      description: t("categories.accountLogin.description"),
      subject: t("categories.accountLogin.subject"),
      icon: <UserIcon />,
      accent: "#2fbbb3",
    },
    {
      key: "subscription",
      title: t("categories.subscription.title"),
      description: t("categories.subscription.description"),
      subject: t("categories.subscription.subject"),
      icon: <CardIcon />,
      accent: "#a855f7",
    },
    {
      key: "bug",
      title: t("categories.bug.title"),
      description: t("categories.bug.description"),
      subject: t("categories.bug.subject"),
      icon: <BugIcon />,
      accent: "#ff6b4a",
    },
    {
      key: "feedback",
      title: t("categories.feedback.title"),
      description: t("categories.feedback.description"),
      subject: t("categories.feedback.subject"),
      icon: <LightbulbIcon />,
      accent: "#e35ec7",
    },
  ];

  const resources = [
    { href: "/privacy-policy", label: t("resourcePrivacy") },
    { href: "/term-of-use", label: t("resourceTerms") },
    { href: "/delete-account", label: t("resourceDelete") },
  ] as const;

  return (
    <div className="relative">
      <LegalPageHeader
        eyebrow="iCat Studios"
        title={t("title")}
        subtitle={t("subtitle")}
        icon={<HeadsetIcon />}
      />

      <section className="relative mx-auto max-w-6xl px-6 pb-24">
        {/* Categories heading */}
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">
            {t("categoriesHeading")}
          </p>
          <div className="mt-3 h-px w-20 divider-fade" />
        </Reveal>

        {/* Category cards */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat, i) => {
            const mailto = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(cat.subject)}`;
            return (
              <Reveal key={cat.key} delay={i * 100}>
                <a
                  href={mailto}
                  className="product-card group relative flex h-full flex-col overflow-hidden rounded-2xl border border-card-border bg-card-bg/60 p-6 backdrop-blur hover:-translate-y-1"
                  style={
                    { ["--accent" as string]: cat.accent } as React.CSSProperties
                  }
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -top-12 -right-12 h-32 w-32 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-50"
                    style={{ background: cat.accent }}
                  />
                  <span
                    className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border"
                    style={{
                      color: cat.accent,
                      borderColor: `${cat.accent}33`,
                      background: `${cat.accent}1a`,
                    }}
                  >
                    {cat.icon}
                  </span>
                  <h2 className="mb-2 text-base font-semibold text-foreground">
                    {cat.title}
                  </h2>
                  <p className="text-sm leading-relaxed text-zinc-500">
                    {cat.description}
                  </p>
                  <div className="mt-auto pt-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-zinc-500 transition-colors duration-300 group-hover:text-foreground">
                    {SUPPORT_EMAIL}
                    <ArrowIcon />
                  </div>
                </a>
              </Reveal>
            );
          })}
        </div>

        {/* Direct Contact + Resources — two columns */}
        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          {/* Direct Contact */}
          <Reveal>
            <div className="rounded-2xl border border-card-border bg-card-bg/60 p-6 backdrop-blur sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
                {t("directContactHeading")}
              </p>
              <div className="mt-5 space-y-5">
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                    {t("directContactEmailLabel")}
                  </div>
                  <a
                    href={`mailto:${SUPPORT_EMAIL}`}
                    className="mt-1 inline-block text-base font-semibold text-foreground transition-colors hover:text-primary"
                  >
                    {SUPPORT_EMAIL}
                  </a>
                </div>
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                    {t("directContactResponseLabel")}
                  </div>
                  <div className="mt-1 text-sm text-zinc-300">
                    {t("directContactResponseValue")}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Additional Resources */}
          <Reveal delay={120}>
            <div className="rounded-2xl border border-card-border bg-card-bg/60 p-6 backdrop-blur sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
                {t("resourcesHeading")}
              </p>
              <ul className="mt-5 space-y-3">
                {resources.map((r) => (
                  <li key={r.href}>
                    <Link
                      href={r.href}
                      className="group inline-flex items-center gap-2 text-sm text-zinc-300 transition-colors hover:text-foreground"
                    >
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ background: "var(--brand-purple)" }}
                      />
                      <span className="border-b border-transparent transition-colors group-hover:border-zinc-500">
                        {r.label}
                      </span>
                      <ArrowIcon />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
