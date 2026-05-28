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

const fastAndBlockyScreenshots = [
  "/images/fastandblocky/0x0ss.png",
  "/images/fastandblocky/0x0ss-2.png",
  "/images/fastandblocky/0x0ss-3.png",
  "/images/fastandblocky/0x0ss-4.png",
  "/images/fastandblocky/0x0ss-5.png",
];

/** Potentials screenshots are available in all 18 locales. */
const POTENTIALS_LOCALES = new Set([
  "ar", "cs", "da", "de", "en", "es", "fr", "it", "ja", "ko",
  "nl", "no", "pl", "pt", "ru", "sv", "tr", "zh",
]);

/** Score Hunter screenshots are only available in 7 locales — others fall back to EN. */
const SCOREHUNTER_LOCALES = new Set(["de", "en", "es", "fr", "it", "pt", "tr"]);

/** SwapMap screenshots — only EN + TR localized for now; others fall back to EN. */
const SWAPMAP_LOCALES = new Set(["en", "tr"]);

/** Map a locale to the closest available screenshot folder. */
function resolveScreenshotLocale(
  locale: string,
  available: Set<string>
): string {
  if (available.has(locale)) return locale;
  // Fall back to base language for regional variants (e.g. pt-br → pt)
  const base = locale.split("-")[0];
  if (available.has(base)) return base;
  return "en";
}

function getPotentialsScreenshots(locale: string): string[] {
  const lang = resolveScreenshotLocale(locale, POTENTIALS_LOCALES);
  return Array.from(
    { length: 10 },
    (_, i) => `/images/potentials/screenshots/${lang}/${i + 1}.png`
  );
}

function getScoreHunterScreenshots(locale: string): string[] {
  const lang = resolveScreenshotLocale(locale, SCOREHUNTER_LOCALES);
  return Array.from(
    { length: 8 },
    (_, i) => `/images/scorehunter/screenshots/${lang}/${i + 1}.png`
  );
}

function getSwapMapScreenshots(locale: string): string[] {
  const lang = resolveScreenshotLocale(locale, SWAPMAP_LOCALES);
  return Array.from(
    { length: 5 },
    (_, i) => `/images/swapmap/screenshots/${lang}/${i + 1}.png`
  );
}

// Product themes
const POTENTIALS_ACCENT = "#a855f7";
const FASTBLOCKY_ACCENT = "#ff6b4a";
const SCOREHUNTER_ACCENT = "#14f174";
const SWAPMAP_ACCENT = "#06b6d4";

// TODO: add App Store URL when iOS approval is complete
const SCOREHUNTER_APP_STORE_URL: string | undefined = undefined;
const SCOREHUNTER_PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.icatstudios.scorehunter";

const SWAPMAP_APP_STORE_URL =
  "https://apps.apple.com/us/app/swapmap-cards-stickers-tcg/id6769533772";
const SWAPMAP_PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.icatstudios.swapmap";

