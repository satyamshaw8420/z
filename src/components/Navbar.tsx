import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Home, UtensilsCrossed, MapPin, MessageCircle, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { SITE, waLink, WA_MESSAGES } from "../data/menu";
import { scrollToId } from "../lib/scroll";
import { useOrder } from "../context/OrderContext";

const LINKS = [
  { label: "MENU", id: "menu" },
  { label: "OUR STORY", id: "story" },
  { label: "SHARK TANK", id: "shark" },
  { label: "GALLERY", id: "gallery" },
  { label: "VISIT US", id: "visit" },
];

function Logo({ small }: { small?: boolean }) {
  return (
    <button
      onClick={() => scrollToId("top")}
      className="flex items-center group transition-transform duration-300 hover:scale-105"
      aria-label="Zorko Howrah — back to top"
    >
      <motion.img
        src="/logo.png"
        alt="Zorko Brand of Food Lovers"
        className={`object-contain drop-shadow-lg ${
          small ? "h-8 md:h-10" : "h-12 md:h-16"
        }`}
        animate={{ y: [0, -4, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        whileHover={{ scale: 1.1, rotate: [0, -6, 6, -3, 3, 0], transition: { duration: 0.6 } }}
      />
    </button>
  );
}

export default function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const { count, setDrawerOpen } = useOrder();
  const bump = useSpring(count, { stiffness: 500, damping: 20 });
  const [active, setActive] = useState("top");

  useEffect(() => scrollY.on("change", (v) => setScrolled(v > 50)), [scrollY]);

  /* track active section for the mobile bottom bar */
  useEffect(() => {
    const ids = ["top", "menu", "visit"];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const openOrder = () => {
    if (count > 0) setDrawerOpen(true);
    else scrollToId("menu");
  };

  return (
    <>
      <motion.header
        className={`fixed top-0 inset-x-0 z-[80] transition-all duration-500 ${
          scrolled
            ? "bg-ink/80 backdrop-blur-md border-b border-cream/10 shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
            : "bg-transparent border-b border-transparent"
        }`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className={`mx-auto max-w-7xl px-5 md:px-8 flex items-center justify-between transition-all duration-500 ${
            scrolled ? "py-2.5" : "py-4 md:py-6"
          }`}
        >
          <Logo small={scrolled} />

          {/* desktop links */}
          <nav className="hidden lg:flex items-center gap-8">
            {LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollToId(l.id)}
                className="group font-body text-[11px] font-semibold tracking-[0.28em] text-cream/70 hover:text-cream transition-colors"
              >
                {l.label}
                <span className="block h-px bg-zor scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left mt-1" />
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {/* cart */}
            <button
              onClick={openOrder}
              className="relative p-2.5 border border-cream/15 hover:border-zor hover:text-zor transition-colors text-cream/80"
              aria-label={`Order bag, ${count} items`}
              data-cursor="OPEN →"
            >
              <ShoppingBag size={18} />
              <AnimatePresence>
                {count > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-2 -right-2 min-w-[18px] h-[18px] px-1 bg-zor text-ink font-body text-[10px] font-bold flex items-center justify-center rounded-full"
                  >
                    {count}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <button
              onClick={openOrder}
              data-cursor="OPEN →"
              className="hidden sm:inline-block font-display text-sm md:text-base tracking-[0.18em] bg-zor text-ink px-5 py-2.5 hover:bg-cheese transition-colors duration-300"
            >
              ORDER NOW
            </button>
          </div>
        </div>
      </motion.header>

      {/* mobile bottom action bar */}
      <nav
        className="lg:hidden fixed bottom-0 inset-x-0 z-[80] bg-ink/90 backdrop-blur-md border-t border-cream/10 pb-[env(safe-area-inset-bottom)]"
        aria-label="Mobile navigation"
      >
        <div className="grid grid-cols-4">
          {[
            { id: "top", label: "HOME", icon: Home, href: null as string | null },
            { id: "menu", label: "MENU", icon: UtensilsCrossed, href: null },
            { id: "visit", label: "VISIT", icon: MapPin, href: null },
            { id: "wa", label: "WHATSAPP", icon: MessageCircle, href: waLink(WA_MESSAGES.chat) },
          ].map((item) =>
            item.href ? (
              <a
                key={item.id}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="flex flex-col items-center gap-1 py-2.5 text-[#25D366]"
              >
                <item.icon size={17} />
                <span className="font-body text-[9px] font-semibold tracking-[0.18em]">
                  {item.label}
                </span>
              </a>
            ) : (
              <button
                key={item.id}
                onClick={() => scrollToId(item.id)}
                className={`flex flex-col items-center gap-1 py-2.5 transition-colors ${
                  active === item.id ? "text-zor" : "text-cream/50"
                }`}
              >
                <item.icon size={17} />
                <span className="font-body text-[9px] font-semibold tracking-[0.18em]">
                  {item.label}
                </span>
              </button>
            )
          )}
        </div>
      </nav>
    </>
  );
}

export { SITE };
