import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import { ArrowUpRight, Star } from "lucide-react";
import { IMG, SITE } from "../data/menu";
import { scrollToId } from "../lib/scroll";
import { Magnetic } from "./ui";

const maskLine: Variants = {
  hidden: { y: "110%" },
  show: (i: number) => ({
    y: "0%",
    transition: { duration: 0.9, delay: 0.25 + i * 0.14, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Hero({ start }: { start: boolean }) {
  const reduced = useReducedMotion();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 42, damping: 16 });
  const sy = useSpring(my, { stiffness: 42, damping: 16 });

  const imgX = useTransform(sx, [-1, 1], reduced ? [0, 0] : [16, -16]);
  const imgY = useTransform(sy, [-1, 1], reduced ? [0, 0] : [12, -12]);
  const textX = useTransform(sx, [-1, 1], reduced ? [0, 0] : [-8, 8]);
  const bgX = useTransform(sx, [-1, 1], reduced ? [0, 0] : [26, -26]);

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    if (reduced) return;
    mx.set((e.clientX / window.innerWidth - 0.5) * 2);
    my.set((e.clientY / window.innerHeight - 0.5) * 2);
  };

  return (
    <section
      id="top"
      onMouseMove={onMove}
      className="relative min-h-[100svh] flex flex-col overflow-hidden"
    >
      {/* ambient layers */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ x: bgX }}
        aria-hidden
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(48% 40% at 78% 30%, rgba(255,106,0,0.13), transparent 68%), radial-gradient(38% 32% at 12% 78%, rgba(230,57,32,0.08), transparent 70%)",
          }}
        />
        {/* giant watermark */}
        <div className="absolute -bottom-[6vw] left-1/2 -translate-x-1/2 font-display text-[26vw] leading-none text-outline-faint select-none whitespace-nowrap">
          ZORKO
        </div>
      </motion.div>

      <div className="relative flex-1 mx-auto w-full max-w-7xl px-5 md:px-8 pt-28 md:pt-36 pb-10 grid lg:grid-cols-12 gap-10 items-center">
        {/* copy */}
        <motion.div className="lg:col-span-7 relative z-10" style={{ x: textX }}>
          <motion.p
            className="font-body text-[11px] md:text-xs font-semibold tracking-[0.42em] text-zor flex items-center gap-3"
            initial={{ opacity: 0, y: 14 }}
            animate={start ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="h-px w-10 bg-zor" />
            ZORKO HOWRAH · PURE VEG
          </motion.p>

          <h1 className="font-display leading-[0.88] tracking-wide mt-6 text-[clamp(3.6rem,11vw,9.5rem)] text-cream">
            {["COME HUNGRY.", "LEAVE OBSESSED."].map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.06em]">
                <motion.span
                  className={`block ${i === 1 ? "text-zor" : ""}`}
                  custom={i}
                  variants={maskLine}
                  initial="hidden"
                  animate={start ? "show" : "hidden"}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            className="font-hand text-cheese text-2xl md:text-3xl -rotate-2 mt-2 ml-1"
            initial={{ opacity: 0, rotate: -10 }}
            animate={start ? { opacity: 1, rotate: -2 } : {}}
            transition={{ delay: 0.8, type: "spring", stiffness: 200, damping: 15 }}
          >
            best enjoyed hungry —
          </motion.p>

          <motion.p
            className="font-serif italic text-mute text-lg md:text-2xl max-w-md mt-5"
            initial={{ opacity: 0, y: 16 }}
            animate={start ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.55 }}
          >
            Big flavours. Crazy combinations. Pure vegetarian goodness — from
            kulhad pizzas to erupting momos.
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center gap-4 mt-9"
            initial={{ opacity: 0, y: 18 }}
            animate={start ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.7 }}
          >
            <Magnetic>
              <button
                onClick={() => scrollToId("menu")}
                data-cursor="OPEN →"
                className="group font-display text-lg md:text-xl tracking-[0.14em] bg-zor text-ink px-7 md:px-9 py-3.5 md:py-4 flex items-center gap-3 hover:bg-cheese transition-colors duration-300"
              >
                EXPLORE MENU
                <span className="transition-transform duration-300 group-hover:translate-x-1.5">
                  →
                </span>
              </button>
            </Magnetic>
            <Magnetic>
              <a
                href={SITE.mapsDirections}
                target="_blank"
                rel="noreferrer"
                data-cursor="OPEN →"
                className="font-display text-lg md:text-xl tracking-[0.14em] text-cream border border-cream/25 px-7 md:px-9 py-3.5 md:py-4 flex items-center gap-3 hover:border-zor hover:text-zor transition-colors duration-300"
              >
                GET DIRECTIONS
                <ArrowUpRight size={20} />
              </a>
            </Magnetic>
          </motion.div>

          {/* proof row */}
          <motion.div
            className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-10 font-body text-xs md:text-sm text-mute"
            initial={{ opacity: 0 }}
            animate={start ? { opacity: 1 } : {}}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <span className="flex items-center gap-1.5 text-cream/85">
              <Star size={14} className="fill-cheese text-cheese" />
              <b className="font-semibold">{SITE.rating}</b>
              <span className="text-mute">({SITE.reviews} reviews)</span>
            </span>
            <span className="hidden sm:block h-3 w-px bg-cream/20" />
            <span className="tracking-[0.22em]">100% PURE VEG</span>
            <span className="hidden sm:block h-3 w-px bg-cream/20" />
            <span className="tracking-[0.22em]">₹59 ONWARDS</span>
          </motion.div>
        </motion.div>

        {/* visual */}
        <div className="lg:col-span-5 relative">
          <motion.div
            className="relative mx-auto max-w-[420px]"
            style={{ x: imgX, y: imgY }}
            initial={{ opacity: 0, scale: 0.94, y: 40 }}
            animate={start ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* arch frame */}
            <div className="relative border border-cream/15 rounded-t-[999px] overflow-hidden bg-coal">
              <div className="overflow-hidden rounded-t-[999px]">
                <motion.img
                  src={IMG.heroPizza}
                  alt="Zorko cheese-loaded pizza with a dramatic cheese pull"
                  className="w-full aspect-[4/5] object-cover"
                  animate={reduced ? undefined : { scale: [1, 1.07, 1] }}
                  transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
              <div className="absolute inset-0 rounded-t-[999px] ring-1 ring-inset ring-cream/10 pointer-events-none" />
              <div
                className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to top, rgba(13,13,13,0.65), transparent)",
                }}
              />
              <p className="absolute bottom-4 left-16 md:left-24 right-0 text-center font-hand text-cheese text-xl md:text-2xl -rotate-1">
                extra cheese? obviously.
              </p>
            </div>

            {/* price sticker */}
            <motion.div
              className="absolute -top-2 -right-3 md:-right-8 bg-cheese text-ink px-4 py-2 -rotate-6 shadow-[6px_6px_0_rgba(0,0,0,0.45)]"
              style={{ "--tilt": "-6deg" } as React.CSSProperties}
              animate={reduced ? undefined : { y: [0, -9, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="font-display text-xl md:text-2xl tracking-wide block leading-none">
                KULHAD SPECIALS
              </span>
              <span className="font-body font-bold text-xs tracking-[0.18em]">
                ₹149 ONLY
              </span>
            </motion.div>

            {/* rotating stamp */}
            <div className="absolute -bottom-8 -left-4 md:-left-12 w-28 h-28 md:w-36 md:h-36">
              <svg viewBox="0 0 100 100" className="w-full h-full animate-spin-slow">
                <defs>
                  <path
                    id="stampCircle"
                    d="M50,50 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0"
                  />
                </defs>
                <circle cx="50" cy="50" r="49" className="fill-ink" />
                <circle
                  cx="50"
                  cy="50"
                  r="48"
                  fill="none"
                  stroke="#FF6A00"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                />
                <text className="fill-zor" style={{ fontSize: "10.5px", letterSpacing: "2.6px", fontFamily: "Space Grotesk, sans-serif", fontWeight: 700 }}>
                  <textPath href="#stampCircle">
                    PURE VEG · FULL POWER · EST. HOWRAH ·
                  </textPath>
                </text>
              </svg>
              <span className="absolute inset-0 flex items-center justify-center font-display text-cheese text-2xl md:text-3xl">
                Z
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* scroll cue */}
      <motion.div
        className="relative z-10 hidden md:flex items-center gap-3 mx-auto pb-8"
        initial={{ opacity: 0 }}
        animate={start ? { opacity: 1 } : {}}
        transition={{ delay: 1.3 }}
      >
        <span className="font-body text-[10px] tracking-[0.4em] text-mute">
          SCROLL
        </span>
        <span className="relative block w-px h-10 bg-cream/15 overflow-hidden">
          <span className="absolute inset-0 bg-zor animate-scroll-line" />
        </span>
      </motion.div>
    </section>
  );
}
