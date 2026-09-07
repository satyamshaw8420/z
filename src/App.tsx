import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import Lenis from "lenis";
import { OrderProvider } from "./context/OrderContext";
import { prefersReducedMotion, setLenis } from "./lib/scroll";

import Loader from "./components/Loader";
import Cursor from "./components/Cursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import BrandStatement from "./components/BrandStatement";
import Featured from "./components/Featured";
import MenuSection from "./components/MenuSection";
import ScrollStory from "./components/ScrollStory";
import SharkTank from "./components/SharkTank";
import Reviews from "./components/Reviews";
import Gallery from "./components/Gallery";
import Ambience from "./components/Ambience";
import Location from "./components/Location";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";
import { OrderBar, OrderDrawer, WhatsAppFab } from "./components/Order";
import { MARQUEE_COPY, MARQUEE_FOOD } from "./data/menu";

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    mass: 0.4,
  });
  return (
    <motion.div
      className="fixed top-0  left-0 right-0 h-[3px] bg-zor origin-left z-[90]"
      style={{ scaleX }}
      aria-hidden
    />
  );
}

function Shell() {
  const [loaded, setLoaded] = useState(false);

  /* smooth scroll (Lenis) — skipped for reduced-motion users */
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const lenis = new Lenis({ lerp: 0.1 });
    setLenis(lenis);
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  /* lock scroll while the loader is sketching */
  useEffect(() => {
    document.body.style.overflow = loaded ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [loaded]);

  return (
    <div className="relative bg-ink text-cream font-body">
      {!loaded && <Loader onDone={() => setLoaded(true)} />}

      <ScrollProgress />
      <Cursor />

      {/* film grain over everything (pointer-transparent) */}
      <div
        className="fixed inset-0 z-[64] pointer-events-none bg-grain opacity-[0.045]"
        aria-hidden
      />

      <Navbar />

      <main>
        <Hero start={loaded} />
        <Marquee items={MARQUEE_FOOD} tone="zor" duration={32} className="-rotate-1 scale-[1.02] -my-2 z-20 relative" />

        <BrandStatement />
        <Featured />
        <MenuSection />
        <ScrollStory />

        <Marquee items={MARQUEE_COPY} tone="cream" duration={38} className="rotate-1 scale-[1.02] -my-2 z-20 relative" />

        <SharkTank />
        <Reviews />
        <Gallery />
        <Ambience />
        <Location />
        <FinalCTA />
      </main>

      <Footer />

      {/* spacer so the footer clears the mobile bottom bar */}
      <div className="lg:hidden h-16" />

      <OrderBar />
      <WhatsAppFab />
      <OrderDrawer />
    </div>
  );
}

export default function App() {
  return (
    <OrderProvider>
      <Shell />
    </OrderProvider>
  );
}
