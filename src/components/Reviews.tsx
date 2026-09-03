import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { REVIEWS, SITE } from "../data/menu";
import { Reveal, SectionHead } from "./ui";

function Stars({ value = 5, size = 16 }: { value?: number; size?: number }) {
  const pct = (value / 5) * 100;
  return (
    <span className="relative inline-flex" aria-label={`${value} out of 5 stars`}>
      <span className="flex gap-0.5 text-cream/20">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={size} />
        ))}
      </span>
      <span
        className="absolute inset-0 overflow-hidden flex gap-0.5"
        style={{ width: `${pct}%` }}
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={size} className="fill-cheese text-cheese shrink-0" />
        ))}
      </span>
    </span>
  );
}

function RatingCounter() {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduced = useReducedMotion();
  const [val, setVal] = useState(reduced ? SITE.rating : 0);

  useEffect(() => {
    if (!inView || reduced) return;
    const controls = animate(0, SITE.rating, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setVal(parseFloat(v.toFixed(1))),
    });
    return () => controls.stop();
  }, [inView, reduced]);

  return (
    <div className="relative">
      <span
        ref={ref}
        className="font-display text-[clamp(6rem,14vw,11rem)] leading-none text-cream block"
      >
        {val.toFixed(1)}
        <span className="text-zor align-top text-[0.4em] tracking-normal">★</span>
      </span>
      <div className="mt-3 flex items-center gap-4">
        <Stars value={SITE.rating} size={20} />
        <span className="font-body text-xs font-semibold tracking-[0.3em] text-cheese border border-cheese/40 px-3 py-1.5">
          {SITE.reviews} GOOGLE REVIEWS
        </span>
      </div>
    </div>
  );
}

export default function Reviews() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    trackRef.current?.scrollBy({
      left: dir * Math.min(420, trackRef.current.clientWidth * 0.8),
      behavior: "smooth",
    });
  };

  return (
    <section className="relative bg-coal overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0 bg-grain opacity-[0.04] pointer-events-none" />
      <span className="absolute -top-6 right-0 font-display text-[20vw] leading-none text-outline-faint select-none pointer-events-none">
        4.6
      </span>

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-5">
            <SectionHead
              eyebrow="GOOGLE REVIEWS"
              title={
                <>
                  HOWRAH HAS
                  <br />
                  <span className="text-zor">SPOKEN.</span>
                </>
              }
              note="real plates, real opinions"
            />
            <Reveal delay={0.2} className="mt-10">
              <RatingCounter />
            </Reveal>
          </div>

          <div className="lg:col-span-7 lg:pb-6">
            <Reveal delay={0.15}>
              <p className="font-serif italic text-mute text-lg md:text-2xl leading-relaxed max-w-xl">
                Ratings straight from our Google listing. The cheese pulls get
                mentioned more than we'd like to admit. We're not sorry.
              </p>
            </Reveal>
            <div className="flex items-center gap-3 mt-8">
              <button
                onClick={() => scrollBy(-1)}
                aria-label="Previous reviews"
                className="p-3 border border-cream/20 text-cream/70 hover:border-zor hover:text-zor transition-colors"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => scrollBy(1)}
                aria-label="Next reviews"
                className="p-3 border border-cream/20 text-cream/70 hover:border-zor hover:text-zor transition-colors"
              >
                <ChevronRight size={18} />
              </button>
              <span className="font-body text-[10px] tracking-[0.3em] text-mute ml-2 hidden sm:block">
                DRAG OR TAP →
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* carousel */}
      <div className="relative mt-14 md:mt-16">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-28 z-10 bg-gradient-to-r from-coal to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-28 z-10 bg-gradient-to-l from-coal to-transparent" />

        <motion.div
          ref={trackRef}
          className="flex gap-5 overflow-x-auto no-scrollbar snap-x snap-mandatory px-5 md:px-[max(2rem,calc((100vw-80rem)/2+2rem))] pb-4 cursor-grab active:cursor-grabbing"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.08}
        >
          {REVIEWS.map((r, i) => (
            <motion.figure
              key={i}
              className="snap-start shrink-0 w-[300px] md:w-[420px] bg-ink border border-cream/10 hover:border-cheese/50 transition-colors duration-500 p-7 md:p-9 flex flex-col"
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <Stars value={5} size={15} />
              <blockquote className="font-serif italic text-cream/90 text-lg md:text-xl leading-relaxed mt-5 flex-1">
                “{r.quote}”
              </blockquote>
              <figcaption className="mt-6 pt-5 border-t border-cream/10 flex items-center justify-between">
                <span className="font-display text-cream text-lg tracking-[0.12em]">
                  — {r.name.toUpperCase()}
                </span>
                <span className="font-body text-[10px] tracking-[0.22em] text-mute">
                  {r.meta.toUpperCase()}
                </span>
              </figcaption>
            </motion.figure>
          ))}

          {/* end card */}
          <a
            href={SITE.mapsDirections}
            target="_blank"
            rel="noreferrer"
            data-cursor="OPEN →"
            className="snap-start shrink-0 w-[300px] md:w-[420px] bg-zor text-ink p-7 md:p-9 flex flex-col justify-between group"
          >
            <span className="font-display text-4xl md:text-5xl leading-[0.95] tracking-wide">
              EATEN HERE?
              <br />
              LEAVE SOME
              <br />
              LOVE.
            </span>
            <span className="font-body text-xs font-bold tracking-[0.25em] mt-8 flex items-center gap-2 group-hover:gap-4 transition-all">
              RATE US ON GOOGLE →
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
