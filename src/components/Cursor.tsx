import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Desktop-only custom cursor. Reads `data-cursor` attributes to show
 * contextual labels: food → VIEW, CTAs → OPEN →, gallery → EXPLORE.
 */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [down, setDown] = useState(false);

  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);
  const ringX = useSpring(mx, { stiffness: 320, damping: 28, mass: 0.5 });
  const ringY = useSpring(my, { stiffness: 320, damping: 28, mass: 0.5 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (!fine || reduced) return;
    setEnabled(true);
    document.documentElement.classList.add("cursor-hidden");

    const move = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      const tagged = t?.closest?.("[data-cursor]") as HTMLElement | null;
      setLabel(tagged?.dataset.cursor ?? null);
    };
    const press = () => setDown(true);
    const lift = () => setDown(false);

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    window.addEventListener("mousedown", press);
    window.addEventListener("mouseup", lift);
    return () => {
      document.documentElement.classList.remove("cursor-hidden");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mousedown", press);
      window.removeEventListener("mouseup", lift);
    };
  }, [mx, my]);

  if (!enabled) return null;

  const size = label ? 76 : down ? 26 : 40;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 z-[120] pointer-events-none rounded-full bg-zor"
        style={{ width: 6, height: 6, x: mx, y: my, translateX: "-50%", translateY: "-50%" }}
      />
      <motion.div
        className="fixed top-0 left-0 z-[119] pointer-events-none rounded-full flex items-center justify-center border border-zor bg-zor/10 backdrop-blur-[2px]"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{ width: size, height: size }}
        transition={{ type: "spring", stiffness: 350, damping: 26 }}
      >
        {label && (
          <span className="font-display text-[12px] tracking-[0.16em] text-cream">
            {label}
          </span>
        )}
      </motion.div>
    </>
  );
}
