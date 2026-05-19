import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import LegalPageHeader from "@/components/LegalPageHeader";
import DeleteAccountForm from "@/components/DeleteAccountForm";
import Reveal from "@/components/Reveal";
import { Link } from "@/i18n/navigation";

const VALID_APPS = ["score-hunter", "potentials"] as const;
type AppSlug = (typeof VALID_APPS)[number];

const APP_CONFIG: Record<
  AppSlug,
  {
    nameKey: string;
    accent: string;
    fields: { username?: boolean; email?: boolean; confirmCode?: boolean; notes?: boolean };
  }
> = {
  "score-hunter": {
    nameKey: "scoreHunter.name",
    accent: "#14f174",
    // Mirrors scorehunter.app/delete-account fields
    fields: { username: true, confirmCode: true, notes: true },
  },
  potentials: {
    nameKey: "potentials.name",
    accent: "#a855f7",
    // Same identity check as Score Hunter — confirm code from app settings
    fields: { username: true, confirmCode: true, notes: true },
  },
};

type Props = {
  params: Promise<{ locale: string; app: string }>;
};

export function generateStaticParams() {
  return VALID_APPS.map((app) => ({ app }));
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { locale, app } = await params;
  if (!VALID_APPS.includes(app as AppSlug)) return {};
  const t = await getTranslations({ locale, namespace: "deleteAccount" });
  const tp = await getTranslations({ locale, namespace: "products" });
  const config = APP_CONFIG[app as AppSlug];
  const appName = tp(config.nameKey);
  return {
    title: `${t("metaTitle")} — ${appName}`,
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

export default async function DeleteAccountAppPage({ params }: Props) {
  const { locale, app } = await params;
  if (!VALID_APPS.includes(app as AppSlug)) {
    notFound();
  }
  setRequestLocale(locale);

  const t = await getTranslations("deleteAccount");
  const tp = await getTranslations("products");
  const config = APP_CONFIG[app as AppSlug];
  const appName = tp(config.nameKey);

  return (
    <div className="relative">
      <LegalPageHeader
        eyebrow={appName}
        title={t("title")}
        subtitle={t("intro")}
        icon={<TrashIcon />}
      />

      <section className="relative mx-auto max-w-2xl px-6 pb-24">
        <Reveal>
          <Link
            href="/delete-account"
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500 transition-colors hover:text-foreground"
          >
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
              <polyline points="15 18 9 12 15 6" />
            </svg>
            {t("backToList")}
          </Link>
        </Reveal>

        <Reveal>
          <div
            className="mt-6 rounded-2xl border bg-card-bg/40 p-6 backdrop-blur sm:p-8"
            style={{ borderColor: `${config.accent}33` }}
          >
            <DeleteAccountForm
              appName={appName}
              accent={config.accent}
              fields={config.fields}
            />
          </div>
        </Reveal>
      </section>
    </div>
  );
}
