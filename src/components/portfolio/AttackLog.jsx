const STATUS = ["MITIGATED", "BLOCKED", "ANALYZING", "CONTAINED"];

export default function AttackLog({ attacks, total }) {
  return (
    <div className="font-mono text-xs border border-steel/10 bg-void/70 backdrop-blur-sm">
      <div className="flex justify-between px-4 py-3 border-b border-steel/10 text-[10px] tracking-[0.25em]">
        <span className="text-alert animate-pulse">● LIVE INTERCEPT</span>
        <span className="text-steel/50">EVENTS: {total.toString().padStart(5, "0")}</span>
      </div>
      <ul className="divide-y divide-steel/5">
        {attacks.map((a) => (
          <li key={a.id} className="px-4 py-2.5 grid grid-cols-[1fr_auto] gap-2 animate-in fade-in slide-in-from-top-1 duration-500">
            <div className="min-w-0">
              <p className="text-steel truncate">{a.type}</p>
              <p className="text-steel/40 text-[11px] truncate">
                {a.from} <span className="text-alert">→</span> {a.to}
              </p>
            </div>
            <span className={`self-center text-[10px] tracking-widest ${a.id % 4 === 2 ? "text-alert" : "text-cyber"}`}>
              {STATUS[a.id % 4]}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}