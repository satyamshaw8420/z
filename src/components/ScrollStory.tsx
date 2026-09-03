import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { SCENES } from "../data/menu";
import { scrollToId } from "../lib/scroll";
import { Magnetic } from "./ui";

const N = SCENES.length + 1; // 4 food scenes + final CTA scene

function SceneLayer({
  index,
  progress,
}: {
  index: number;
  progress: MotionValue<number>;
}) {
  const scene = SCENES[index];
  const reduced = useReducedMotion();

  const opacity = useTransform(
    progress,
    [
      Math.max((index - 0.6) / N, -0.2),
      (index + 0.02) / N,
      (index + 0.45) / N,
      (index + 1.05) / N,
    ],
    [0, 1, 1, 0]
  );
  const scale = useTransform(
    progress,
    [index / N, (index + 0.5) / N],
    [0.94, 1]
  );
  const imgY = useTransform(
    progress,
    [(index - 0.5) / N, (index + 1.5) / N],
    reduced ? [0, 0] : [70, -70]
  );
  const imgRotate = useTransform(
    progress,
    [(index - 0.2) / N, (index + 1.2) / N],
    reduced ? [0, 0] : [index % 2 === 1 ? 4 : -4, index % 2 === 1 ? 1.5 : -1.5]
  );

  const flip = index % 2 === 1;

  return (
    <motion.div
      className={
        reduced
          ? "relative min-h-[85vh] flex items-center border-b border-cream/10"
          : "absolute inset-0 flex items-center"
      }
      style={{ opacity: reduced ? undefined : opacity }}
    >
      <div className="mx-auto w-full max-w-7xl px-5 md:px-8 grid lg:grid-cols-12 gap-8 items-center">
        <motion.div
          className={`lg:col-span-7 relative z-10 ${flip ? "lg:order-2" : ""}`}
          style={{ scale: reduced ? undefined : scale }}
        >
          <span
            className="absolute -top-14 md:-top-20 -left-2 font-display text-[120px] md:text-[190px] leading-none text-outline-faint select-none pointer-events-none"
            aria-hidden
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <p className="font-body text-[10px] md:text-xs font-semibold tracking-[0.4em] text-zor">
            {scene.kicker}
          </p>
          <h3 className="font-display text-cream leading-[0.9] tracking-wide mt-3 text-[clamp(2.5rem,6.5vw,6.2rem)]">
            {scene.line}
          </h3>
          <p className="font-serif italic text-mute text-lg md:text-2xl mt-4 max-w-md">
            {scene.sub}
          </p>
        </motion.div>

        <motion.div
          className={`lg:col-span-5 ${flip ? "lg:order-1" : ""}`}
          style={{ y: imgY }}
        >
          <motion.div
            className="relative border border-cream/15 overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.6)]"
            style={{ rotate: imgRotate }}
            data-cursor="VIEW"
          >
            <img
              src={scene.image}
              alt={scene.alt}
              loading="lazy"
              className="w-full aspect-[4/3] object-cover"
            />
            <div className="absolute inset-0 bg-grain opacity-[0.08] pointer-events-none" />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function ScrollStory() {
  const containerRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(
    () =>
      scrollYProgress.on("change", (v) => {
        setActive(Math.min(N - 1, Math.floor(v * N)));
        setVisible(v > 0.01 && v < 0.985);
      }),
    [scrollYProgress]
  );

  const bg = useTransform(
    scrollYProgress,
    [0, 0.3, 0.55, 0.8, 1],
    ["#0d0d0d", "#161009", "#190f09", "#131009", "#0d0d0d"]
  );

  const finalOpacity = useTransform(
    scrollYProgress,
    [(N - 1.45) / N, (N - 0.72) / N],
    [0, 1]
  );
  const finalScale = useTransform(
    scrollYProgress,
    [(N - 1.2) / N, (N - 0.4) / N],
    [0.92, 1]
  );

  return (
    <section
      ref={containerRef}
      className={reduced ? "relative bg-ink" : "relative h-[420vh] md:h-[480vh]"}
      aria-label="The Zorko craving story"
    >
      <motion.div
        className="absolute inset-0"
        style={{ backgroundColor: reduced ? "#0d0d0d" : bg }}
        aria-hidden
      />

      <div className={reduced ? "relative" : "sticky top-0 h-screen overflow-hidden"}>
        {SCENES.map((_, i) => (
          <SceneLayer key={i} index={i} progress={scrollYProgress} />
        ))}

        {/* final scene */}
        <motion.div
          className={
            reduced
              ? "relative min-h-[85vh] flex items-center justify-center"
              : "absolute inset-0 flex items-center justify-center"
          }
          style={{
            opacity: reduced ? undefined : finalOpacity,
            scale: reduced ? undefined : finalScale,
          }}
        >
          <div className="text-center px-6 relative">
            <span
              className="absolute -top-20 md:-top-28 left-1/2 -translate-x-1/2 font-display text-[160px] md:text-[220px] leading-none text-outline-faint select-none pointer-events-none"
              aria-hidden
            >
              05
            </span>
            <p className="font-body text-[10px] md:text-xs font-semibold tracking-[0.4em] text-zor">
              SCENE 05
            </p>
            <h3 className="font-display text-cream leading-[0.9] tracking-wide mt-4 text-[clamp(2.8rem,8vw,7.5rem)]">
              YOU ORDER
              <br />
              <span className="text-zor">ANOTHER ONE.</span>
            </h3>
            <p className="font-hand text-cheese text-2xl md:text-3xl -rotate-2 mt-4">
              we warned you.
            </p>
            <Magnetic className="mt-10">
              <button
                onClick={() => scrollToId("menu")}
                data-cursor="OPEN →"
                className="font-display text-xl md:text-2xl tracking-[0.16em] bg-zor text-ink px-10 py-5 hover:bg-cheese transition-colors duration-300"
              >
                EXPLORE THE FULL MENU →
              </button>
            </Magnetic>
          </div>
        </motion.div>
      </div>

      {/* progress rail — lives inside the sticky viewport so it exists only here */}
      <div
        className={`sticky top-0 h-0 z-[60] transition-opacity duration-500 ${
          visible && !reduced ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="absolute right-4 md:right-8 top-[50vh] -translate-y-1/2 hidden sm:flex flex-col items-center gap-3 pointer-events-none">
          <span className="font-body text-[10px] font-semibold tracking-[0.3em] text-cream/70 [writing-mode:vertical-rl]">
            0{active + 1} / 0{N}
          </span>
          {Array.from({ length: N }).map((_, i) => (
            <span
              key={i}
              className={`block w-1.5 rounded-full transition-all duration-500 ${
                i === active ? "h-7 bg-zor" : "h-1.5 bg-cream/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
