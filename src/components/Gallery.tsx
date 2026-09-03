import { motion } from "framer-motion";
import { GALLERY } from "../data/menu";
import { Reveal, SectionHead } from "./ui";

export default function Gallery() {
  return (
    <section id="gallery" className="relative bg-ink py-24 md:py-32 scroll-mt-16 overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12 md:mb-16">
          <SectionHead
            eyebrow="FROM THE PASS"
            title={
              <>
                CHEESE DOES
                <br />
                THE <span className="text-zor">TALKING.</span>
              </>
            }
            note="shot between orders, eaten immediately after"
          />
          <Reveal delay={0.2} className="hidden md:block">
            <p className="font-body text-xs text-mute max-w-[220px] leading-relaxed border-l-2 border-cheese pl-4">
              Hover a frame — every picture here has a plate-shaped happy
              ending.
            </p>
          </Reveal>
        </div>

        <div className="columns-2 lg:columns-3 gap-4 md:gap-6 [column-fill:balance]">
          {GALLERY.map((g, i) => (
            <motion.figure
              key={g.tag + i}
              className={`group relative mb-4 md:mb-6 break-inside-avoid overflow-hidden border border-cream/10 bg-coal ${
                g.tall ? "aspect-[3/4]" : "aspect-[4/3]"
              }`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.09, ease: [0.22, 1, 0.36, 1] }}
              data-cursor="EXPLORE"
            >
              <img
                src={g.src}
                alt={`${g.tag} at Zorko Howrah — ${g.caption.toLowerCase()}`}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-[1.07] group-hover:rotate-[0.7deg]"
              />

              {/* grain intensifies on hover */}
              <div className="absolute inset-0 bg-grain opacity-[0.06] group-hover:opacity-[0.16] transition-opacity duration-500 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* caption */}
              <figcaption className="absolute inset-x-0 bottom-0 p-4 md:p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <span className="font-body text-[9px] font-semibold tracking-[0.35em] text-zor block">
                  {g.tag}
                </span>
                <span className="font-display text-cream text-xl md:text-2xl tracking-wide">
                  {g.caption}
                </span>
              </figcaption>

              {/* corner ticks */}
              <span className="absolute top-2 left-2 w-4 h-4 border-t border-l border-cream/0 group-hover:border-cheese transition-colors duration-500" />
              <span className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-cream/0 group-hover:border-cheese transition-colors duration-500" />
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
