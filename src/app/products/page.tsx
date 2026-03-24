import type { Metadata } from "next";
import Image from "next/image";
import ScreenshotCarousel from "@/components/ScreenshotCarousel";
import StoreBadges from "@/components/StoreBadges";

export const metadata: Metadata = {
  title: "Products",
  description: "Explore our mobile applications and games.",
};

const potentialsScreenshots = Array.from(
  { length: 10 },
  (_, i) => `/images/potentials/image${i + 1}.png`
);

const fastAndBlockyScreenshots = [
  "/images/fastandblocky/0x0ss.png",
  "/images/fastandblocky/0x0ss-2.png",
  "/images/fastandblocky/0x0ss-3.png",
  "/images/fastandblocky/0x0ss-4.png",
  "/images/fastandblocky/0x0ss-5.png",
];

export default function ProductsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="mb-4 text-4xl font-bold text-foreground">Products</h1>
      <p className="mb-16 text-zinc-500">
        Our mobile applications and games
      </p>

      {/* Potentials */}
      <section id="potentials" className="mb-24 scroll-mt-24">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
          <div className="flex-shrink-0 lg:w-1/3">
            <div className="flex items-center gap-4 mb-6">
              <Image
                src="/images/potentials/potentials_icon.png"
                alt="Potentials icon"
                width={72}
                height={72}
                className="rounded-2xl"
              />
              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  Potentials: FC26 Career Mode
                </h2>
                <span className="text-sm text-primary">1.000.000+ Downloads</span>
              </div>
            </div>
            <p className="mb-4 text-zinc-400">
              A comprehensive player database covering FIFA 18 through FC 26,
              featuring detailed data of more than 20,000 football players
              including men&apos;s and women&apos;s teams, plus nearly 1,000 clubs
              worldwide.
            </p>
            <p className="mb-6 text-zinc-400">
              Filter players by overall/potential rating, market value, position,
              attributes, club, league, nationality, and more.
            </p>
            <StoreBadges
              appStoreUrl="https://apps.apple.com/us/app/player-potentials-22/id1585809569"
              playStoreUrl="https://play.google.com/store/apps/details?id=com.mb.playerpotentials22"
            />
          </div>
          <div className="lg:w-2/3">
            <ScreenshotCarousel
              images={potentialsScreenshots}
              alt="Potentials: FC26 Career Mode"
            />
          </div>
        </div>
      </section>

      {/* Fast and Blocky */}
      <section id="fastandblocky" className="mb-24 scroll-mt-24">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
          <div className="flex-shrink-0 lg:w-1/3">
            <div className="flex items-center gap-4 mb-6">
              <Image
                src="/images/fastandblocky/fastandblockyblocky_icon.png"
                alt="Fast and Blocky icon"
                width={72}
                height={72}
                className="rounded-2xl"
              />
              <h2 className="text-2xl font-bold text-foreground">
                Fast and Blocky
              </h2>
            </div>
            <p className="mb-6 text-zinc-400">
              An endless motorcycle racing game where you avoid randomly
              generated traffic while riding at high speeds. Navigate through
              traffic without crashing into vehicles!
            </p>
            <StoreBadges
              appStoreUrl="https://apps.apple.com/us/app/fast-and-blocky/id1165989435"
            />
          </div>
          <div className="lg:w-2/3">
            <ScreenshotCarousel
              images={fastAndBlockyScreenshots}
              alt="Fast and Blocky"
              isLandscape
            />
          </div>
        </div>
      </section>

      {/* Score Hunter - Coming Soon */}
      <section id="scorehunter" className="scroll-mt-24">
        <div className="relative overflow-hidden rounded-2xl border border-card-border bg-card-bg p-8 lg:p-12">
          <div className="absolute top-0 right-0 h-full w-1/2 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-l from-primary/30 to-transparent" />
          </div>

          <div className="relative z-10 flex flex-col items-center gap-8 lg:flex-row lg:items-center">
            <Image
              src="/images/scorehunter/mascot_website.png"
              alt="Score Hunter mascot"
              width={200}
              height={200}
              className="flex-shrink-0"
            />
            <div className="text-center lg:text-left">
              <div className="mb-2 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
                <Image
                  src="/images/scorehunter/scorehunter_icon.png"
                  alt="Score Hunter icon"
                  width={56}
                  height={56}
                  className="rounded-xl"
                />
                <h2 className="text-2xl font-bold text-foreground">
                  Score Hunter
                </h2>
                <span className="rounded-full bg-primary/20 px-4 py-1 text-sm font-medium text-primary">
                  Coming Soon
                </span>
              </div>
              <p className="mt-4 text-zinc-400">
                Something exciting is on the way. A brand new experience from
                iCat Studios. Stay tuned!
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
