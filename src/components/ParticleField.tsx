interface Particle {
  top: string;
  left: string;
  size: number;
  color: string;
  delay: number;
  duration: number;
}

// Deterministic "random" particles (pseudo) so SSR and client match
const PARTICLES: Particle[] = [
  { top: "12%", left: "8%", size: 3, color: "#2fbbb3", delay: 0, duration: 3.2 },
  { top: "22%", left: "92%", size: 2, color: "#e35ec7", delay: 0.5, duration: 4 },
  { top: "45%", left: "4%", size: 4, color: "#6e46dd", delay: 1, duration: 3.5 },
  { top: "62%", left: "96%", size: 2, color: "#2fbbb3", delay: 1.5, duration: 2.8 },
  { top: "78%", left: "12%", size: 3, color: "#e35ec7", delay: 2, duration: 3.6 },
  { top: "88%", left: "82%", size: 2, color: "#6e46dd", delay: 0.8, duration: 4.2 },
  { top: "18%", left: "48%", size: 2, color: "#ffffff", delay: 1.2, duration: 3 },
  { top: "35%", left: "72%", size: 3, color: "#2fbbb3", delay: 2.4, duration: 3.8 },
  { top: "55%", left: "38%", size: 2, color: "#e35ec7", delay: 0.3, duration: 2.5 },
  { top: "8%", left: "68%", size: 4, color: "#6e46dd", delay: 1.8, duration: 4 },
  { top: "72%", left: "58%", size: 2, color: "#ffffff", delay: 2.7, duration: 3.2 },
  { top: "28%", left: "28%", size: 3, color: "#2fbbb3", delay: 0.9, duration: 3.5 },
  { top: "82%", left: "42%", size: 2, color: "#e35ec7", delay: 1.6, duration: 2.9 },
  { top: "42%", left: "88%", size: 3, color: "#6e46dd", delay: 2.1, duration: 3.7 },
  { top: "68%", left: "22%", size: 2, color: "#ffffff", delay: 0.6, duration: 3.1 },
  { top: "5%", left: "32%", size: 2, color: "#2fbbb3", delay: 2.9, duration: 3.4 },
  { top: "92%", left: "62%", size: 3, color: "#e35ec7", delay: 0.4, duration: 4.1 },
  { top: "15%", left: "78%", size: 2, color: "#6e46dd", delay: 1.9, duration: 3.3 },
];

interface ParticleFieldProps {
  className?: string;
}

export default function ParticleField({ className = "" }: ParticleFieldProps) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          className="particle animate-twinkle"
          style={{
            top: p.top,
            left: p.left,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
