import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Reveal from "@/components/Reveal";
import ParticleField from "@/components/ParticleField";
import GroundRings from "@/components/GroundRings";
import FloatingStatCards from "@/components/FloatingStatCards";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const tProducts = await getTranslations("products");

  const products = [
    {
      key: "catsu",
      name: tProducts("catsu.name"),
      shortDescription: tProducts("catsu.shortDescription"),
      icon: "/images/catsu/catsu_logo.png",
      href: "/products#catsu",
      accent: "#f5b52e",
      comingSoon: true,
    },
    {
      key: "scorehunter",
      name: tProducts("scoreHunter.name"),
      shortDescription: tProducts("scoreHunter.shortDescription"),
      icon: "/images/scorehunter/scorehunter_icon.png",
      href: "/products#scorehunter",
      accent: "#14f174",
      isNew: true,
    },
    {
      key: "swapmap",
      name: tProducts("swapMap.name"),
      shortDescription: tProducts("swapMap.shortDescription"),
      icon: "/images/swapmap/swapmap_icon.png",
      href: "/products#swapmap",
      accent: "#06b6d4",
      isNew: true,
    },
    {
      key: "potentials",
      name: tProducts("potentials.name"),
      shortDescription: tProducts("potentials.shortDescription"),
      icon: "/images/potentials/potentials_icon.png",
      href: "/products#potentials",
      accent: "#a855f7",
    },
  ];

  return (
    <div className="flex flex-col">
      {/* ============ Hero (banner-style) ============ */}
      <section className="relative overflow-hidden px-6 pt-14 pb-20 lg:pt-20 lg:pb-28">
        {/* Deep space gradient backdrop */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 hero-space-bg"
        />
        {/* Subtle grid + particles */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-grid opacity-25"
        />
        <ParticleField />

        {/* Fade to page bg at bottom */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-40"
          style={{
            background:
              "linear-gradient(to top, var(--background), transparent)",
          }}
        />

        <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8">
          {/* ---------- Left column: Brand + Copy ---------- */}
          <div className="lg:col-span-6 lg:pr-6">
            {/* Eyebrow */}
            <div className="animate-slide-up inline-flex items-center gap-2 rounded-full border border-card-border bg-card-bg/50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-zinc-300 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-[var(--brand-teal)] to-[var(--brand-pink)] animate-pulse" />
              {t("heroEyebrow")}
            </div>

            {/* Logo with text */}
            <div className="animate-slide-up-delay-1 mt-6 max-w-md">
              <Image
                src="/images/logos/icat-logo-text.svg"
                alt="iCat Studios"
                width={500}
                height={700}
                sizes="(max-width: 1024px) 240px, 360px"
                className="w-[240px] lg:w-[360px] drop-shadow-[0_8px_28px_rgba(110,70,221,0.45)]"
                priority
              />
            </div>

            {/* Gradient progress bar */}
            <div className="animate-slide-up-delay-2 mt-5 max-w-[260px]">
              <div className="hero-progress" />
            </div>

            {/* Subtitle */}
            <h1 className="animate-slide-up-delay-2 mt-6 text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
              <span className="block">{t("heroTitleLine1")}</span>
              <span className="block shimmer-text">{t("heroTitleLine2")}</span>
            </h1>

            <p className="animate-slide-up-delay-3 mt-5 max-w-xl text-sm leading-relaxed text-zinc-400 sm:text-base">
              {t("heroSubtitle")}
            </p>

            {/* CTAs */}
            <div className="animate-slide-up-delay-3 mt-8 flex flex-wrap gap-3">
              <Link
                href="/products"
                className="btn-gradient group relative inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold text-white"
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
                className="inline-flex items-center gap-2 rounded-full border border-card-border bg-card-bg/40 px-7 py-3 text-sm font-semibold text-foreground backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--brand-purple)] hover:text-[var(--brand-pink)]"
              >
                {t("ctaSecondary")}
              </a>
            </div>
          </div>

          {/* ---------- Right column: Mascot stage ---------- */}
          <div className="lg:col-span-6">
            <div className="relative mx-auto aspect-[5/6] w-full max-w-[540px]">
              {/* Orbit glow behind mascot */}
              <div
                aria-hidden
                className="absolute left-1/2 top-1/2 -z-10 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full animate-orbit-glow"
                style={{ background: "transparent" }}
              />

              {/* Ground rings under feet */}
              <GroundRings className="bottom-[2%] left-1/2 -translate-x-1/2" />

              {/* Floating stat cards */}
              <FloatingStatCards />

              {/* Mascot */}
              <Image
                src="/images/mascot/icat-mascot.png"
                alt="iCat Studios mascot"
                fill
                sizes="(max-width: 1024px) 90vw, 540px"
                className="relative z-[3] animate-float object-contain"
                priority
              />
            </div>
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

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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

                {product.isNew && (
                  <span
                    className="absolute top-4 right-4 rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] animate-pulse-soft"
                    style={{
                      color: product.accent,
                      borderColor: `${product.accent}66`,
                      background: `${product.accent}1a`,
                    }}
                  >
                    {locale === "tr" ? "Yeni" : "New"}
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

      {/* ============ Charity strip ============ */}
      <section className="relative mx-auto max-w-6xl px-6 pb-24">
        <Reveal>
          <Link
            href="/about"
            className="group relative block overflow-hidden rounded-2xl border p-8 backdrop-blur transition-transform duration-300 hover:-translate-y-1 sm:p-10"
            style={{
              borderColor: "#e35ec733",
              background: "rgba(18,18,26,0.6)",
            }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full opacity-15 blur-3xl transition-opacity duration-500 group-hover:opacity-30"
              style={{ background: "#e35ec7" }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full opacity-10 blur-3xl transition-opacity duration-500 group-hover:opacity-25"
              style={{ background: "#2fbbb3" }}
            />

            <div className="relative flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-8">
              <span
                className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl border text-2xl"
                style={{
                  color: "#e35ec7",
                  borderColor: "#e35ec733",
                  background: "#e35ec71a",
                }}
              >
                <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
                  <ellipse cx="6.2" cy="7.8" rx="2" ry="2.6" />
                  <ellipse cx="10.4" cy="4.8" rx="2" ry="2.7" />
                  <ellipse cx="15.4" cy="5.6" rx="2" ry="2.6" transform="rotate(12 15.4 5.6)" />
                  <ellipse cx="19" cy="9.6" rx="1.9" ry="2.4" transform="rotate(28 19 9.6)" />
                  <path d="M12.6 9.8c2.6 0 5.6 2.6 6.1 5.4.34 1.9-.72 3.6-2.6 3.9-1.4.22-2.4-.34-3.5-.34-1.1 0-2.2.56-3.5.34-1.9-.32-2.95-2-2.6-3.9.5-2.8 3.5-5.4 6.1-5.4z" />
                </svg>
              </span>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-foreground sm:text-2xl">
                  {t("charityTitle")}
                </h2>
                <p className="mt-2 max-w-3xl text-sm leading-relaxed text-zinc-400 sm:text-base">
                  {t("charityText")}
                </p>
              </div>
              <span
                className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest transition-colors"
                style={{ color: "#e35ec7" }}
              >
                {t("charityCta")}
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
              </span>
            </div>
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
