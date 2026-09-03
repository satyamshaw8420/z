import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { FEATURED_IDS, MENU_ITEMS, waLink, WA_MESSAGES } from "../data/menu";
import { useOrder } from "../context/OrderContext";
import { Reveal, SectionHead, Stamp, badgeTone } from "./ui";

const TINTS = ["#171310", "#151515", "#181210", "#151515", "#17130f"];

function FeaturedCard({
  id,
  index,
  total,
}: {
  id: string;
  index: number;
  total: number;
}) {
  const item = MENU_ITEMS.find((m) => m.id === id)!;
  const { add } = useOrder();
  const [added, setAdded] = useState(false);
  const reduced = useReducedMotion();
  const flip = index % 2 === 1;

  const handleAdd = () => {
    add({ id: item.id, name: item.name, price: item.price });
    setAdded(true);
    setTimeout(() => setAdded(false), 1100);
  };

  return (
    <div
      className="sticky"
      style={{ top: `calc(88px + ${index * 26}px)`, zIndex: index + 1 }}
    >
      <motion.article
        className="group grid md:grid-cols-2 border border-cream/10 overflow-hidden shadow-[0_-18px_50px_rgba(0,0,0,0.55)]"
        style={{ backgroundColor: TINTS[index % TINTS.length] }}
        initial={reduced ? false : { opacity: 0, y: 46 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* copy side */}
        <div
          className={`relative p-7 md:p-12 flex flex-col justify-center ${
            flip ? "md:order-2" : ""
          }`}
        >
          <span className="absolute top-4 right-6 md:top-6 md:right-8 font-display text-[80px] md:text-[120px] leading-none text-outline select-none">
            {String(index + 1).padStart(2, "0")}
          </span>

          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-body text-[10px] font-semibold tracking-[0.35em] text-zor">
              SIGNATURE {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
            {item.badge && <Stamp label={item.badge} tone={badgeTone(item.badge)} />}
          </div>

          <h3 className="font-display text-cream leading-[0.92] tracking-wide mt-4 text-[clamp(2.2rem,4.5vw,4.2rem)]">
            {item.name.split(" ").slice(0, 2).join(" ")}
            <br />
            <span className="text-zor">{item.name.split(" ").slice(2).join(" ")}</span>
          </h3>

          {item.creativeLine && (
            <p className="font-hand text-cheese text-2xl md:text-3xl -rotate-1 mt-3">
              {item.creativeLine}
            </p>
          )}

          <p className="font-serif italic text-mute text-base md:text-lg mt-4 max-w-md leading-relaxed">
            {item.description}
          </p>

          <div className="flex flex-wrap items-center gap-5 mt-8">
            <span className="font-display text-4xl md:text-5xl text-cheese">
              ₹{item.price}
            </span>
            <button
              onClick={handleAdd}
              data-cursor="OPEN →"
              className={`font-display tracking-[0.18em] text-base md:text-lg px-6 py-3 border transition-all duration-300 ${
                added
                  ? "bg-cheese border-cheese text-ink"
                  : "border-zor text-zor hover:bg-zor hover:text-ink"
              }`}
            >
              {added ? "ADDED ✓" : "ADD TO ORDER +"}
            </button>
            <a
              href={waLink(WA_MESSAGES.order)}
              target="_blank"
              rel="noreferrer"
              className="font-body text-[11px] font-semibold tracking-[0.25em] text-mute hover:text-cream underline underline-offset-4 decoration-cream/30 transition-colors"
            >
              ORDER ON WHATSAPP
            </a>
          </div>
        </div>

        {/* image side */}
        <div
          className={`relative overflow-hidden min-h-[300px] md:min-h-[440px] ${
            flip ? "md:order-1" : ""
          }`}
          data-cursor="VIEW"
        >
          <motion.img
            src={item.image}
            alt={item.name}
            loading={index === 0 ? "eager" : "lazy"}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06] group-hover:rotate-[0.6deg]"
            whileInView={reduced ? undefined : { scale: [1.12, 1] }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `linear-gradient(${flip ? "270deg" : "90deg"}, ${
                TINTS[index % TINTS.length]
              } 0%, transparent 30%)`,
            }}
          />
          <div className="absolute inset-0 bg-grain opacity-[0.07] pointer-events-none" />
        </div>
      </motion.article>
    </div>
  );
}

export default function Featured() {
  return (
    <section className="relative bg-ink py-24 md:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-14 md:mb-20">
          <SectionHead
            eyebrow="SIGNATURES"
            title={
              <>
                THE ONES PEOPLE
                <br />
                <span className="text-zor">TALK ABOUT</span>
              </>
            }
            note="the usual suspects, in the best way"
          />
          <Reveal delay={0.2} className="hidden md:block">
            <p className="font-body text-xs text-mute max-w-[220px] leading-relaxed border-l-2 border-zor pl-4">
              Scroll — the dishes stack up like your table does on a Friday
              night.
            </p>
          </Reveal>
        </div>

        <div className="flex flex-col gap-8 md:gap-12 pb-8">
          {FEATURED_IDS.map((id, i) => (
            <FeaturedCard key={id} id={id} index={i} total={FEATURED_IDS.length} />
          ))}
        </div>
      </div>
    </section>
  );
}
