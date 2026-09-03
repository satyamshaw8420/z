import { motion, useReducedMotion } from "framer-motion";
import { useMemo, useState } from "react";

export default function Loader({ onDone }: { onDone: () => void }) {
  const reduced = useReducedMotion();
  const [skipping, setSkipping] = useState(false);

  const fast = useMemo(() => {
    try {
      return sessionStorage.getItem("zorko_visited") === "1";
    } catch {
      return false;
    }
  }, []);

  const staticMode = !!reduced;
  const howrahDelay = staticMode ? 0 : fast ? 0.3 : 0.6;
  const tagDelay = staticMode ? 0.1 : fast ? 0.5 : 0.9;
  const exitDelay = staticMode ? 0.7 : fast ? 1.2 : 2.0;
  const exitDur = staticMode ? 0.35 : 0.65;

  const finish = () => {
    try {
      sessionStorage.setItem("zorko_visited", "1");
    } catch {
      /* ignore */
    }
    onDone();
  };

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-ink flex items-center justify-center overflow-hidden"
      initial={{ y: 0 }}
      animate={skipping ? { opacity: 0 } : { y: "-100%" }}
      transition={
        skipping
          ? { duration: 0.3, ease: "easeOut" }
          : { delay: exitDelay, duration: exitDur, ease: [0.76, 0, 0.24, 1] }
      }
      onAnimationComplete={finish}
    >
      {/* ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(55% 45% at 50% 42%, rgba(255,106,0,0.10), transparent 70%)",
        }}
      />

      <button
        onClick={() => setSkipping(true)}
        className="absolute top-6 right-6 md:top-8 md:right-10 font-body text-[11px] tracking-[0.35em] text-cream/40 hover:text-zor transition-colors"
        aria-label="Skip intro"
      >
        SKIP →
      </button>

      <div className="relative px-6 text-center flex flex-col items-center">
        <motion.img
          src="/logo.png"
          alt="Zorko Brand of Food Lovers"
          className="h-28 md:h-40 object-contain mx-auto drop-shadow-2xl"
          initial={staticMode ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5, y: 40 }}
          animate={staticMode ? { opacity: 1, scale: 1 } : { 
            opacity: 1, 
            scale: [0.5, 1.15, 0.95, 1.05, 1],
            y: 0
          }}
          transition={
            staticMode
              ? { duration: 0 }
              : { duration: 1.4, times: [0, 0.4, 0.6, 0.8, 1], ease: "easeInOut" }
          }
        />

        {/* HOWRAH */}
        <h1
          className="font-display text-cream tracking-[0.55em] text-xl md:text-3xl mt-8"
          aria-label="Howrah"
        >
          {"HOWRAH".split("").map((ch, i) => (
            <motion.span
              key={i}
              className="inline-block"
              initial={staticMode ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={
                staticMode
                  ? { duration: 0 }
                  : {
                      delay: howrahDelay + i * 0.05,
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1],
                    }
              }
            >
              {ch}
            </motion.span>
          ))}
        </h1>

        {/* tagline */}
        <motion.p
          className="font-hand text-zor text-2xl md:text-4xl mt-4 -rotate-2"
          initial={staticMode ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8, rotate: -8 }}
          animate={{ opacity: 1, scale: 1, rotate: -2 }}
          transition={
            staticMode
              ? { duration: 0 }
              : {
                  delay: tagDelay,
                  type: "spring",
                  stiffness: 260,
                  damping: 18,
                }
          }
        >
          Pure Veg. Full Power.
        </motion.p>
      </div>

      {/* progress */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-cream/10">
        <motion.div
          className="h-full bg-zor origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={
            staticMode
              ? { duration: 0 }
              : { duration: exitDelay + 0.2, ease: "linear" }
          }
        />
      </div>
    </motion.div>
  );
}
