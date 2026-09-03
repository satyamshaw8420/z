import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Play } from "lucide-react";
import { useRef } from "react";
import { SITE, TIMELINE } from "../data/menu";
import { Magnetic, Reveal, SectionHead } from "./ui";

export default function SharkTank() {
  const railRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start 0.8", "end 0.55"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="shark" className="relative bg-ink py-24 md:py-32 scroll-mt-16 overflow-hidden">
      {/* faint tank-blue glow, kept subtle */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(42% 34% at 85% 12%, rgba(255,201,40,0.06), transparent 70%)",
        }}
      />
      <span className="absolute top-10 -left-4 font-display text-[22vw] leading-none text-outline-faint select-none pointer-events-none rotate-90 origin-top-left">
        SHARK
      </span>

      <div className="relative mx-auto max-w-7xl px-5 md:px-8 grid lg:grid-cols-2 gap-16 lg:gap-20">
        {/* sticky intro */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHead
            eyebrow="THE JOURNEY"
            title={
              <>
                FROM A DREAM
                <br />
                TO THE <span className="text-cheese">TANK.</span>
              </>
            }
          />
          <Reveal delay={0.15}>
            <p className="font-serif italic text-mute text-lg md:text-2xl leading-relaxed mt-8 max-w-lg">
              Zorko's journey went beyond the neighbourhood — reaching the{" "}
              <b className="text-cream/90">Shark Tank India</b> stage while
              building a food brand around affordable, accessible,
              pure-vegetarian food.
            </p>
          </Reveal>
          <Reveal delay={0.22}>
            <p className="font-hand text-zor text-2xl md:text-3xl -rotate-2 mt-5">
              the pitch was a moment. the food is the story.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <Magnetic className="mt-9">
              <a
                href={SITE.sharkTankVideo}
                target="_blank"
                rel="noreferrer"
                data-cursor="OPEN →"
                className="group inline-flex items-center gap-4 font-display text-lg md:text-xl tracking-[0.14em] bg-cheese text-ink px-7 py-4 hover:bg-zor transition-colors duration-300"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-cheese group-hover:bg-ink group-hover:text-zor transition-colors">
                  <Play size={14} className="fill-current ml-0.5" />
                </span>
                WATCH THE SHARK TANK STORY
                <ArrowUpRight size={18} />
              </a>
            </Magnetic>
          </Reveal>

          <Reveal delay={0.36}>
            <div className="flex flex-wrap gap-2.5 mt-9">
              {["HOWRAH BORN", "100% PURE VEG", "₹59 ONWARDS", "SHARK TANK INDIA"].map(
                (chip) => (
                  <span
                    key={chip}
                    className="font-body text-[10px] font-semibold tracking-[0.25em] text-cream/60 border border-cream/15 px-3 py-1.5"
                  >
                    {chip}
                  </span>
                )
              )}
            </div>
            <p className="font-body text-[11px] text-mute/70 mt-6 max-w-sm leading-relaxed">
              * The appearance is part of the brand journey — no investment
              outcome is claimed here. The kulhads, however, are very real.
            </p>
          </Reveal>
        </div>

        {/* timeline */}
        <div ref={railRef} className="relative pl-10 md:pl-14">
          <div className="absolute left-[9px] md:left-[13px] top-2 bottom-2 w-px bg-cream/12" />
          <motion.div
            className="absolute left-[9px] md:left-[13px] top-2 bottom-2 w-px bg-zor origin-top"
            style={{ scaleY: lineScale }}
          />

          <ol className="space-y-14 md:space-y-20">
            {TIMELINE.map((t, i) => (
              <li key={t.title} className="relative">
                <Reveal delay={0.05}>
                  <span className="absolute -left-10 md:-left-14 top-1.5 flex h-5 w-5 md:h-6 md:w-6 items-center justify-center -translate-x-1/2 rotate-45 border border-zor bg-ink">
                    <span className="h-1.5 w-1.5 md:h-2 md:w-2 bg-zor rotate-0" />
                  </span>
                  <p className="font-body text-[10px] font-semibold tracking-[0.4em] text-zor">
                    {t.chapter}
                  </p>
                  <h3 className="font-display text-cream text-3xl md:text-5xl tracking-wide mt-2 leading-none">
                    {t.title}
                  </h3>
                  <p className="font-serif italic text-mute text-base md:text-xl mt-3 max-w-md leading-relaxed">
                    {t.copy}
                  </p>
                  {i === TIMELINE.length - 1 && (
                    <p className="font-hand text-cheese text-2xl -rotate-1 mt-4">
                      …and the cheese keeps melting
                    </p>
                  )}
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
