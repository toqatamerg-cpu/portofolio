import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { MotionProvider } from "@/components/portfolio/MotionContext";
import BootScan from "@/components/portfolio/BootScan";
import HUD from "@/components/portfolio/HUD";
import Hero from "@/components/portfolio/Hero";
import GlobeSection from "@/components/portfolio/GlobeSection";
import BreachSection from "@/components/portfolio/BreachSection";
import Projects from "@/components/portfolio/Projects";
import ForensicLab from "@/components/portfolio/ForensicLab";
import Certifications from "@/components/portfolio/Certifications";
import Contact from "@/components/portfolio/Contact";

export default function Portfolio() {
  const [booted, setBooted] = useState(false);

  useEffect(() => {
    document.body.style.overflow = booted ? "" : "hidden";
  }, [booted]);

  return (
    <MotionProvider>
      <div className="bg-void text-steel min-h-screen overflow-x-clip">
        <AnimatePresence>{!booted && <BootScan key="boot" onDone={() => setBooted(true)} />}</AnimatePresence>
        <div className="noise-overlay" aria-hidden="true" />
        <div className="scanlines" aria-hidden="true" />
        {booted && (
          <>
            <HUD />
            <main>
              <Hero />
              <GlobeSection />
              <BreachSection />
              <Projects />
              <ForensicLab />
              <Certifications />
              <Contact />
            </main>
          </>
        )}
      </div>
    </MotionProvider>
  );
}