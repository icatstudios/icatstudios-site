import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import LegalPageHeader from "@/components/LegalPageHeader";
import Reveal from "@/components/Reveal";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

const HEART_ACCENT = "#e35ec7";
const TEAL_ACCENT = "#2fbbb3";

function PawIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <ellipse cx="6.2" cy="7.8" rx="2" ry="2.6" />
      <ellipse cx="10.4" cy="4.8" rx="2" ry="2.7" />
      <ellipse cx="15.4" cy="5.6" rx="2" ry="2.6" transform="rotate(12 15.4 5.6)" />
      <ellipse cx="19" cy="9.6" rx="1.9" ry="2.4" transform="rotate(28 19 9.6)" />
      <path d="M12.6 9.8c2.6 0 5.6 2.6 6.1 5.4.34 1.9-.72 3.6-2.6 3.9-1.4.22-2.4-.34-3.5-.34-1.1 0-2.2.56-3.5.34-1.9-.32-2.95-2-2.6-3.9.5-2.8 3.5-5.4 6.1-5.4z" />
    </svg>
  );
}

function HeartIcon() {
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
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}

function BowlIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 11h18a9 9 0 0 1-4.5 7.5L17 21H7l.5-2.5A9 9 0 0 1 3 11z" />
      <path d="M8 7c0-1 .5-2 2-2M13 6c0-1 .5-2 2-2" />
    </svg>
  );
}

function ShieldHeartIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
      <path d="M12 15.5 9.7 13.2a1.63 1.63 0 0 1 2.3-2.3 1.63 1.63 0 0 1 2.3 2.3z" />
    </svg>
  );
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");

  const stats = [
    {
      key: "percent",
      value: t("statPercentValue"),
      label: t("statPercentLabel"),
      accent: HEART_ACCENT,
    },
    {
      key: "year",
      value: t("statYearValue"),
      label: t("statYearLabel"),
      accent: TEAL_ACCENT,
    },
    {
      key: "cats",
      value: t("statCatsValue"),
      label: t("statCatsLabel"),
      accent: "#a855f7",
    },
  ];

  return (
    <div className="relative">
      <LegalPageHeader
        eyebrow="iCat Studios"
        title={t("title")}
        subtitle={t("subtitle")}
        icon={<PawIcon />}
      />

      <section className="relative mx-auto max-w-4xl px-6 pb-24">
        {/* Story */}
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
            {t("storyEyebrow")}
          </p>
          <div className="mt-3 h-px w-20 divider-fade" />
          <div className="mt-8 space-y-5 leading-relaxed text-zinc-400">
            <p>{t("story1")}</p>
            <p>{t("story2")}</p>
            <p>{t("story3")}</p>
            <p className="text-zinc-300">{t("story4")}</p>
            <p>{t("story5")}</p>
          </div>
        </Reveal>

        {/* Stats */}
        <div className="mt-14 grid gap-5 sm:grid-cols-3">
          {stats.map((stat, i) => (
            <Reveal key={stat.key} delay={i * 120}>
              <div
                className="relative flex h-full flex-col items-center overflow-hidden rounded-2xl border border-card-border bg-card-bg/60 px-6 py-8 text-center backdrop-blur"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -top-14 left-1/2 h-28 w-28 -translate-x-1/2 rounded-full opacity-25 blur-3xl"
                  style={{ background: stat.accent }}
                />
                <div
                  className="text-4xl font-bold tracking-tight"
                  style={{ color: stat.accent }}
                >
                  {stat.value}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                  {stat.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Thank-you card */}
        <Reveal delay={120}>
          <div
            className="relative mt-14 overflow-hidden rounded-2xl border p-8 backdrop-blur sm:p-10"
            style={{
              borderColor: `${HEART_ACCENT}33`,
              background: "rgba(18,18,26,0.6)",
            }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -top-20 -right-20 h-56 w-56 rounded-full opacity-20 blur-3xl animate-pulse-glow"
              style={{ background: HEART_ACCENT }}
            />

            <div className="relative">
              <div className="flex items-center gap-4">
                <span
                  className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border"
                  style={{
                    color: HEART_ACCENT,
                    borderColor: `${HEART_ACCENT}33`,
                    background: `${HEART_ACCENT}1a`,
                  }}
                >
                  <HeartIcon />
                </span>
                <div>
                  <p
                    className="text-xs font-semibold uppercase tracking-[0.25em]"
                    style={{ color: HEART_ACCENT }}
                  >
                    {t("thanksEyebrow")}
                  </p>
                  <h2 className="mt-1 text-2xl font-bold text-foreground">
                    {t("thanksHeading")}
                  </h2>
                </div>
              </div>

              <p className="mt-6 leading-relaxed text-zinc-400">
                {t("thanks1")}
              </p>

              <ul className="mt-5 space-y-4">
                <li className="flex items-start gap-3">
                  <span
                    className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border"
                    style={{
                      color: TEAL_ACCENT,
                      borderColor: `${TEAL_ACCENT}33`,
                      background: `${TEAL_ACCENT}1a`,
                    }}
                  >
                    <BowlIcon />
                  </span>
                  <span className="text-sm leading-relaxed text-zinc-300 sm:text-base">
                    {t("thanksItem1")}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span
                    className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border"
                    style={{
                      color: "#a855f7",
                      borderColor: "#a855f733",
                      background: "#a855f71a",
                    }}
                  >
                    <ShieldHeartIcon />
                  </span>
                  <span className="text-sm leading-relaxed text-zinc-300 sm:text-base">
                    {t("thanksItem2")}
                  </span>
                </li>
              </ul>

              <p className="mt-7 font-semibold text-foreground">
                {t("thanks2")}
              </p>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
