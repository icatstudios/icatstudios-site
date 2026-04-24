interface GroundRingsProps {
  /** Wrapper class — position this over where the mascot's feet are */
  className?: string;
}

/**
 * Concentric glowing rings for the ground under the mascot.
 * Banner-style ambient energy platform.
 */
export default function GroundRings({ className = "" }: GroundRingsProps) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute ${className}`}
      style={{ perspective: "800px" }}
    >
      <div
        className="relative mx-auto"
        style={{ transform: "rotateX(68deg)", transformOrigin: "center" }}
      >
        <span
          className="ground-ring animate-ring-pulse"
          style={{ width: "520px", height: "520px" }}
        />
        <span
          className="ground-ring animate-ring-pulse-delayed"
          style={{ width: "360px", height: "360px" }}
        />
        <span
          className="ground-ring animate-ring-pulse-delayed-2"
          style={{ width: "220px", height: "220px" }}
        />
      </div>
    </div>
  );
}
