const HACK_LINES = [
  "root@unknown:~# cat /etc/shadow",
  "exfiltrating /home/toqa/projects ... 43%",
  "disabling firewall rules ... done",
  "injecting payload into kernel space",
  "YOU ARE BEING WATCHED",
];

export default function BreachOverlay({ phase }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center px-6 text-center pointer-events-none">
      {phase === "warning" && (
        <div>
          <p className="font-mono text-xs tracking-[0.4em] text-alert animate-pulse">⚠ ANOMALY DETECTED ⚠</p>
          <h2 data-text="SOMETHING IS INSIDE" className="glitch font-heading font-bold text-4xl sm:text-7xl tracking-[0.1em] text-steel mt-6">
            SOMETHING IS INSIDE
          </h2>
          <p className="font-mono text-sm text-steel/50 mt-6">integrity check failed · memory corruption at 0x7FFE</p>
        </div>
      )}
      {phase === "blackout" && (
        <p className="font-mono text-sm text-steel/40">
          signal lost<span className="animate-pulse">_</span>
        </p>
      )}
      {phase === "hacked" && (
        <div className="bg-void/80 border border-alert/40 px-6 sm:px-10 py-8 max-w-xl text-left">
          <h2 data-text="SYSTEM COMPROMISED" className="glitch font-heading font-bold text-3xl sm:text-5xl tracking-[0.1em] text-alert">
            SYSTEM COMPROMISED
          </h2>
          <ul className="mt-6 space-y-1.5 font-mono text-[13px] text-steel/70">
            {HACK_LINES.map((l, i) => (
              <li key={l} className={i === HACK_LINES.length - 1 ? "text-alert animate-pulse" : ""}>{l}</li>
            ))}
          </ul>
        </div>
      )}
      {phase === "restored" && (
        <div className="animate-in fade-in zoom-in-95 duration-1000">
          <p className="font-mono text-xs tracking-[0.4em] text-cyber">✓ THREAT CONTAINED</p>
          <h2 className="font-heading font-bold text-4xl sm:text-7xl tracking-[0.1em] text-steel mt-6">SYSTEM RESTORED</h2>
          <p className="text-lg text-steel/60 mt-6 max-w-lg mx-auto">
            Chaos is just unanalysed data. Here's how I bring order back.
          </p>
        </div>
      )}
    </div>
  );
}