import { useEffect, useState } from "react";
import { useReducedMotion } from "./MotionContext";

const LINKS = [
  ["ID", "#identity"],
  ["MAP", "#map"],
  ["FILES", "#projects"],
  ["LAB", "#lab"],
  ["CERTS", "#certs"],
  ["CONTACT", "#contact"],
];

export default function HUD() {
  const { reduced, toggle } = useReducedMotion();
  const [now, setNow] = useState(new Date());
  const [cpu, setCpu] = useState(42);

  useEffect(() => {
    const i = setInterval(() => {
      setNow(new Date());
      setCpu(28 + Math.round(Math.random() * 55));
    }, 1000);
    return () => clearInterval(i);
  }, []);

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-5 md:px-10 py-4 font-mono text-[11px] tracking-[0.2em] text-steel/60 bg-gradient-to-b from-void via-void/70 to-transparent">
        <a href="#identity" className="font-heading font-bold text-steel text-sm">
          TT<span className="text-alert">//</span>SENTINEL
        </a>
        <nav className="hidden md:flex gap-7">
          {LINKS.map(([l, h]) => (
            <a key={h} href={h} className="hover:text-cyber transition-colors">{l}</a>
          ))}
        </nav>
        <button
          onClick={toggle}
          aria-pressed={reduced}
          className="border border-steel/20 px-3 py-1.5 hover:border-cyber hover:text-cyber transition-colors"
        >
          MOTION: {reduced ? "REDUCED" : "FULL"}
        </button>
      </header>
      <div className="fixed bottom-4 left-5 md:left-10 z-50 font-mono text-[10px] tracking-[0.2em] text-steel/35 hidden sm:block pointer-events-none">
        LAT 30.0266°N · LON 31.2107°E · CAIRO UNIV.
      </div>
      <div className="fixed bottom-4 right-5 md:right-10 z-50 font-mono text-[10px] tracking-[0.2em] text-steel/35 hidden sm:flex gap-5 pointer-events-none">
        <span>CPU {cpu}%</span>
        <span>{now.toISOString().slice(11, 19)} UTC</span>
        <span className="text-alert animate-pulse">● REC</span>
      </div>
    </>
  );
}