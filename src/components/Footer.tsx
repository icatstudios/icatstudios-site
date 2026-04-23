import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

export default function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");

  const socialBase =
    "relative flex h-10 w-10 items-center justify-center rounded-full border border-card-border bg-card-bg/40 text-zinc-400 transition-all duration-300 hover:-translate-y-0.5";

  return (
    <footer className="relative z-10 mt-24 border-t border-card-border bg-background/70 backdrop-blur-sm">
      {/* Subtle glow line */}
      <div className="divider-fade" />

      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/images/logos/icat-logo.svg"
                alt="iCat Studios"
                width={36}
                height={36}
              />
              <span className="text-base font-semibold text-foreground">
                iCat Studios
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-zinc-500">
              {t("tagline")}
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold text-foreground">
              {t("linksHeading")}
            </h3>
            <Link
              href="/products"
              className="text-sm text-zinc-500 transition-colors hover:text-primary"
            >
              {tNav("products")}
            </Link>
            <Link
              href="/privacy-policy"
              className="text-sm text-zinc-500 transition-colors hover:text-primary"
            >
              {tNav("privacyPolicy")}
            </Link>
            <Link
              href="/term-of-use"
              className="text-sm text-zinc-500 transition-colors hover:text-primary"
            >
              {tNav("termOfUse")}
            </Link>
          </div>

          {/* Contact & Social */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold text-foreground">
              {t("contactHeading")}
            </h3>
            <a
              href="mailto:support@icatstudios.com"
              className="text-sm text-zinc-500 transition-colors hover:text-primary"
            >
              support@icatstudios.com
            </a>
            <div className="mt-1 flex gap-3">
              <a
                href="https://www.instagram.com/icatstudios"
                target="_blank"
                rel="noopener noreferrer"
                className={`${socialBase} hover:border-[#E1306C]/60 hover:text-[#E1306C] hover:shadow-[0_0_20px_rgba(225,48,108,0.35)]`}
                aria-label="Instagram"
              >
                <InstagramIcon />
              </a>
              <a
                href="https://www.x.com/icatstudios"
                target="_blank"
                rel="noopener noreferrer"
                className={`${socialBase} hover:border-foreground/40 hover:text-foreground hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]`}
                aria-label="X"
              >
                <XIcon />
              </a>
              <a
                href="https://www.youtube.com/channel/UCpIBOh7O5_tI5vCdYF8vfnQ"
                target="_blank"
                rel="noopener noreferrer"
                className={`${socialBase} hover:border-[#FF0000]/60 hover:text-[#FF0000] hover:shadow-[0_0_20px_rgba(255,0,0,0.35)]`}
                aria-label="YouTube"
              >
                <YouTubeIcon />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-card-border pt-6 text-center text-xs text-zinc-600">
          &copy; {new Date().getFullYear()} {t("copyright")}
        </div>
      </div>
    </footer>
  );
}
