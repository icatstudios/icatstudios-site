interface BackgroundBlobsProps {
  /** Primary blob color — CSS color or CSS variable */
  primary?: string;
  /** Secondary blob color */
  secondary?: string;
  /** Overall intensity multiplier */
  intensity?: "low" | "medium" | "high";
}

export default function BackgroundBlobs({
  primary = "rgba(47, 187, 179, 0.28)",
  secondary = "rgba(227, 94, 199, 0.24)",
  intensity = "medium",
}: BackgroundBlobsProps) {
  const size =
    intensity === "low"
      ? "h-[420px] w-[420px]"
      : intensity === "high"
        ? "h-[700px] w-[700px]"
        : "h-[560px] w-[560px]";

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div
        className={`absolute -top-32 -right-24 ${size} rounded-full blur-[120px] animate-pulse-glow`}
        style={{ background: primary }}
      />
      <div
        className={`absolute -bottom-40 -left-24 ${size} rounded-full blur-[120px] animate-pulse-glow-delayed`}
        style={{ background: secondary }}
      />
    </div>
  );
}
