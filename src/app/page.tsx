import Image from "next/image";
import Link from "next/link";

const products = [
  {
    name: "Potentials: FC26 Career Mode",
    description:
      "A comprehensive player database covering FIFA 18 through FC 26, featuring detailed data of more than 20,000 football players.",
    icon: "/images/potentials/potentials_icon.png",
    href: "/products#potentials",
  },
  {
    name: "Fast and Blocky",
    description:
      "An endless motorcycle racing game where you avoid randomly generated traffic while riding at high speeds.",
    icon: "/images/fastandblocky/fastandblockyblocky_icon.png",
    href: "/products#fastandblocky",
  },
  {
    name: "Score Hunter",
    description:
      "A brand new experience is coming soon. Stay tuned for something exciting!",
    icon: "/images/scorehunter/scorehunter_icon.png",
    href: "/products#scorehunter",
    comingSoon: true,
  },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-background" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-6xl px-6 text-center">
          <div className="animate-fade-in-up opacity-0">
            <Image
              src="/images/logos/icat_logo_2000x2000.png"
              alt="iCat Studios"
              width={160}
              height={160}
              className="mx-auto mb-8"
              priority
            />
          </div>
          <h1 className="animate-fade-in-up opacity-0 animate-delay-100 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Mobile Application &<br />
            <span className="text-primary">Game Development</span>
          </h1>
          <p className="animate-fade-in-up opacity-0 animate-delay-200 mx-auto mt-6 max-w-2xl text-lg text-zinc-400">
            iCat Studios is a mobile application and game development team
            established in Turkey, giving importance to innovation and
            creativity.
          </p>
          <div className="animate-fade-in-up opacity-0 animate-delay-300 mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/products"
              className="rounded-full bg-primary px-8 py-3 text-sm font-medium text-background transition-colors hover:bg-primary-dark"
            >
              Our Products
            </Link>
            <a
              href="mailto:support@icatstudios.com"
              className="rounded-full border border-card-border px-8 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>

      {/* Products Preview */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <h2 className="mb-4 text-center text-3xl font-bold text-foreground">
          Our Products
        </h2>
        <p className="mb-12 text-center text-zinc-500">
          Check out what we&apos;ve been building
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          {products.map((product) => (
            <Link
              key={product.name}
              href={product.href}
              className="group relative rounded-2xl border border-card-border bg-card-bg p-6 transition-all hover:border-primary/50 hover:bg-card-bg/80"
            >
              {product.comingSoon && (
                <span className="absolute top-4 right-4 rounded-full bg-primary/20 px-3 py-1 text-xs font-medium text-primary">
                  Coming Soon
                </span>
              )}
              <Image
                src={product.icon}
                alt={product.name}
                width={64}
                height={64}
                className="mb-4 rounded-xl"
              />
              <h3 className="mb-2 text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                {product.name}
              </h3>
              <p className="text-sm text-zinc-500">{product.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
