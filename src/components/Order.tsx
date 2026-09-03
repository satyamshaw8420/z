import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Minus, Phone, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useState } from "react";
import { SITE, waLink } from "../data/menu";
import { buildWhatsAppOrder, useOrder } from "../context/OrderContext";
import { scrollToId } from "../lib/scroll";

/* ---------- floating review-order bar ---------- */
export function OrderBar() {
  const { count, total, drawerOpen, setDrawerOpen } = useOrder();

  return (
    <AnimatePresence>
      {count > 0 && !drawerOpen && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
          className="fixed z-[74] left-1/2 -translate-x-1/2 bottom-20 lg:bottom-6 w-[calc(100%-2rem)] max-w-lg"
        >
          <div className="flex items-center justify-between gap-4 bg-zor text-ink px-5 py-3.5 shadow-[0_18px_50px_rgba(255,106,0,0.35)]">
            <span className="flex items-center gap-3 min-w-0">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-ink text-zor">
                <ShoppingBag size={17} />
              </span>
              <span className="font-display text-lg md:text-xl tracking-[0.1em] whitespace-nowrap">
                {count} ITEM{count > 1 ? "S" : ""} · ₹{total}
              </span>
            </span>
            <button
              onClick={() => setDrawerOpen(true)}
              data-cursor="OPEN →"
              className="font-display tracking-[0.14em] text-base md:text-lg bg-ink text-cream px-4 md:px-6 py-2.5 hover:bg-coal transition-colors whitespace-nowrap"
            >
              REVIEW ORDER →
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ---------- order drawer ---------- */
export function OrderDrawer() {
  const { lines, count, total, drawerOpen, setDrawerOpen, setQty, remove, clear } =
    useOrder();
  const [note, setNote] = useState("");

  const sendWhatsApp = () => {
    window.open(waLink(buildWhatsAppOrder(lines, total, note)), "_blank");
  };

  return (
    <AnimatePresence>
      {drawerOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[85] bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setDrawerOpen(false)}
          />
          <motion.aside
            className="fixed right-0 top-0 bottom-0 z-[86] w-full max-w-md bg-coal border-l border-cream/10 flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 32 }}
            role="dialog"
            aria-label="Your order"
          >
            <header className="flex items-center justify-between px-6 py-5 border-b border-cream/10">
              <div>
                <p className="font-display text-2xl text-cream tracking-[0.12em]">
                  YOUR ORDER
                </p>
                <p className="font-hand text-zor text-xl -rotate-1">
                  {count > 0 ? "solid choices." : "the calm before the feast."}
                </p>
              </div>
              <button
                onClick={() => setDrawerOpen(false)}
                aria-label="Close order panel"
                className="p-2.5 border border-cream/15 text-cream/70 hover:border-zor hover:text-zor transition-colors"
              >
                <X size={18} />
              </button>
            </header>

            {lines.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
                <span className="font-display text-[120px] leading-none text-outline select-none">
                  ZK
                </span>
                <p className="font-serif italic text-mute text-xl mt-4">
                  Nothing here yet. That's fixable.
                </p>
                <button
                  onClick={() => {
                    setDrawerOpen(false);
                    scrollToId("menu");
                  }}
                  className="mt-8 font-display tracking-[0.16em] text-lg bg-zor text-ink px-8 py-3.5 hover:bg-cheese transition-colors"
                >
                  BROWSE THE CRAVING LIST →
                </button>
              </div>
            ) : (
              <>
                <ul className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
                  {lines.map((l) => (
                    <li
                      key={l.id}
                      className="flex items-center gap-4 bg-ink border border-cream/10 p-4"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-display text-cream text-lg leading-tight tracking-wide truncate">
                          {l.name.toUpperCase()}
                        </p>
                        <p className="font-body text-xs text-mute mt-1">
                          ₹{l.price} each
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setQty(l.id, l.qty - 1)}
                          aria-label={`Reduce ${l.name}`}
                          className="p-1.5 border border-cream/20 text-cream/70 hover:border-tomato hover:text-tomato transition-colors"
                        >
                          <Minus size={13} />
                        </button>
                        <span className="font-display text-cheese text-xl w-7 text-center">
                          {l.qty}
                        </span>
                        <button
                          onClick={() => setQty(l.id, l.qty + 1)}
                          aria-label={`Add one more ${l.name}`}
                          className="p-1.5 border border-cream/20 text-cream/70 hover:border-zor hover:text-zor transition-colors"
                        >
                          <Plus size={13} />
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="font-display text-cream text-lg">₹{l.price * l.qty}</p>
                        <button
                          onClick={() => remove(l.id)}
                          aria-label={`Remove ${l.name}`}
                          className="text-mute hover:text-tomato transition-colors mt-1"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="border-t border-cream/10 px-6 py-5 space-y-4">
                  <label className="block">
                    <span className="font-body text-[10px] font-semibold tracking-[0.3em] text-mute">
                      NOTE FOR THE KITCHEN (OPTIONAL)
                    </span>
                    <textarea
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      rows={2}
                      placeholder="Extra spicy? Less onion? Pickup time?"
                      className="mt-2 w-full bg-ink border border-cream/15 focus:border-zor outline-none px-4 py-3 font-body text-sm text-cream placeholder:text-mute/60 resize-none transition-colors"
                    />
                  </label>

                  <div className="flex items-center justify-between">
                    <span className="font-body text-xs font-semibold tracking-[0.3em] text-mute">
                      SUBTOTAL
                    </span>
                    <span className="font-display text-4xl text-cheese">₹{total}</span>
                  </div>

                  <button
                    onClick={sendWhatsApp}
                    data-cursor="OPEN →"
                    className="w-full flex items-center justify-center gap-3 font-display tracking-[0.14em] text-xl bg-[#25D366] text-ink px-6 py-4 hover:brightness-110 transition-all"
                  >
                    <MessageCircle size={20} /> ORDER ON WHATSAPP
                  </button>
                  <div className="grid grid-cols-2 gap-3">
                    <a
                      href={`tel:${SITE.phoneTel}`}
                      className="flex items-center justify-center gap-2 font-display tracking-[0.12em] text-sm border border-cream/25 text-cream px-4 py-3 hover:border-cheese hover:text-cheese transition-colors"
                    >
                      <Phone size={14} /> CALL TO ORDER
                    </a>
                    <button
                      onClick={clear}
                      className="font-display tracking-[0.12em] text-sm border border-cream/25 text-mute px-4 py-3 hover:border-tomato hover:text-tomato transition-colors"
                    >
                      CLEAR BAG
                    </button>
                  </div>
                  <p className="font-body text-[11px] text-mute/80 leading-relaxed">
                    Your order opens in WhatsApp with everything pre-filled —
                    we confirm availability, pickup or delivery, and payment
                    right there. Add-ons like extra cheese can be added to the
                    note.
                  </p>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

/* ---------- WhatsApp floating button ---------- */
export function WhatsAppFab() {
  const { count, drawerOpen } = useOrder();
  /* on mobile the order bar occupies the space above the nav — hide fab while it's up */
  const hidden = drawerOpen || count > 0;

  return (
    <AnimatePresence>
      {!hidden && (
        <motion.a
          href={waLink(
            "Hi Zorko Howrah! I'd like to know more about today's menu and ordering options."
          )}
          target="_blank"
          rel="noreferrer"
          aria-label="Chat with Zorko on WhatsApp"
          data-cursor="OPEN →"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          className="group fixed z-[73] right-5 bottom-20 lg:bottom-7 lg:right-7 flex items-center gap-0 bg-[#25D366] text-ink rounded-full shadow-[0_14px_40px_rgba(37,211,102,0.35)] overflow-hidden"
        >
          <span className="relative flex h-14 w-14 items-center justify-center shrink-0">
            <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping-ring" />
            <MessageCircle size={24} className="relative" />
          </span>
          <span className="max-w-0 overflow-hidden group-hover:max-w-[180px] group-hover:pr-5 transition-all duration-500 ease-out">
            <span className="font-display tracking-[0.12em] text-base whitespace-nowrap">
              CHAT WITH ZORKO
            </span>
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
