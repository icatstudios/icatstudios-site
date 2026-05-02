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
  const gap = 8;

  /** Scroll so the target index is centered. Browser clamps to valid range,
   * so first item stays at left edge and last item at right edge naturally. */
  const scrollToIndex = useCallback(
    (index: number) => {
      const container = containerRef.current;
      if (!container) return;
      const containerWidth = container.offsetWidth;
      const itemTotal = itemWidth + gap;
      const target = index * itemTotal + itemWidth / 2 - containerWidth / 2;
      container.scrollTo({ left: target, behavior: "smooth" });
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

  // Auto-play (paused on hover)
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

  /**
   * Detect which item is "active" based on scroll position.
   * - When scrolled to the very start: index 0 (first item visible at left edge)
   * - When scrolled to the very end: last index (last item visible at right edge)
   * - Otherwise: the item whose center is closest to the viewport center
   *
   * Without these boundary clamps, Math.round on a scrollLeft=0 position would
   * pick item index 1 (because the viewport center sits past item 0's center),
   * so the first screenshot would never get focus on initial load.
   */
  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return;
    const scrollLeft = container.scrollLeft;
    const containerWidth = container.offsetWidth;
    const maxScroll = container.scrollWidth - containerWidth;
    const itemTotal = itemWidth + gap;

    let newIndex: number;
    if (scrollLeft <= 4) {
      newIndex = 0;
    } else if (maxScroll > 0 && scrollLeft >= maxScroll - 4) {
      newIndex = images.length - 1;
    } else {
      const center = scrollLeft + containerWidth / 2;
      newIndex = Math.round((center - itemWidth / 2) / itemTotal);
    }
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
        className="carousel-container flex gap-2 overflow-x-auto pb-4 pt-2"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {images.map((src, i) => {
          const isActive = i === activeIndex;
          return (
            <button
              key={i}
              type="button"
              onClick={() => scrollToIndex(i)}
              aria-label={`View screenshot ${i + 1}`}
              aria-current={isActive}
              className="group flex-shrink-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-xl"
              style={{
                scrollSnapAlign: "center",
                width: `${itemWidth}px`,
                ["--carousel-accent" as string]: accent,
              } as React.CSSProperties}
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
                    isActive
                      ? "opacity-100"
                      : "opacity-55 group-hover:opacity-80"
                  }`}
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
              </div>
            </button>
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
