import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts";

const DATA = [
  { s: "Python", v: 90 },
  { s: "SQL", v: 85 },
  { s: "Power BI", v: 85 },
  { s: "Tableau", v: 80 },
  { s: "Wireshark", v: 82 },
  { s: "C++", v: 75 },
  { s: "React", v: 75 },
];

export default function SkillsRadar() {
  return (
    <div className="border border-steel/10 p-6 bg-void">
      <div className="flex justify-between font-mono text-[10px] tracking-[0.25em]">
        <span className="text-cyber">CAPABILITY SIGNATURE</span>
        <span className="text-steel/40">7 VECTORS</span>
      </div>
      <div className="h-[340px] mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={DATA} outerRadius="72%">
            <PolarGrid stroke="rgba(226,232,240,0.12)" />
            <PolarAngleAxis dataKey="s" tick={{ fill: "#E2E8F0", fontSize: 11, fontFamily: "JetBrains Mono" }} />
            <Radar dataKey="v" stroke="#00F0FF" fill="#00F0FF" fillOpacity={0.18} strokeWidth={1.5} isAnimationActive />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}