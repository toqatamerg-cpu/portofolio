import { useCallback, useRef, useState } from "react";
import Globe from "./Globe";
import AttackLog from "./AttackLog";
import SectionHeading from "./SectionHeading";
import { useReducedMotion } from "./MotionContext";

export default function GlobeSection() {
  const { reduced } = useReducedMotion();
  const [attacks, setAttacks] = useState([]);
  const counter = useRef(0);

  const onAttack = useCallback((a) => {
    counter.current += 1;
    const item = { ...a, id: counter.current };
    setAttacks((prev) => [item, ...prev].slice(0, 7));
  }, []);

  return (
    <section id="map" className="relative py-28 md:py-36 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <SectionHeading
          index="02"
          label="GLOBAL THREAT SURFACE"
          title="The world is under attack"
          sub="Every arc is an intrusion attempt, captured, classified and analysed in real time. Security is a data problem, and data is a security problem."
        />
        <div className="mt-12 grid lg:grid-cols-[1.6fr_1fr] gap-10 items-center">
          <div className="relative aspect-square max-h-[680px] w-full">
            <Globe onAttack={onAttack} reduced={reduced} />
            <div className="absolute top-2 left-2 font-mono text-[10px] tracking-[0.25em] text-steel/40">
              ORBITAL VIEW · 16 NODES
            </div>
          </div>
          <AttackLog attacks={attacks} total={counter.current} />
        </div>
      </div>
    </section>
  );
}