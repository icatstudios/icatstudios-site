import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { routing } from "@/i18n/routing";
import "../globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });

  return {
    title: {
      default: t("metaTitle"),
      template: "%s | iCat Studios",
    },
    description: t("metaDescription"),
    metadataBase: new URL("https://icatstudios.com"),
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
        { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
      ],
      apple: "/apple-touch-icon.png",
    },
    manifest: "/manifest.json",
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
      siteName: "iCat Studios",
      locale: locale === "tr" ? "tr_TR" : "en_US",
      type: "website",
    },
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        tr: "/tr",
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      className={`${poppins.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="relative min-h-full flex flex-col bg-background text-foreground">
        <NextIntlClientProvider>
          {/* Global background decoration */}
          <div
            aria-hidden
            className="pointer-events-none fixed inset-0 z-0 bg-grid opacity-40"
          />
          <div
            aria-hidden
            className="pointer-events-none fixed inset-0 z-0 bg-gradient-to-b from-background via-background/40 to-background"
          />

          <Header />
          <main className="relative z-10 flex-1">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
