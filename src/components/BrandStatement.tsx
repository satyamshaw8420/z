import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Reveal } from "./ui";

const WORDS = ["FOOD", "SHOULD", "BE", "BORING?"];

export default function BrandStatement() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.6"],
  });

  return (
    <section
      id="story"
      ref={ref}
      className="relative bg-cream text-ink overflow-hidden scroll-mt-20"
    >
      {/* faint grain + oversized scribble */}
      <div className="absolute inset-0 bg-grain opacity-[0.05] pointer-events-none" />
      <span className="absolute -top-8 -right-6 font-display text-[30vw] leading-none text-outline-ink select-none pointer-events-none">
        Z
      </span>

      <div className="relative mx-auto max-w-7xl px-5 md:px-8 py-24 md:py-36 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-8">
          <Reveal>
            <p className="font-body text-[11px] md:text-xs font-semibold tracking-[0.4em] text-tomato flex items-center gap-3">
              <span className="h-px w-8 bg-tomato" />
              THE ZORKO BELIEF
            </p>
          </Reveal>

          <h2 className="font-display leading-[0.9] tracking-wide mt-6 text-[clamp(3.2rem,10.5vw,9rem)]">
            <span className="block">
              {WORDS.map((w, i) => {
                const opacity = useTransform(
                  scrollYProgress,
                  [i * 0.16, i * 0.16 + 0.18],
                  [0.12, 1]
                );
                return (
                  <motion.span
                    key={w}
                    style={{ opacity }}
                    className="inline-block mr-[0.28em]"
                  >
                    {w}
                  </motion.span>
                );
              })}
            </span>
            <motion.span
              className="block text-tomato relative"
              initial={{ opacity: 0.12 }}
              style={{
                opacity: useTransform(scrollYProgress, [0.55, 0.78], [0.12, 1]),
              }}
            >
              NEVER.
              <svg
                viewBox="0 0 300 24"
                className="absolute left-0 -bottom-2 w-[46%] max-w-[340px] overflow-visible"
                aria-hidden
              >
                <motion.path
                  d="M6 14 Q 80 4 150 12 T 294 10"
                  fill="none"
                  stroke="#E63920"
                  strokeWidth="6"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                />
              </svg>
            </motion.span>
          </h2>
        </div>

        <div className="lg:col-span-4 lg:pt-16">
          <Reveal delay={0.1}>
            <p className="font-serif italic text-xl md:text-2xl leading-relaxed text-ink/80">
              Some cravings aren't meant to be ignored. Zorko brings together
              comfort food, street-food energy and unapologetically bold
              flavours — all in a pure-vegetarian menu built for serious
              cravings.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="font-hand text-tomato text-3xl -rotate-2 mt-6">
              made with a little madness
            </p>
          </Reveal>

          <Reveal delay={0.28}>
            <dl className="mt-10 grid grid-cols-3 divide-x divide-ink/15 border-y border-ink/15">
              {[
                { v: "₹59+", k: "STARTS AT" },
                { v: "100%", k: "PURE VEG" },
                { v: "4.6★", k: "ON GOOGLE" },
              ].map((s) => (
                <div key={s.k} className="py-5 px-3 text-center">
                  <dt className="sr-only">{s.k}</dt>
                  <dd className="font-display text-3xl md:text-4xl">{s.v}</dd>
                  <dd className="font-body text-[10px] font-semibold tracking-[0.22em] text-ink/55 mt-1">
                    {s.k}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
