import { MessageCircle } from "lucide-react";
import { waLink, WA_MESSAGES } from "../data/menu";
import { useOrder } from "../context/OrderContext";
import { scrollToId } from "../lib/scroll";
import { Magnetic, Reveal } from "./ui";

export default function FinalCTA() {
  const { setDrawerOpen, count } = useOrder();

  return (
    <section className="relative bg-ink py-28 md:py-40 overflow-hidden text-center">
      {/* rotating outlined backdrop */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden>
        <span className="font-display text-[24vw] leading-none text-outline-faint select-none whitespace-nowrap -rotate-6">
          ZORKO · ZORKO
        </span>
      </div>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(50% 42% at 50% 55%, rgba(255,106,0,0.1), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-5xl px-5">
        <Reveal>
          <p className="font-body text-[11px] font-semibold tracking-[0.45em] text-zor">
            LAST CALL
          </p>
        </Reveal>
        <h2 className="font-display text-cream leading-[0.88] tracking-wide mt-5 text-[clamp(3.2rem,10vw,9rem)]">
          {["STILL THINKING", "ABOUT FOOD?"].map((line, i) => (
            <span key={line} className="block overflow-hidden">
              <Reveal y={70} delay={i * 0.1}>
                <span className={`block ${i === 1 ? "text-zor" : ""}`}>{line}</span>
              </Reveal>
            </span>
          ))}
        </h2>

        <Reveal delay={0.2}>
          <p className="font-hand text-cheese text-3xl md:text-4xl -rotate-2 mt-6">
            you know what to do.
          </p>
        </Reveal>

        <Reveal delay={0.28}>
          <div className="flex flex-wrap justify-center gap-4 mt-10">
            <button
              onClick={() => scrollToId("menu")}
              className="font-display text-lg tracking-[0.16em] border border-cream/25 text-cream px-7 py-4 hover:border-zor hover:text-zor transition-colors duration-300"
            >
              VIEW MENU
            </button>
            <Magnetic>
              <button
                onClick={() => (count > 0 ? setDrawerOpen(true) : scrollToId("menu"))}
                data-cursor="OPEN →"
                className="font-display text-lg tracking-[0.16em] bg-zor text-ink px-8 py-4 hover:bg-cheese transition-colors duration-300"
              >
                ORDER NOW {count > 0 ? `(${count})` : ""}
              </button>
            </Magnetic>
            <a
              href={waLink(WA_MESSAGES.order)}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2.5 font-display text-lg tracking-[0.16em] text-[#25D366] border border-[#25D366]/50 px-7 py-4 hover:bg-[#25D366] hover:text-ink transition-colors duration-300"
            >
              <MessageCircle size={18} /> WHATSAPP ZORKO
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.34}>
          <p className="font-serif italic text-mute text-lg mt-10">
            Come hungry. Leave obsessed. <span className="text-cream/70">— the house rule.</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
