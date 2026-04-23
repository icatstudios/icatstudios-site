"use client";

import Image from "next/image";
import { useRef, useState, useEffect, useCallback } from "react";

interface ScreenshotCarouselProps {
  images: string[];
  alt: string;
  isLandscape?: boolean;
  /** Any valid CSS color — used for active dot + arrow hover + glow */
  accent?: string;
}

export default function ScreenshotCarousel({
  images,
  alt,
  isLandscape = false,
  accent = "#2fbbb3",
}: ScreenshotCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const itemWidth = isLandscape ? 400 : 220;
  const gap = 16;

  const scrollToIndex = useCallback(
    (index: number) => {
      if (!containerRef.current) return;
      const target = index * (itemWidth + gap);
      containerRef.current.scrollTo({ left: target, behavior: "smooth" });
      setActiveIndex(index);
    },
    [itemWidth]
  );

  const goNext = useCallback(() => {
    const next = activeIndex < images.length - 1 ? activeIndex + 1 : 0;
    scrollToIndex(next);
  }, [activeIndex, images.length, scrollToIndex]);

  const goPrev = useCallback(() => {
    const prev = activeIndex > 0 ? activeIndex - 1 : images.length - 1;
    scrollToIndex(prev);
  }, [activeIndex, images.length, scrollToIndex]);

  useEffect(() => {
    if (isHovered) {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
      return;
    }
    autoPlayRef.current = setInterval(goNext, 3500);
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [goNext, isHovered]);

  const handleScroll = () => {
    if (!containerRef.current) return;
    const scrollLeft = containerRef.current.scrollLeft;
    const newIndex = Math.round(scrollLeft / (itemWidth + gap));
    setActiveIndex(Math.min(Math.max(newIndex, 0), images.length - 1));
  };

  const arrowBase =
    "carousel-arrow group absolute top-1/2 -translate-y-1/2 z-10 flex h-11 w-11 items-center justify-center rounded-full border backdrop-blur-sm";

  return (
    <div
      className="relative flex flex-col gap-5"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={
        { ["--carousel-accent" as string]: accent } as React.CSSProperties
      }
    >
      {/* Arrow buttons */}
      <button
        onClick={goPrev}
        className={`${arrowBase} left-0 -translate-x-3 border-card-border bg-background/80 text-foreground`}
        aria-label="Previous screenshot"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-transform duration-300 group-hover:-translate-x-0.5"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
      <button
        onClick={goNext}
        className={`${arrowBase} right-0 translate-x-3 border-card-border bg-background/80 text-foreground`}
        aria-label="Next screenshot"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-transform duration-300 group-hover:translate-x-0.5"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      {/* Carousel */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="carousel-container flex gap-4 overflow-x-auto pb-4 pt-2"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {images.map((src, i) => {
          const isActive = i === activeIndex;
          return (
            <div
              key={i}
              className="flex-shrink-0"
              style={{
                scrollSnapAlign: "start",
                width: `${itemWidth}px`,
              }}
            >
              <div
                className="relative overflow-hidden rounded-xl border transition-all duration-500"
                style={{
                  borderColor: isActive ? accent : "rgba(255,255,255,0.08)",
                  boxShadow: isActive ? `0 0 32px ${accent}55` : "none",
                  transform: isActive ? "scale(1)" : "scale(0.94)",
                }}
              >
                <Image
                  src={src}
                  alt={`${alt} screenshot ${i + 1}`}
                  width={isLandscape ? 400 : 220}
                  height={isLandscape ? 225 : 476}
                  className={`transition-opacity duration-500 ${
                    isActive ? "opacity-100" : "opacity-55"
                  }`}
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Dots */}
      {images.length > 1 && (
        <div className="flex justify-center gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToIndex(i)}
              className="h-2 rounded-full transition-all duration-300"
              style={{
                width: i === activeIndex ? "24px" : "8px",
                background:
                  i === activeIndex ? accent : "rgba(255,255,255,0.18)",
              }}
              aria-label={`Go to screenshot ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
