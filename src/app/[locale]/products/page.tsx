import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ScreenshotCarousel from "@/components/ScreenshotCarousel";
import StoreBadges from "@/components/StoreBadges";
import Reveal from "@/components/Reveal";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "products" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

const potentialsScreenshots = Array.from(
  { length: 10 },
  (_, i) => `/images/potentials/image${i + 1}.png`
);

const fastAndBlockyScreenshots = [
  "/images/fastandblocky/0x0ss.png",
  "/images/fastandblocky/0x0ss-2.png",
  "/images/fastandblocky/0x0ss-3.png",
  "/images/fastandblocky/0x0ss-4.png",
  "/images/fastandblocky/0x0ss-5.png",
];

// Product themes
const POTENTIALS_ACCENT = "#14f174";
const FASTBLOCKY_ACCENT = "#ff6b4a";
const SCOREHUNTER_ACCENT = "#14f174";
const SCOREHUNTER_SECONDARY = "#6a0dad";

export default async function ProductsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("products");

  return (
    <div className="relative">
      {/* Page header */}
      <section className="relative overflow-hidden px-6 pt-20 pb-14">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="absolute -top-40 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-primary/15 blur-[120px] animate-pulse-glow" />
        </div>
        <div className="relative z-10 mx-auto max-w-6xl">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">
              iCat Studios
            </p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              {t("pageTitle")}
            </h1>
            <p className="mt-3 max-w-xl text-zinc-500">{t("pageSubtitle")}</p>
            <div className="mt-6 h-px w-20 divider-fade" />
          </Reveal>
        </div>
      </section>

      {/* ============ Potentials ============ */}
      <section
        id="potentials"
        className="relative scroll-mt-20 overflow-hidden px-6 py-20"
      >
        {/* Themed background accent */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div
            className="absolute -top-32 -left-20 h-[520px] w-[520px] rounded-full blur-[120px] opacity-40"
            style={{
              background:
                "radial-gradient(circle, rgba(20,241,116,0.3), transparent 70%)",
            }}
          />
        </div>

        <Reveal className="relative z-10 mx-auto max-w-6xl">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-14">
            <div className="flex-shrink-0 lg:w-1/3">
              <div className="mb-6 flex items-center gap-4">
                <div className="relative">
                  <div
                    className="absolute inset-0 rounded-2xl blur-xl opacity-60"
                    style={{ background: POTENTIALS_ACCENT }}
                  />
                  <Image
                    src="/images/potentials/potentials_icon.png"
                    alt="Potentials icon"
                    width={72}
                    height={72}
                    className="relative rounded-2xl ring-1 ring-white/10"
                  />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">
                    {t("potentials.name")}
                  </h2>
                  <span
                    className="mt-1 inline-flex items-center gap-2 text-sm font-medium"
                    style={{ color: POTENTIALS_ACCENT }}
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-full animate-pulse"
                      style={{ background: POTENTIALS_ACCENT }}
                    />
                    {t("downloads")}
                  </span>
                </div>
              </div>
              <p className="mb-4 leading-relaxed text-zinc-400">
                {t("potentials.description1")}
              </p>
              <p className="mb-6 leading-relaxed text-zinc-400">
                {t("potentials.description2")}
              </p>
              <StoreBadges
                appStoreUrl="https://apps.apple.com/us/app/player-potentials-22/id1585809569"
                playStoreUrl="https://play.google.com/store/apps/details?id=com.mb.playerpotentials22"
              />
            </div>
            <div className="lg:w-2/3">
              <ScreenshotCarousel
                images={potentialsScreenshots}
                alt="Potentials: FC26 Career Mode"
                accent={POTENTIALS_ACCENT}
              />
            </div>
          </div>
        </Reveal>
      </section>

      {/* Divider */}
      <div className="mx-auto max-w-4xl px-6">
        <div className="divider-fade" />
      </div>

      {/* ============ Fast and Blocky ============ */}
      <section
        id="fastandblocky"
        className="relative scroll-mt-20 overflow-hidden px-6 py-20"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div
            className="absolute -top-20 -right-20 h-[520px] w-[520px] rounded-full blur-[120px] opacity-35"
            style={{
              background:
                "radial-gradient(circle, rgba(255,107,74,0.35), transparent 70%)",
            }}
          />
        </div>

        <Reveal className="relative z-10 mx-auto max-w-6xl">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-14">
            <div className="flex-shrink-0 lg:w-1/3">
              <div className="mb-6 flex items-center gap-4">
                <div className="relative">
                  <div
                    className="absolute inset-0 rounded-2xl blur-xl opacity-60"
                    style={{ background: FASTBLOCKY_ACCENT }}
                  />
                  <Image
                    src="/images/fastandblocky/fastandblockyblocky_icon.png"
                    alt="Fast and Blocky icon"
                    width={72}
                    height={72}
                    className="relative rounded-2xl ring-1 ring-white/10"
                  />
                </div>
                <h2 className="text-2xl font-bold text-foreground">
                  {t("fastAndBlocky.name")}
                </h2>
              </div>
              <p className="mb-6 leading-relaxed text-zinc-400">
                {t("fastAndBlocky.description")}
              </p>
              <StoreBadges appStoreUrl="https://apps.apple.com/us/app/fast-and-blocky/id1165989435" />
            </div>
            <div className="lg:w-2/3">
              <ScreenshotCarousel
                images={fastAndBlockyScreenshots}
                alt="Fast and Blocky"
                isLandscape
                accent={FASTBLOCKY_ACCENT}
              />
            </div>
          </div>
        </Reveal>
      </section>

      <div className="mx-auto max-w-4xl px-6">
        <div className="divider-fade" />
      </div>

      {/* ============ Score Hunter — Coming Soon ============ */}
      <section
        id="scorehunter"
        className="relative scroll-mt-20 overflow-hidden px-6 py-20"
      >
        <Reveal className="relative z-10 mx-auto max-w-6xl">
          <div
            className="relative overflow-hidden rounded-3xl border p-8 lg:p-14"
            style={{
              borderColor: "rgba(20,241,116,0.25)",
              background:
                "linear-gradient(135deg, rgba(18,18,26,0.9), rgba(18,18,26,0.6))",
            }}
          >
            {/* Themed blobs inside the card */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 overflow-hidden"
            >
              <div
                className="absolute -top-24 -right-24 h-[420px] w-[420px] rounded-full blur-[100px] animate-pulse-glow"
                style={{
                  background:
                    "radial-gradient(circle, rgba(20,241,116,0.35), transparent 70%)",
                }}
              />
              <div
                className="absolute -bottom-32 -left-16 h-[420px] w-[420px] rounded-full blur-[100px] animate-pulse-glow-delayed"
                style={{
                  background: `radial-gradient(circle, ${SCOREHUNTER_SECONDARY}55, transparent 70%)`,
                }}
              />
              {/* Grid overlay on this card only */}
              <div className="absolute inset-0 bg-grid opacity-30" />
            </div>

            <div className="relative z-10 flex flex-col items-center gap-10 lg:flex-row lg:items-center">
              <div className="relative flex-shrink-0">
                <div
                  className="absolute inset-0 rounded-full blur-3xl opacity-60 animate-pulse-glow"
                  style={{ background: SCOREHUNTER_ACCENT }}
                />
                <Image
                  src="/images/scorehunter/mascot_website.png"
                  alt="Score Hunter mascot"
                  width={220}
                  height={220}
                  className="relative animate-float"
                />
              </div>

              <div className="text-center lg:text-left">
                <div className="mb-4 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
                  <Image
                    src="/images/scorehunter/scorehunter_icon.png"
                    alt="Score Hunter icon"
                    width={56}
                    height={56}
                    className="rounded-xl ring-1 ring-white/10"
                  />
                  <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
                    Score Hunter
                  </h2>
                  <span
                    className="rounded-full border px-4 py-1 text-xs font-semibold uppercase tracking-widest animate-pulse-soft"
                    style={{
                      color: SCOREHUNTER_ACCENT,
                      borderColor: "rgba(20,241,116,0.4)",
                      background: "rgba(20,241,116,0.1)",
                    }}
                  >
                    {t("comingSoon")}
                  </span>
                </div>
                <p className="max-w-xl text-zinc-400 leading-relaxed">
                  {t("scoreHunter.description")}
                </p>
                <a
                  href="https://scorehunter.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="themed-btn mt-6 inline-flex items-center gap-2 rounded-full border px-6 py-2.5 text-sm font-semibold"
                  style={
                    {
                      color: SCOREHUNTER_ACCENT,
                      borderColor: "rgba(20,241,116,0.4)",
                      background: "rgba(20,241,116,0.08)",
                      ["--btn-color" as string]: SCOREHUNTER_ACCENT,
                    } as React.CSSProperties
                  }
                >
                  {t("scoreHunter.learnMore")}
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
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
