import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { useRef, useState, type ReactNode, type MouseEvent } from "react";

/* ---------- Magnetic hover wrapper ---------- */
export function Magnetic({
  children,
  className = "",
  strength = 0.35,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const onMove = (e: MouseEvent) => {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setPos({
      x: (e.clientX - (r.left + r.width / 2)) * strength,
      y: (e.clientY - (r.top + r.height / 2)) * strength,
    });
  };

  return (
    <motion.div
      ref={ref}
      className={`inline-block ${className}`}
      onMouseMove={onMove}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 200, damping: 15, mass: 0.6 }}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Scroll reveal wrapper ---------- */
export function Reveal({
  children,
  className = "",
  delay = 0,
  y = 28,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
}) {
  const reduced = useReducedMotion();
  const variants: Variants = {
    hidden: { opacity: 0, y: reduced ? 0 : y },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
    },
  };
  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-60px" }}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Section header ---------- */
export function SectionHead({
  eyebrow,
  title,
  note,
  sub,
  align = "left",
  dark = true,
}: {
  eyebrow: string;
  title: ReactNode;
  note?: string;
  sub?: string;
  align?: "left" | "center";
  dark?: boolean;
}) {
  return (
    <div
      className={`relative ${align === "center" ? "text-center" : ""}`}
    >
      <Reveal>
        <p
          className={`font-body text-[11px] md:text-xs font-semibold tracking-[0.4em] uppercase flex items-center gap-3 ${
            align === "center" ? "justify-center" : ""
          } ${dark ? "text-zor" : "text-tomato"}`}
        >
          <span className={`h-px w-8 ${dark ? "bg-zor" : "bg-tomato"}`} />
          {eyebrow}
          {align === "center" && (
            <span className={`h-px w-8 ${dark ? "bg-zor" : "bg-tomato"}`} />
          )}
        </p>
      </Reveal>
      <Reveal delay={0.08}>
        <h2
          className={`font-display leading-[0.92] mt-4 text-[clamp(2.8rem,7vw,6.5rem)] tracking-wide ${
            dark ? "text-cream" : "text-ink"
          }`}
        >
          {title}
        </h2>
      </Reveal>
      {sub && (
        <Reveal delay={0.16}>
          <p
            className={`mt-4 font-serif italic text-lg md:text-2xl ${
              dark ? "text-mute" : "text-ink/70"
            } ${align === "center" ? "mx-auto" : ""} max-w-xl`}
          >
            {sub}
          </p>
        </Reveal>
      )}
      {note && (
        <Reveal delay={0.2}>
          <p
            className={`font-hand text-2xl md:text-3xl -rotate-2 mt-3 ${
              dark ? "text-zor" : "text-tomato"
            }`}
          >
            {note}
          </p>
        </Reveal>
      )}
    </div>
  );
}

/* ---------- Rotated stamp badge ---------- */
const STAMP_TONES: Record<string, string> = {
  cheese: "bg-cheese text-ink",
  zor: "bg-zor text-ink",
  tomato: "bg-tomato text-cream",
  cream: "bg-cream text-ink",
};

export function Stamp({
  label,
  tone = "cheese",
  className = "",
}: {
  label: string;
  tone?: keyof typeof STAMP_TONES;
  className?: string;
}) {
  return (
    <span
      className={`inline-block font-display text-[11px] md:text-xs tracking-[0.18em] px-2.5 py-1 border border-dashed border-ink/40 -rotate-3 ${STAMP_TONES[tone]} ${className}`}
    >
      {label === "BESTSELLER" ? "★ BEST SELLER" : label}
    </span>
  );
}

export function badgeTone(badge: string): keyof typeof STAMP_TONES {
  if (badge === "BESTSELLER") return "cheese";
  if (badge === "MUST TRY") return "zor";
  if (badge === "NEW") return "cream";
  return "tomato";
}
