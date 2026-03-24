"use client";

import Image from "next/image";
import { useRef, useState, useEffect, useCallback } from "react";

interface ScreenshotCarouselProps {
  images: string[];
  alt: string;
  isLandscape?: boolean;
}

export default function ScreenshotCarousel({
  images,
  alt,
  isLandscape = false,
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

  // Auto-play
  useEffect(() => {
    if (isHovered) {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
      return;
    }
    autoPlayRef.current = setInterval(goNext, 3000);
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

  return (
    <div
      className="relative flex flex-col gap-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Arrow buttons */}
      <button
        onClick={goPrev}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-background/80 border border-card-border text-foreground backdrop-blur-sm transition-all hover:bg-primary hover:text-background hover:border-primary"
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
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
      <button
        onClick={goNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-background/80 border border-card-border text-foreground backdrop-blur-sm transition-all hover:bg-primary hover:text-background hover:border-primary"
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
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      {/* Carousel */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="carousel-container flex gap-4 overflow-x-auto pb-4"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {images.map((src, i) => (
          <div
            key={i}
            className="flex-shrink-0"
            style={{
              scrollSnapAlign: "start",
              width: `${itemWidth}px`,
            }}
          >
            <Image
              src={src}
              alt={`${alt} screenshot ${i + 1}`}
              width={isLandscape ? 400 : 220}
              height={isLandscape ? 225 : 476}
              className={`rounded-xl border border-card-border transition-opacity duration-300 ${
                i === activeIndex ? "opacity-100" : "opacity-60"
              }`}
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        ))}
      </div>

      {/* Dots */}
      {images.length > 1 && (
        <div className="flex justify-center gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToIndex(i)}
              className={`h-2 rounded-full transition-all ${
                i === activeIndex
                  ? "w-6 bg-primary"
                  : "w-2 bg-zinc-700 hover:bg-zinc-500"
              }`}
              aria-label={`Go to screenshot ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
