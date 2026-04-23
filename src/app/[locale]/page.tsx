import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import BackgroundBlobs from "@/components/BackgroundBlobs";
import Reveal from "@/components/Reveal";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");

  const products = [
    {
      key: "potentials",
      name: "Potentials: FC26 Career Mode",
      shortDescription:
        locale === "tr"
          ? "FIFA 18 — FC 26 arası 20.000+ futbolcu veritabanı."
          : "FIFA 18 through FC 26 — 20,000+ player database.",
      icon: "/images/potentials/potentials_icon.png",
      href: "/products#potentials",
      accent: "#14f174",
    },
    {
      key: "fastandblocky",
      name: "Fast and Blocky",
      shortDescription:
        locale === "tr"
          ? "Sonsuz motosiklet yarışı — yüksek hızda trafikten kaç."
          : "Endless motorcycle racing — dodge traffic at high speed.",
      icon: "/images/fastandblocky/fastandblockyblocky_icon.png",
      href: "/products#fastandblocky",
      accent: "#ff6b4a",
    },
    {
      key: "scorehunter",
      name: "Score Hunter",
      shortDescription:
        locale === "tr"
          ? "Yepyeni bir deneyim yolda. Takipte kalın!"
          : "A brand new experience is coming soon. Stay tuned!",
      icon: "/images/scorehunter/scorehunter_icon.png",
      href: "/products#scorehunter",
      accent: "#14f174",
      comingSoon: true,
    },
  ];

  return (
    <div className="flex flex-col">
      {/* ============ Hero ============ */}
      <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden px-6 py-20">
        <BackgroundBlobs intensity="high" />

        {/* Decorative dots under hero */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-dots opacity-30"
          style={{
            maskImage:
              "linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0))",
            WebkitMaskImage:
              "linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0))",
          }}
        />

        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <div className="animate-slide-up">
            <div className="relative mx-auto mb-10 w-[280px] sm:w-[340px] lg:w-[400px]">
              {/* Multi-layer glow behind logo */}
              <div
                aria-hidden
                className="absolute inset-0 -z-10 rounded-[50%] blur-[90px] opacity-60 animate-pulse-glow"
                style={{
                  background:
                    "radial-gradient(circle, rgba(110,70,221,0.55) 0%, rgba(47,187,179,0.35) 40%, rgba(227,94,199,0.35) 70%, transparent 100%)",
                }}
              />
              <Image
                src="/images/logos/icat-logo-text.svg"
                alt="iCat Studios"
                width={500}
                height={700}
                sizes="(max-width: 640px) 280px, (max-width: 1024px) 340px, 400px"
                className="relative animate-float drop-shadow-[0_8px_30px_rgba(110,70,221,0.35)]"
                priority
              />
            </div>
          </div>

          <h1 className="animate-slide-up-delay-1 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            <span className="block">{t("heroTitleLine1")}</span>
            <span className="block shimmer-text">{t("heroTitleLine2")}</span>
          </h1>

          <p className="animate-slide-up-delay-2 mx-auto mt-6 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
            {t("heroSubtitle")}
          </p>

          <div className="animate-slide-up-delay-3 mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/products"
              className="btn-gradient group relative inline-flex items-center gap-2 rounded-full px-8 py-3 text-sm font-semibold text-white"
            >
              {t("ctaPrimary")}
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
            <a
              href="mailto:support@icatstudios.com"
              className="inline-flex items-center gap-2 rounded-full border border-card-border bg-card-bg/40 px-8 py-3 text-sm font-semibold text-foreground backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--brand-purple)] hover:text-[var(--brand-pink)]"
            >
              {t("ctaSecondary")}
            </a>
          </div>

          {/* Subtle metadata strip */}
          <div className="animate-slide-up-delay-4 mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs uppercase tracking-[0.25em] text-zinc-500">
            <span>Türkiye</span>
            <span className="h-1 w-1 rounded-full bg-zinc-700" />
            <span>Mobile & Games</span>
            <span className="h-1 w-1 rounded-full bg-zinc-700" />
            <span>Since 2016</span>
          </div>
        </div>
      </section>

      {/* ============ Products Preview ============ */}
      <section className="relative mx-auto max-w-6xl px-6 py-24">
        <Reveal className="text-center">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            {t("productsSectionTitle")}
          </h2>
          <p className="mt-3 text-zinc-500">{t("productsSectionSubtitle")}</p>
          <div className="mx-auto mt-6 h-px w-24 divider-fade" />
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {products.map((product, i) => (
            <Reveal key={product.key} delay={i * 120}>
              <Link
                href={product.href}
                className="product-card group relative flex h-full flex-col overflow-hidden rounded-2xl border border-card-border bg-card-bg/60 p-6 backdrop-blur hover:-translate-y-1"
                style={
                  {
                    ["--accent" as string]: product.accent,
                  } as React.CSSProperties
                }
              >
                {/* Accent corner glow */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-60"
                  style={{ background: product.accent }}
                />

                {product.comingSoon && (
                  <span
                    className="absolute top-4 right-4 rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-widest animate-pulse-soft"
                    style={{
                      color: "#E35EC7",
                      borderColor: "rgba(227,94,199,0.4)",
                      background: "rgba(227,94,199,0.1)",
                    }}
                  >
                    {t("comingSoon")}
                  </span>
                )}

                <Image
                  src={product.icon}
                  alt={product.name}
                  width={64}
                  height={64}
                  className="mb-5 rounded-xl ring-1 ring-white/10 transition-transform duration-500 group-hover:scale-105"
                />
                <h3 className="mb-2 text-lg font-semibold text-foreground transition-colors duration-300">
                  {product.name}
                </h3>
                <p className="text-sm leading-relaxed text-zinc-500">
                  {product.shortDescription}
                </p>

                <div className="mt-auto pt-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-zinc-500 transition-colors duration-300 group-hover:text-foreground">
                  {t("explore")}
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
