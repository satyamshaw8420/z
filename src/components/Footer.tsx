import { Facebook, Instagram, MessageCircle, Phone } from "lucide-react";
import { SITE, waLink, WA_MESSAGES } from "../data/menu";
import { scrollToId } from "../lib/scroll";

const NAV = [
  { label: "MENU", id: "menu" },
  { label: "OUR STORY", id: "story" },
  { label: "SHARK TANK", id: "shark" },
  { label: "GALLERY", id: "gallery" },
  { label: "CONTACT", id: "visit" },
];

export default function Footer() {
  return (
    <footer className="relative bg-ink border-t border-cream/10 overflow-hidden">
      {/* giant wordmark */}
      <div className="mx-auto max-w-7xl px-5 md:px-8 pt-14 md:pt-20" aria-hidden>
        <p className="font-display leading-[0.82] text-[clamp(4rem,15vw,13rem)] text-outline select-none whitespace-nowrap">
          ZORKO
        </p>
        <p className="font-display leading-[0.82] text-[clamp(4rem,15vw,13rem)] text-outline-faint select-none whitespace-nowrap -mt-[0.06em]">
          HOWRAH
        </p>
      </div>

      <div className="mx-auto max-w-7xl px-5 md:px-8 py-14 grid gap-12 md:grid-cols-12">
        {/* brand */}
        <div className="md:col-span-4">
          <img src="/logo.png" alt="Zorko Brand of Food Lovers" className="h-16 md:h-20 object-contain mb-4" />
          <p className="font-body text-[10px] font-semibold tracking-[0.4em] text-mute mt-2">
            {SITE.nameBn}
          </p>
          <p className="font-display text-cheese text-xl tracking-[0.2em] mt-6">
            PURE VEG. FULL POWER.
          </p>
          <p className="font-serif italic text-mute text-base mt-3 max-w-xs leading-relaxed">
            Big flavours. Bold cravings. Zero compromise — a Howrah original
            that went all the way to the Tank.
          </p>
          <p className="font-hand text-zor text-2xl -rotate-2 mt-5">
            made for cravings.
          </p>
        </div>

        {/* nav */}
        <nav className="md:col-span-3" aria-label="Footer">
          <p className="font-body text-[10px] font-semibold tracking-[0.35em] text-mute">
            EXPLORE
          </p>
          <ul className="mt-5 space-y-3">
            {NAV.map((n) => (
              <li key={n.id}>
                <button
                  onClick={() => scrollToId(n.id)}
                  className="group font-display text-cream/85 text-xl tracking-[0.14em] hover:text-zor transition-colors"
                >
                  {n.label}
                  <span className="block h-px bg-zor scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* contact */}
        <div className="md:col-span-3">
          <p className="font-body text-[10px] font-semibold tracking-[0.35em] text-mute">
            FIND US
          </p>
          <address className="not-italic font-serif italic text-cream/75 text-base leading-relaxed mt-5">
            {SITE.address}
          </address>
          <a
            href={`tel:${SITE.phoneTel}`}
            className="flex items-center gap-2.5 font-display text-cheese text-2xl tracking-wide mt-4 hover:text-zor transition-colors"
          >
            <Phone size={17} /> {SITE.phoneDisplay}
          </a>
          <a
            href={waLink(WA_MESSAGES.bulk)}
            target="_blank"
            rel="noreferrer"
            className="inline-block font-body text-[11px] font-semibold tracking-[0.25em] text-mute hover:text-[#25D366] transition-colors mt-4"
          >
            BULK / PARTY ORDERS →
          </a>
        </div>

        {/* social */}
        <div className="md:col-span-2">
          <p className="font-body text-[10px] font-semibold tracking-[0.35em] text-mute">
            FOLLOW THE CHEESE
          </p>
          <div className="flex gap-3 mt-5">
            {[
              { icon: Instagram, href: SITE.instagram, label: "Instagram" },
              { icon: Facebook, href: SITE.facebook, label: "Facebook" },
              { icon: MessageCircle, href: waLink(WA_MESSAGES.chat), label: "WhatsApp" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                data-cursor="OPEN →"
                className="flex h-11 w-11 items-center justify-center border border-cream/20 text-cream/75 hover:border-zor hover:text-zor hover:-translate-y-1 transition-all duration-300"
              >
                <s.icon size={17} />
              </a>
            ))}
          </div>
          <p className="font-body text-[11px] text-mute/70 leading-relaxed mt-6">
            Tag <b className="text-cream/70">#ZorkoHowrah</b> — the best pull
            of the month eats free.
          </p>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="mx-auto max-w-7xl px-5 md:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-[11px] tracking-[0.18em] text-mute">
            © 2026 ZORKO HOWRAH · ALL CRAVINGS RESERVED
          </p>
          <p className="font-body text-[11px] text-mute/70">
            Prices & menu subject to change at the outlet. 100% vegetarian. Always.
          </p>
        </div>
      </div>
    </footer>
  );
}
