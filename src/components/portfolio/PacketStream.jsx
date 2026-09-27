import { useEffect, useRef, useState } from "react";

const PROTOS = ["TCP", "UDP", "DNS", "HTTP", "TLSv1.3", "ARP", "ICMP"];
const INFO = ["SYN → 443", "Standard query A", "GET /api/v1/data", "Client Hello", "Who has 192.168.1.1?", "Echo request", "ACK Seq=1 Win=502"];
const BAD = ["SYN flood pattern", "Suspicious DNS tunnel", "' OR 1=1 -- detected", "Port scan 1-1024"];
const ip = () => `${10 + Math.floor(Math.random() * 180)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;

export default function PacketStream() {
  const [rows, setRows] = useState([]);
  const n = useRef(0);

  useEffect(() => {
    const iv = setInterval(() => {
      n.current += 1;
      const bad = Math.random() > 0.82;
      const k = Math.floor(Math.random() * PROTOS.length);
      const row = { no: n.current, t: (n.current * 0.137).toFixed(3), src: ip(), dst: ip(), proto: bad ? "TCP" : PROTOS[k], info: bad ? BAD[k % BAD.length] : INFO[k], bad };
      setRows((r) => [row, ...r].slice(0, 12));
    }, 550);
    return () => clearInterval(iv);
  }, []);

  const flagged = rows.filter((r) => r.bad).length;

  return (
    <div className="border border-steel/10 bg-void font-mono text-[11px] overflow-hidden">
      <div className="flex justify-between px-5 py-3 border-b border-steel/10 text-[10px] tracking-[0.25em]">
        <span className="text-cyber">PACKET CAPTURE · eth0</span>
        <span className="text-alert">{flagged} FLAGGED</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[520px]">
          <thead className="text-steel/35 text-left">
            <tr>{["No.", "Time", "Source", "Destination", "Proto", "Info"].map((h) => <th key={h} className="px-3 py-2 font-normal">{h}</th>)}</tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.no} className={r.bad ? "bg-alert/10 text-alert" : "text-steel/65"}>
                <td className="px-3 py-1.5">{r.no}</td>
                <td className="px-3 py-1.5">{r.t}</td>
                <td className="px-3 py-1.5">{r.src}</td>
                <td className="px-3 py-1.5">{r.dst}</td>
                <td className="px-3 py-1.5">{r.proto}</td>
                <td className="px-3 py-1.5 truncate max-w-[180px]">{r.info}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}