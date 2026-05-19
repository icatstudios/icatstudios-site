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
  const t = await getTranslations({ locale, namespace: "deleteAccount" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

function TrashIcon() {
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
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6M14 11v6" />
      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    </svg>
  );
}

export default async function DeleteAccountIndex({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("deleteAccount");
  const tp = await getTranslations("products");

  const apps = [
    {
      slug: "score-hunter",
      name: tp("scoreHunter.name"),
      icon: "/images/scorehunter/scorehunter_icon.png",
      iconShape: "square" as const,
      accent: "#14f174",
    },
    {
      slug: "swapmap",
      name: tp("swapMap.name"),
      icon: "/images/swapmap/swapmap_icon.png",
      iconShape: "square" as const,
      accent: "#06b6d4",
    },
    {
      slug: "potentials",
      name: tp("potentials.name"),
      icon: "/images/potentials/potentials_icon.png",
      iconShape: "square" as const,
      accent: "#a855f7",
    },
  ];

  return (
    <div className="relative">
      <LegalPageHeader
        eyebrow="iCat Studios"
        title={t("title")}
        subtitle={t("subtitle")}
        icon={<TrashIcon />}
      />

      <section className="relative mx-auto max-w-5xl px-6 pb-24">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {apps.map((app, i) => (
            <Reveal key={app.slug} delay={i * 120}>
              <Link
                href={`/delete-account/${app.slug}`}
                className="product-card group relative flex h-full flex-col overflow-hidden rounded-2xl border border-card-border bg-card-bg/60 p-6 backdrop-blur hover:-translate-y-1"
                style={
                  {
                    ["--accent" as string]: app.accent,
                  } as React.CSSProperties
                }
              >
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
                <div className="mt-auto pt-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-zinc-500 transition-colors duration-300 group-hover:text-foreground">
                  {t("formTitle")}
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
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
