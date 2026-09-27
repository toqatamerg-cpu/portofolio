import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const LOGS = [
  "> init forensic_kernel v6.6.6",
  "> mounting /dev/identity ...",
  "> scanning memory sectors 0x0000 → 0xFFFF",
  "!! anomalous signature: TROJAN.GHOST.X",
  "!! payload attempting privilege escalation",
  "> isolating process [pid 4096] ... quarantined",
  "> verifying integrity of toqa.core",
  "> threat neutralized. access granted.",
];

export default function BootScan({ onDone }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setProgress((p) => Math.min(100, p + Math.random() * 3.5 + 0.8)), 60);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (progress < 100) return;
    const t = setTimeout(onDone, 800);
    return () => clearTimeout(t);
  }, [progress, onDone]);

  const shown = LOGS.slice(0, Math.max(1, Math.ceil((progress / 100) * LOGS.length)));
  const threat = progress > 38 && progress < 72;
  const accent = threat ? "text-alert" : "text-cyber";

  return (
    <motion.div
      exit={{ opacity: 0, filter: "blur(8px)" }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-[100] bg-void flex items-center justify-center px-6 overflow-hidden"
    >
      <div className={`scan-line absolute inset-x-0 h-px ${threat ? "bg-alert shadow-[0_0_20px_4px_#FF3E00]" : "bg-cyber shadow-[0_0_20px_4px_#00F0FF]"}`} />
      {threat && <div className="absolute inset-0 bg-alert/5 animate-pulse" />}
      <div className="relative w-full max-w-xl font-mono">
        <p className={`text-xs tracking-[0.3em] ${accent}`}>
          {threat ? "▲ THREAT DETECTED" : progress >= 100 ? "✓ SYSTEM CLEAN" : "◌ SYSTEM INTEGRITY SCAN"}
        </p>
        <div className="mt-6 flex items-end justify-between">
          <h1 className="font-heading font-bold text-3xl sm:text-4xl tracking-[0.15em] text-steel">VIRUS SCAN</h1>
          <span className={`text-4xl sm:text-5xl font-bold tabular-nums ${accent}`}>{Math.floor(progress)}%</span>
        </div>
        <div className="mt-5 h-[3px] w-full bg-steel/10 overflow-hidden">
          <div className={`h-full transition-all duration-100 ${threat ? "bg-alert" : "bg-cyber"}`} style={{ width: `${progress}%` }} />
        </div>
        <ul className="mt-8 space-y-2 text-[13px] min-h-[200px]">
          {shown.map((l) => (
            <li key={l} className={l.startsWith("!!") ? "text-alert" : "text-steel/60"}>{l}</li>
          ))}
        </ul>
        <button onClick={onDone} className="mt-6 text-[11px] tracking-[0.3em] text-steel/40 hover:text-cyber transition-colors">
          [ SKIP SCAN ]
        </button>
      </div>
    </motion.div>
  );
}