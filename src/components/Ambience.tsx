import { motion, useReducedMotion } from "framer-motion";
import { IMG } from "../data/menu";
import { scrollToId } from "../lib/scroll";
import { Magnetic } from "./ui";

export default function Ambience() {
  const reduced = useReducedMotion();

  return (
    <section className="relative h-[92vh] min-h-[560px] overflow-hidden flex items-end">
      <div className="absolute inset-0">
        <motion.img
          src={IMG.ambience}
          alt="Inside Zorko Howrah — warm lights, open kitchen and good company"
          loading="lazy"
          className="w-full h-full object-cover"
          animate={reduced ? undefined : { scale: [1, 1.08, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/20" />
        <div className="absolute inset-0 bg-grain opacity-[0.07] pointer-events-none" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-5 md:px-8 pb-16 md:pb-24">
        <p className="font-body text-[11px] font-semibold tracking-[0.4em] text-cheese flex items-center gap-3">
          <span className="h-px w-8 bg-cheese" />
          THE ROOM
        </p>
        <h2 className="font-display text-cream leading-[0.9] tracking-wide mt-4 text-[clamp(3rem,9vw,8rem)]">
          {["GOOD FOOD.", "GOOD PEOPLE.", "GOOD VIBES."].map((line, i) => (
            <span key={line} className="block overflow-hidden">
              <motion.span
                className={`block ${i === 2 ? "text-zor" : ""}`}
                initial={{ y: "110%" }}
                whileInView={{ y: "0%" }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.85,
                  delay: i * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h2>

        <div className="flex flex-wrap items-center gap-6 mt-7">
          <p className="font-serif italic text-cream/80 text-xl md:text-2xl">
            Your table is waiting.
          </p>
          <p className="font-hand text-cheese text-2xl -rotate-2">come as you are, leave full</p>
        </div>

        <Magnetic className="mt-8">
          <button
            onClick={() => scrollToId("visit")}
            data-cursor="OPEN →"
            className="font-display text-lg md:text-xl tracking-[0.16em] bg-cream text-ink px-8 py-4 hover:bg-cheese transition-colors duration-300"
          >
            VISIT ZORKO HOWRAH →
          </button>
        </Magnetic>
      </div>
    </section>
  );
}
