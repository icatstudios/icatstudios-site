import type { Metadata } from "next";
import Image from "next/image";
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

function ArrowIcon({ external = false }: { external?: boolean }) {
  if (external) {
    return (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      >
        <line x1="7" y1="17" x2="17" y2="7" />
        <polyline points="7 7 17 7 17 17" />
      </svg>
    );
  }
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="transition-transform duration-300 group-hover:translate-x-1"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

export default async function TermOfUseIndex({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("termOfUse");
  const tp = await getTranslations("products");
  const tIndex = await getTranslations("legalIndex");

  const apps = [
    {
      slug: "score-hunter",
      name: tp("scoreHunter.name"),
      icon: "/images/scorehunter/scorehunter_icon.png",
      iconShape: "square",
      accent: "#14f174",
      external: true,
      href: `/term-of-use/score-hunter`,
    },
    {
      slug: "swapmap",
      name: tp("swapMap.name"),
      icon: "/images/swapmap/swapmap_icon.png",
      iconShape: "square",
      accent: "#06b6d4",
      external: false,
      href: "/term-of-use/swapmap",
    },
    {
      slug: "potentials",
      name: tp("potentials.name"),
      icon: "/images/potentials/potentials_icon.png",
      iconShape: "square",
      accent: "#a855f7",
      external: false,
      href: "/term-of-use/potentials",
    },
    {
      slug: "fast-and-blocky",
      name: tp("fastAndBlocky.name"),
      icon: "/images/fastandblocky/fastandblockyblocky_icon.png",
      iconShape: "square",
      accent: "#ff6b4a",
      external: false,
      href: "/term-of-use/fast-and-blocky",
    },
  ] as const;

  return (
    <div className="relative">
      <LegalPageHeader
        eyebrow="iCat Studios"
        title={t("title")}
        subtitle={tIndex("selectAppTerms")}
        icon={<DocumentIcon />}
      />

      <section className="relative mx-auto max-w-6xl px-6 pb-24">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {apps.map((app, i) => {
            const CardContent = (
              <>
                <div
                  aria-hidden
                  className="pointer-events-none absolute -top-12 -right-12 h-32 w-32 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-50"
                  style={{ background: app.accent }}
                />
                <Image
                  src={app.icon}
                  alt={app.name}
                  width={64}
                  height={64}
                  className="mb-5 rounded-xl ring-1 ring-white/10 transition-transform duration-500 group-hover:scale-105"
                />
                <h2 className="mb-2 text-lg font-semibold text-foreground">
                  {app.name}
                </h2>
                {app.external && (
                  <p className="mb-4 text-xs text-zinc-500">
                    {tIndex("externalNote")}
                  </p>
                )}
                <div className="mt-auto pt-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-zinc-500 transition-colors duration-300 group-hover:text-foreground">
                  {tIndex("viewTerms")}
                  <ArrowIcon external={app.external} />
                </div>
              </>
            );

            const cardClass =
              "product-card group relative flex h-full flex-col overflow-hidden rounded-2xl border border-card-border bg-card-bg/60 p-6 backdrop-blur hover:-translate-y-1";
            const cardStyle = {
              ["--accent" as string]: app.accent,
            } as React.CSSProperties;

            return (
              <Reveal key={app.slug} delay={i * 120}>
                {app.external ? (
                  <a
                    href={app.href}
                    className={cardClass}
                    style={cardStyle}
                  >
                    {CardContent}
                  </a>
                ) : (
                  <Link href={app.href} className={cardClass} style={cardStyle}>
                    {CardContent}
                  </Link>
                )}
              </Reveal>
            );
          })}
        </div>

        <p className="mt-16 text-center text-xs text-zinc-600">
          {t("copyright")}
        </p>
      </section>
    </div>
  );
}
