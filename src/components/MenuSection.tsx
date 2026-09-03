import { AnimatePresence, motion } from "framer-motion";
import { Flame, MessageCircle, Plus } from "lucide-react";
import { forwardRef, useState } from "react";
import {
  CATEGORIES,
  MAGGI_ADDONS,
  MENU_ITEMS,
  waLink,
  WA_MESSAGES,
  type MenuItem,
} from "../data/menu";
import { useOrder } from "../context/OrderContext";
import { Reveal, SectionHead, Stamp, badgeTone } from "./ui";

const MenuCard = forwardRef<HTMLElement, { item: MenuItem; index: number }>(
  ({ item, index }, ref) => {
    const { add } = useOrder();
    const [added, setAdded] = useState(false);

    const handleAdd = () => {
      add({ id: item.id, name: item.name, price: item.price });
      setAdded(true);
      setTimeout(() => setAdded(false), 1000);
    };

    return (
      <motion.article
        ref={ref}
        layout
      initial={{ opacity: 0, y: 34, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
      transition={{ duration: 0.55, delay: (index % 6) * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col bg-coal border border-cream/10 hover:border-zor/60 transition-colors duration-500 overflow-hidden"
    >
      {/* image / typographic tile */}
      <div className="relative aspect-[4/3] overflow-hidden bg-coal2" data-cursor="VIEW">
        {item.image ? (
          <>
            <img
              src={item.image}
              alt={item.name}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08] group-hover:rotate-[0.8deg]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-coal via-transparent to-transparent opacity-70" />
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-display text-[110px] leading-none text-outline select-none transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-3">
              {item.name.charAt(0)}
            </span>
            <span className="absolute bottom-3 left-4 font-body text-[9px] font-semibold tracking-[0.35em] text-cream/25">
              ZORKO · {item.category}
            </span>
          </div>
        )}

        {item.badge && (
          <div className="absolute top-3 left-3">
            <Stamp label={item.badge} tone={badgeTone(item.badge)} />
          </div>
        )}

        <span className="absolute top-3 right-3 flex h-6 w-6 items-center justify-center rounded-full bg-cream text-ink">
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor" aria-hidden>
            <path d="M12 2 9.2 8.6 2 9.3l5.4 4.7L5.8 21 12 17.3 18.2 21l-1.6-7 5.4-4.7-7.2-.7z" />
          </svg>
          <span className="sr-only">Pure vegetarian</span>
        </span>
      </div>

      {/* body */}
      <div className="relative flex flex-1 flex-col p-5 md:p-6">
        <h3 className="font-display text-cream text-2xl md:text-[1.7rem] leading-none tracking-wide group-hover:text-zor transition-colors duration-300">
          {item.name.toUpperCase()}
        </h3>

        {item.creativeLine && (
          <p className="font-hand text-cheese text-xl mt-1.5 -rotate-1">{item.creativeLine}</p>
        )}

        <p className="font-serif italic text-mute text-sm leading-relaxed mt-3 line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
          {item.description}
        </p>

        {item.addons && (
          <p className="font-body text-[11px] text-cream/45 mt-2 tracking-wide">
            {item.addons.join(" · ")}
          </p>
        )}

        <div className="mt-auto flex items-end justify-between gap-3 pt-5">
          <div>
            <span className="font-display text-3xl md:text-4xl text-cheese">₹{item.price}</span>
            {item.bakedPrice && (
              <span className="ml-2 align-middle font-body text-[10px] font-semibold tracking-[0.16em] text-mute border border-cream/20 px-2 py-1">
                BAKED ₹{item.bakedPrice}
              </span>
            )}
          </div>

          <button
            onClick={handleAdd}
            data-cursor="OPEN →"
            aria-label={`Add ${item.name} to order`}
            className={`flex items-center gap-2 font-display tracking-[0.14em] text-sm px-4 py-2.5 border transition-all duration-300 ${
              added
                ? "bg-cheese border-cheese text-ink"
                : "border-cream/25 text-cream group-hover:border-zor group-hover:text-zor hover:!bg-zor hover:!text-ink"
            }`}
          >
            {added ? "ADDED ✓" : <Plus size={15} strokeWidth={3} />}
            {added ? "" : "ADD"}
          </button>
        </div>
      </div>
    </motion.article>
  );
});

const InStoreState = forwardRef<HTMLDivElement, unknown>((props, ref) => {
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="col-span-full border border-dashed border-cream/20 bg-coal/60 px-8 py-16 md:py-20 text-center relative overflow-hidden"
    >
      <span className="absolute -top-10 left-1/2 -translate-x-1/2 font-display text-[180px] leading-none text-outline-faint select-none pointer-events-none">
        MORE
      </span>
      <p className="font-hand text-zor text-2xl md:text-3xl -rotate-2">pizza, burgers, nachos, desserts, drinks…</p>
      <h3 className="relative font-display text-cream text-4xl md:text-6xl tracking-wide mt-4 leading-[0.95]">
        THE FULL LIST LIVES
        <br />
        <span className="text-zor">AT THE OUTLET.</span>
      </h3>
      <p className="font-serif italic text-mute text-lg md:text-xl max-w-xl mx-auto mt-6">
        Some categories rotate with the season and the mood of the kitchen.
        Ping us — we'll send today's complete menu in minutes.
      </p>
      <div className="flex flex-wrap justify-center gap-4 mt-9">
        <a
          href={waLink(WA_MESSAGES.menu)}
          target="_blank"
          rel="noreferrer"
          data-cursor="OPEN →"
          className="flex items-center gap-3 font-display tracking-[0.16em] text-lg bg-[#25D366] text-ink px-7 py-3.5 hover:brightness-110 transition-all"
        >
          <MessageCircle size={19} />
          ASK ON WHATSAPP
        </a>
        <a
          href={waLink(WA_MESSAGES.bulk)}
          target="_blank"
          rel="noreferrer"
          className="font-display tracking-[0.16em] text-lg border border-cream/25 text-cream px-7 py-3.5 hover:border-cheese hover:text-cheese transition-colors"
        >
          BULK ORDER?
        </a>
      </div>
    </motion.div>
  );
});

export default function MenuSection() {
  const [active, setActive] = useState("ALL");
  const filtered =
    active === "ALL" || active === "MORE"
      ? MENU_ITEMS
      : MENU_ITEMS.filter((m) => m.category === active);

  return (
    <section id="menu" className="relative bg-ink py-24 md:py-32 scroll-mt-16 overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead
            eyebrow="FULL MENU"
            title={
              <>
                THE CRAVING <span className="text-zor">LIST</span>
              </>
            }
            sub="Choosing just one was never the plan."
          />
          <Reveal delay={0.15}>
            <p className="font-hand text-cheese text-2xl rotate-1 pb-2">
              tap “ADD” — build your order, checkout on WhatsApp
            </p>
          </Reveal>
        </div>

        {/* category chips */}
        <div className="mt-10 md:mt-14 -mx-5 px-5 md:mx-0 md:px-0 overflow-x-auto no-scrollbar">
          <div className="flex gap-2.5 w-max md:flex-wrap md:w-auto">
            {CATEGORIES.map((c) => {
              const isActive = active === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setActive(c.id)}
                  className={`font-display text-sm md:text-base tracking-[0.16em] px-5 py-2.5 border transition-all duration-300 whitespace-nowrap ${
                    isActive
                      ? "bg-zor border-zor text-ink"
                      : "border-cream/20 text-cream/65 hover:border-zor hover:text-zor"
                  }`}
                  aria-pressed={isActive}
                >
                  {c.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* grid */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7 mt-10 md:mt-14">
          <AnimatePresence mode="popLayout">
            {active === "MORE" ? (
              <InStoreState key="more" />
            ) : (
              filtered.map((item, i) => (
                <MenuCard key={item.id} item={item} index={i} />
              ))
            )}
          </AnimatePresence>
        </motion.div>

        {/* add-ons + note */}
        <Reveal delay={0.1}>
          <div className="mt-12 md:mt-16 grid md:grid-cols-2 gap-5">
            <div className="ticket-edge bg-coal border border-cream/10 px-10 py-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="font-display text-cream text-2xl tracking-wide flex items-center gap-2">
                  <Flame size={18} className="text-zor" /> MAGGI ADD-ONS
                </p>
                <p className="font-serif italic text-mute text-sm mt-1">
                  Because plain was never the point.
                </p>
              </div>
              <div className="flex flex-col gap-1.5">
                {MAGGI_ADDONS.map((a) => (
                  <span key={a.label} className="font-body text-sm text-cream/80">
                    {a.label} <b className="text-cheese">₹{a.price}</b>
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-coal border border-cream/10 px-8 py-6">
              <p className="font-body text-sm text-mute leading-relaxed">
                <b className="text-cream/85">Good to know:</b> everything on
                this list is 100% vegetarian. Prices are as listed at the
                outlet — menu and availability can change, so confirm on
                WhatsApp before you sprint over.
              </p>
              <a
                href={waLink(WA_MESSAGES.menu)}
                target="_blank"
                rel="noreferrer"
                className="inline-block mt-3 font-body text-[11px] font-semibold tracking-[0.25em] text-zor hover:text-cheese transition-colors"
              >
                GET TODAY'S MENU →
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
