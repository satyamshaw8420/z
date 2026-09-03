import { MapPin, MessageCircle, Phone, ArrowUpRight } from "lucide-react";
import { SITE, waLink, WA_MESSAGES } from "../data/menu";
import { Magnetic, Reveal, SectionHead } from "./ui";

export default function Location() {
  return (
    <section id="visit" className="relative bg-coal py-24 md:py-32 scroll-mt-16 overflow-hidden">
      <div className="absolute inset-0 bg-grain opacity-[0.04] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <SectionHead
          eyebrow="VISIT US"
          title={
            <>
              FIND YOUR
              <br />
              <span className="text-zor">CRAVINGS.</span>
            </>
          }
          note="hungry people have been known to run"
        />

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 mt-12 md:mt-16 items-stretch">
          {/* info card */}
          <Reveal className="lg:col-span-5">
            <div className="h-full bg-ink border border-cream/10 p-8 md:p-10 flex flex-col">
              <span className="flex h-12 w-12 items-center justify-center bg-zor text-ink rotate-3">
                <MapPin size={22} />
              </span>
              <h3 className="font-display text-cream text-4xl md:text-5xl tracking-wide mt-6 leading-none">
                ZORKO <span className="text-zor">HOWRAH</span>
              </h3>
              <p className="font-body text-[10px] font-semibold tracking-[0.4em] text-mute mt-2">
                {SITE.nameBn} · PILKHANA
              </p>

              <address className="not-italic font-serif italic text-cream/80 text-lg md:text-xl leading-relaxed mt-7">
                {SITE.address}
              </address>

              <a
                href={`tel:${SITE.phoneTel}`}
                className="font-display text-3xl md:text-4xl text-cheese tracking-wide mt-6 hover:text-zor transition-colors inline-flex items-center gap-3"
              >
                <Phone size={22} />
                {SITE.phoneDisplay}
              </a>

              <p className="font-body text-xs text-mute mt-4 leading-relaxed">
                Live opening hours sit on our Google listing — the kitchen
                tends to follow the cravings.
              </p>

              <div className="flex flex-col gap-3 mt-8">
                <Magnetic>
                  <a
                    href={SITE.mapsDirections}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="OPEN →"
                    className="flex items-center justify-center gap-3 font-display tracking-[0.16em] text-lg bg-zor text-ink px-6 py-4 hover:bg-cheese transition-colors duration-300"
                  >
                    GET DIRECTIONS <ArrowUpRight size={18} />
                  </a>
                </Magnetic>
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={`tel:${SITE.phoneTel}`}
                    className="flex items-center justify-center gap-2 font-display tracking-[0.14em] text-base border border-cream/25 text-cream px-4 py-3.5 hover:border-cheese hover:text-cheese transition-colors"
                  >
                    <Phone size={15} /> CALL NOW
                  </a>
                  <a
                    href={waLink(WA_MESSAGES.chat)}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 font-display tracking-[0.14em] text-base bg-[#25D366] text-ink px-4 py-3.5 hover:brightness-110 transition-all"
                  >
                    <MessageCircle size={15} /> WHATSAPP
                  </a>
                </div>
              </div>
            </div>
          </Reveal>

          {/* map */}
          <Reveal delay={0.12} className="lg:col-span-7">
            <div className="group relative h-full min-h-[420px] lg:min-h-[520px] border border-cream/10 bg-ink overflow-hidden">
              {/* corner ticks */}
              {["top-3 left-3 border-t border-l", "top-3 right-3 border-t border-r", "bottom-3 left-3 border-b border-l", "bottom-3 right-3 border-b border-r"].map(
                (pos) => (
                  <span
                    key={pos}
                    className={`absolute z-20 w-5 h-5 border-zor pointer-events-none ${pos}`}
                  />
                )
              )}

              <div className="absolute inset-0">
                <iframe
                  title="Map to Zorko Howrah, Pilkhana"
                  src={SITE.mapsEmbed}
                  className="w-full h-full border-0"
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>

              {/* floating marker */}
              <a
                href={SITE.mapsDirections}
                target="_blank"
                rel="noreferrer"
                data-cursor="OPEN →"
                className="absolute left-1/2 top-[44%] -translate-x-1/2 -translate-y-full z-10 flex flex-col items-center"
                aria-label="Open directions to Zorko Howrah"
              >
                <span className="font-display tracking-[0.2em] text-xs bg-zor text-ink px-3 py-1.5 translate-y-1 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 whitespace-nowrap">
                  ZORKO HOWRAH →
                </span>
                <span className="relative mt-1 animate-floaty" style={{ "--tilt": "0deg" } as React.CSSProperties}>
                  <MapPin size={40} className="text-zor fill-zor/30 drop-shadow-[0_6px_12px_rgba(255,106,0,0.5)]" strokeWidth={1.6} />
                  <span className="absolute left-1/2 -bottom-2 -translate-x-1/2 w-3 h-1 bg-black/50 rounded-full blur-[2px]" />
                </span>
              </a>

              {/* caption bar */}
              <div className="absolute inset-x-0 bottom-0 z-10 bg-ink/90 backdrop-blur-sm border-t border-cream/10 px-5 py-4 flex items-center justify-between gap-4">
                <div>
                  <p className="font-display text-cream text-xl tracking-[0.1em] leading-none">
                    ZORKO HOWRAH
                  </p>
                  <p className="font-body text-[10px] tracking-[0.25em] text-mute mt-1.5">
                    BABUDANGA · PILKHANA · HOWRAH 711101
                  </p>
                </div>
                <a
                  href={SITE.mapsDirections}
                  target="_blank"
                  rel="noreferrer"
                  className="hidden sm:flex font-display tracking-[0.14em] text-sm bg-cream text-ink px-5 py-2.5 hover:bg-zor transition-colors shrink-0"
                >
                  GET DIRECTIONS
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
