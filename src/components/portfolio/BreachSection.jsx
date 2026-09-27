import { useRef, useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import BinaryRain from "./BinaryRain";
import BreachOverlay from "./BreachOverlay";
import { useReducedMotion } from "./MotionContext";

const phaseFor = (p) => (p < 0.22 ? "warning" : p < 0.34 ? "blackout" : p < 0.74 ? "hacked" : "restored");

export default function BreachSection() {
  const ref = useRef(null);
  const { reduced } = useReducedMotion();
  const [phase, setPhase] = useState("warning");
  const [p, setP] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setP(v);
    setPhase(phaseFor(v));
  });

  const shake = reduced ? "" : phase === "warning" && p > 0.04 ? (p > 0.14 ? "shake-hard" : "shake-soft") : "";

  return (
    <section ref={ref} aria-label="System breach sequence" className="relative h-[420vh]">
      <div className={`sticky top-0 h-screen overflow-hidden bg-void ${shake}`}>
        {phase === "warning" && (
          <div className="absolute inset-0" style={{ background: `radial-gradient(circle, transparent 30%, rgba(255,62,0,${Math.min(0.5, p * 2.5)}) 100%)` }} />
        )}
        <div className={`absolute inset-0 transition-opacity duration-700 ${phase === "hacked" || phase === "restored" ? "opacity-100" : "opacity-0"}`}>
          <BinaryRain active={phase === "hacked" || phase === "restored"} speed={reduced ? 0.3 : 1} />
        </div>
        <div className={`absolute inset-0 bg-void transition-opacity duration-1000 ${phase === "restored" ? "opacity-90" : "opacity-0"}`} />
        <BreachOverlay phase={phase} />
      </div>
    </section>
  );
}