export default async function ProductsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("products");
  const potentialsScreenshots = getPotentialsScreenshots(locale);
  const scoreHunterScreenshots = getScoreHunterScreenshots(locale);
  const swapMapScreenshots = getSwapMapScreenshots(locale);

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
            <p
              lang="en"
              className="text-xs font-semibold uppercase tracking-[0.35em] text-primary"
            >
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

      {/* ============ Score Hunter ============ */}
      <section
        id="scorehunter"
        className="relative scroll-mt-20 overflow-hidden px-6 py-20"
      >
        {/* Themed background — green + secondary purple */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div
            className="absolute -top-32 -left-20 h-[520px] w-[520px] rounded-full blur-[120px] opacity-45 animate-pulse-glow"
            style={{
              background:
                "radial-gradient(circle, rgba(20,241,116,0.3), transparent 70%)",
            }}
          />
          <div
            className="absolute -bottom-32 -right-20 h-[520px] w-[520px] rounded-full blur-[120px] opacity-40 animate-pulse-glow-delayed"
            style={{
              background:
                "radial-gradient(circle, rgba(106,13,173,0.4), transparent 70%)",
            }}
          />
        </div>

        <Reveal className="relative z-10 mx-auto max-w-6xl">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-14">
            <div className="flex-shrink-0 lg:w-1/3">
              <div className="mb-6 flex items-center gap-4">
                <div className="relative shrink-0">
                  <div
                    className="absolute inset-0 rounded-2xl blur-xl opacity-70 animate-pulse-glow"
                    style={{ background: SCOREHUNTER_ACCENT }}
                  />
                  <Image
                    src="/images/scorehunter/scorehunter_icon.png"
                    alt={`${t("scoreHunter.name")} icon`}
                    width={72}
                    height={72}
                    className="relative rounded-2xl ring-1 ring-white/10"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-bold text-foreground">
                    {t("scoreHunter.name")}
                  </h2>
                  <span
                    className="rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.2em] animate-pulse-soft"
                    style={{
                      color: SCOREHUNTER_ACCENT,
                      borderColor: `${SCOREHUNTER_ACCENT}66`,
                      background: `${SCOREHUNTER_ACCENT}1a`,
                    }}
                  >
                    {t("scoreHunter.newBadge")}
                  </span>
                </div>
              </div>

              {/* Mascot — decorative inline */}
              <div className="relative mb-6 hidden lg:block">
                <div
                  className="absolute inset-0 rounded-full blur-2xl opacity-60"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(20,241,116,0.45), rgba(106,13,173,0.3) 60%, transparent 80%)",
                  }}
                />
                <Image
                  src="/images/scorehunter/mascot_website.png"
                  alt={`${t("scoreHunter.name")} mascot`}
                  width={220}
                  height={220}
                  className="relative animate-float"
                />
              </div>

              <p
                className="mb-3 text-sm font-semibold uppercase tracking-[0.2em]"
                style={{ color: SCOREHUNTER_ACCENT }}
              >
                {t("scoreHunter.tagline")}
              </p>
              <p className="mb-4 leading-relaxed text-zinc-400">
                {t("scoreHunter.description1")}
              </p>
              <p className="mb-6 leading-relaxed text-zinc-400">
                {t("scoreHunter.description2")}
              </p>

              <StoreBadges
                appStoreUrl={SCOREHUNTER_APP_STORE_URL}
                appStoreComingSoon={!SCOREHUNTER_APP_STORE_URL}
                playStoreUrl={SCOREHUNTER_PLAY_STORE_URL}
                accent={SCOREHUNTER_ACCENT}
              />

              <a
                href="https://scorehunter.app"
                target="_blank"
                rel="noopener noreferrer"
                className="themed-btn mt-6 inline-flex items-center gap-2 rounded-full border px-5 py-2 text-xs font-semibold uppercase tracking-widest"
                style={
                  {
                    color: SCOREHUNTER_ACCENT,
                    borderColor: "rgba(20,241,116,0.35)",
                    background: "rgba(20,241,116,0.06)",
                    ["--btn-color" as string]: SCOREHUNTER_ACCENT,
                  } as React.CSSProperties
                }
              >
                {t("scoreHunter.learnMore")}
                <svg
                  width="12"
                  height="12"
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

            <div className="lg:w-2/3">
              <ScreenshotCarousel
                images={scoreHunterScreenshots}
                alt={t("scoreHunter.name")}
                accent={SCOREHUNTER_ACCENT}
              />
            </div>
          </div>
        </Reveal>
      </section>

      <div className="mx-auto max-w-4xl px-6">
        <div className="divider-fade" />
      </div>

      {/* ============ SwapMap ============ */}
      <section
        id="swapmap"
        className="relative scroll-mt-20 overflow-hidden px-6 py-20"
      >
        {/* Themed background — cyan + secondary teal */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div
            className="absolute -top-32 -left-20 h-[520px] w-[520px] rounded-full blur-[120px] opacity-40 animate-pulse-glow"
            style={{
              background:
                "radial-gradient(circle, rgba(6,182,212,0.32), transparent 70%)",
            }}
          />
          <div
            className="absolute -bottom-32 -right-20 h-[520px] w-[520px] rounded-full blur-[120px] opacity-35 animate-pulse-glow-delayed"
            style={{
              background:
                "radial-gradient(circle, rgba(34,211,238,0.28), transparent 70%)",
            }}
          />
        </div>

        <Reveal className="relative z-10 mx-auto max-w-6xl">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-14">
            <div className="flex-shrink-0 lg:w-1/3">
              <div className="mb-6 flex items-center gap-4">
                <div className="relative shrink-0">
                  <div
                    className="absolute inset-0 rounded-2xl blur-xl opacity-70 animate-pulse-glow"
                    style={{ background: SWAPMAP_ACCENT }}
                  />
                  <Image
                    src="/images/swapmap/swapmap_icon.png"
                    alt={`${t("swapMap.name")} icon`}
                    width={72}
                    height={72}
                    className="relative rounded-2xl ring-1 ring-white/10"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-bold text-foreground">
                    {t("swapMap.name")}
                  </h2>
                  <span
                    className="rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.2em] animate-pulse-soft"
                    style={{
                      color: SWAPMAP_ACCENT,
                      borderColor: `${SWAPMAP_ACCENT}66`,
                      background: `${SWAPMAP_ACCENT}1a`,
                    }}
                  >
                    {t("swapMap.newBadge")}
                  </span>
                </div>
              </div>

              <p
                className="mb-3 text-sm font-semibold uppercase tracking-[0.2em]"
                style={{ color: SWAPMAP_ACCENT }}
              >
                {t("swapMap.tagline")}
              </p>
              <p className="mb-4 leading-relaxed text-zinc-400">
                {t("swapMap.description1")}
              </p>
              <p className="mb-6 leading-relaxed text-zinc-400">
                {t("swapMap.description2")}
              </p>

              <StoreBadges
                appStoreUrl={SWAPMAP_APP_STORE_URL}
                playStoreUrl={SWAPMAP_PLAY_STORE_URL}
                accent={SWAPMAP_ACCENT}
              />
            </div>

            <div className="lg:w-2/3">
              <ScreenshotCarousel
                images={swapMapScreenshots}
                alt={t("swapMap.name")}
                accent={SWAPMAP_ACCENT}
              />
            </div>
          </div>
        </Reveal>
      </section>

      <div className="mx-auto max-w-4xl px-6">
        <div className="divider-fade" />
      </div>

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
                "radial-gradient(circle, rgba(168,85,247,0.32), transparent 70%)",
            }}
          />
        </div>

        <Reveal className="relative z-10 mx-auto max-w-6xl">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-14">
            <div className="flex-shrink-0 lg:w-1/3">
              <div className="mb-6 flex items-center gap-4">
                <div className="relative shrink-0">
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
                accent={POTENTIALS_ACCENT}
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
                <div className="relative shrink-0">
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
              <StoreBadges
                appStoreUrl="https://apps.apple.com/us/app/fast-and-blocky/id1165989435"
                accent={FASTBLOCKY_ACCENT}
              />
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
    </div>
  );
}
