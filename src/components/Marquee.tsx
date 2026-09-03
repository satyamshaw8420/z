import { Fragment } from "react";

/**
 * Ticker band — orange by default, `tone="cream"` for editorial strips.
 * Content is duplicated once and translated -50% for a seamless loop.
 */
export default function Marquee({
  items,
  tone = "zor",
  duration = 30,
  className = "",
}: {
  items: string[];
  tone?: "zor" | "cream";
  duration?: number;
  className?: string;
}) {
  const base =
    tone === "zor"
      ? "bg-zor text-ink"
      : "bg-cream text-ink border-y border-ink/10";

  return (
    <div
      className={`relative overflow-hidden py-3 md:py-4 ${base} ${className}`}
      aria-hidden
    >
      <div
        className="flex w-max animate-marquee"
        style={{ "--marquee-dur": `${duration}s` } as React.CSSProperties}
      >
        {[0, 1].map((dup) => (
          <Fragment key={dup}>
            {items.map((item, i) => (
              <span
                key={`${dup}-${i}`}
                className="flex items-center font-display text-lg md:text-2xl tracking-[0.12em] whitespace-nowrap"
              >
                <span className="px-6">{item}</span>
                <span className={tone === "zor" ? "text-ink/70" : "text-tomato"}>
                  ✶
                </span>
              </span>
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
