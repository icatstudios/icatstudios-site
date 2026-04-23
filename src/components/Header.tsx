"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "/", label: t("home") },
    { href: "/products", label: t("products") },
    { href: "/privacy-policy", label: t("privacyPolicy") },
    { href: "/term-of-use", label: t("termOfUse") },
  ] as const;

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass-header shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="group flex items-center gap-3"
          onClick={() => setMenuOpen(false)}
        >
          <div className="relative">
            <div className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-br from-[var(--brand-teal)] via-[var(--brand-purple)] to-[var(--brand-pink)] opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-60" />
            <Image
              src="/images/logos/icat-logo.svg"
              alt="iCat Studios"
              width={40}
              height={40}
              className="transition-transform duration-300 group-hover:scale-105"
              priority
            />
          </div>
          <span className="text-base font-semibold tracking-tight text-foreground sm:text-lg">
            iCat Studios
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative text-sm transition-colors ${
                isActive(link.href)
                  ? "text-foreground"
                  : "text-zinc-400 hover:text-foreground"
              }`}
            >
              {link.label}
              {isActive(link.href) && (
                <span className="absolute -bottom-1.5 left-0 right-0 h-[2px] rounded-full bg-gradient-to-r from-[var(--brand-teal)] via-[var(--brand-purple)] to-[var(--brand-pink)]" />
              )}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <LanguageSwitcher />
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span
            className={`block h-0.5 w-6 bg-foreground transition-transform duration-300 ${
              menuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-foreground transition-opacity duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-foreground transition-transform duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="md:hidden glass-header border-t border-card-border px-6 py-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`flex items-center justify-between py-3 text-sm transition-colors ${
                isActive(link.href)
                  ? "text-primary"
                  : "text-zinc-400 hover:text-foreground"
              }`}
            >
              {link.label}
              {isActive(link.href) && (
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              )}
            </Link>
          ))}
          <div className="mt-3 pt-3 border-t border-card-border">
            <LanguageSwitcher />
          </div>
        </nav>
      )}
    </header>
  );
}
