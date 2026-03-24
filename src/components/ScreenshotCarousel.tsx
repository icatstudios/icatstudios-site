"use client";

import Image from "next/image";
import { useRef, useState } from "react";

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

  const scrollTo = (index: number) => {
    if (!containerRef.current) return;
    const child = containerRef.current.children[index] as HTMLElement;
    if (child) {
      child.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
      setActiveIndex(index);
    }
  };

  const handleScroll = () => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const scrollLeft = container.scrollLeft;
    const childWidth =
      (container.children[0] as HTMLElement)?.offsetWidth || 1;
    const gap = 16;
    const newIndex = Math.round(scrollLeft / (childWidth + gap));
    setActiveIndex(Math.min(newIndex, images.length - 1));
  };

  return (
    <div className="flex flex-col gap-4">
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="carousel-container flex gap-4 overflow-x-auto scroll-snap-x-mandatory pb-4"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {images.map((src, i) => (
          <div
            key={i}
            className="flex-shrink-0 scroll-snap-start"
            style={{
              scrollSnapAlign: "start",
              width: isLandscape ? "400px" : "220px",
            }}
          >
            <Image
              src={src}
              alt={`${alt} screenshot ${i + 1}`}
              width={isLandscape ? 400 : 220}
              height={isLandscape ? 225 : 476}
              className="rounded-xl border border-card-border"
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
              onClick={() => scrollTo(i)}
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
