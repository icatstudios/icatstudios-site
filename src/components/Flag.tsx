"use client";

import {
  GB,
  TR,
  DE,
  FR,
  ES,
  IT,
  PT,
  BR,
  NL,
  NO,
  DK,
  SE,
  CZ,
  PL,
  RU,
  SA,
  JP,
  KR,
  CN,
} from "country-flag-icons/react/3x2";
import type { ComponentType, CSSProperties } from "react";

type FlagComponentProps = {
  className?: string;
  style?: CSSProperties;
  title?: string;
};

const FLAG_MAP: Record<string, ComponentType<FlagComponentProps>> = {
  GB,
  TR,
  DE,
  FR,
  ES,
  IT,
  PT,
  BR,
  NL,
  NO,
  DK,
  SE,
  CZ,
  PL,
  RU,
  SA,
  JP,
  KR,
  CN,
};

interface FlagProps {
  /** ISO 3166-1 alpha-2 country code (e.g. "TR", "GB", "BR"). */
  country: string;
  /** Optional CSS class for the wrapping element. */
  className?: string;
  /** Title/label for accessibility. */
  title?: string;
}

/**
 * Renders an SVG flag from country-flag-icons (3x2 ratio).
 * Wrapped in a rounded mask so corners look polished.
 */
export default function Flag({ country, className = "", title }: FlagProps) {
  const FlagComponent = FLAG_MAP[country.toUpperCase()];
  if (!FlagComponent) return null;
  return (
    <span
      className={`inline-block overflow-hidden rounded-[3px] ring-1 ring-white/10 ${className}`}
      title={title}
      aria-hidden={title ? undefined : true}
    >
      <FlagComponent
        className="block h-full w-full object-cover"
        style={{ display: "block" }}
      />
    </span>
  );
}
