import Image from "next/image";

interface StoreBadgesProps {
  appStoreUrl?: string;
  playStoreUrl?: string;
}

export default function StoreBadges({
  appStoreUrl,
  playStoreUrl,
}: StoreBadgesProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {appStoreUrl && (
        <a
          href={appStoreUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-opacity hover:opacity-80"
        >
          <Image
            src="/images/badges/app-store.svg"
            alt="Download on the App Store"
            width={140}
            height={42}
          />
        </a>
      )}
      {playStoreUrl && (
        <a
          href={playStoreUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-opacity hover:opacity-80"
        >
          <Image
            src="/images/badges/google-play.svg"
            alt="Get it on Google Play"
            width={156}
            height={42}
          />
        </a>
      )}
    </div>
  );
}
