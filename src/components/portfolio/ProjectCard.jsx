import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Image } from "@/components/ui/image";
import DecryptText from "./DecryptText";

const LEVELS = { CRITICAL: 4, HIGH: 3, MEDIUM: 2 };

export default function ProjectCard({ p, i }) {
  const [seen, setSeen] = useState(false);
  const level = LEVELS[p.threat];

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      onViewportEnter={() => setSeen(true)}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: (i % 2) * 0.12 }}
      className="group relative border border-steel/10 bg-steel/[0.02] hover:border-cyber/50 hover:bg-cyber/[0.03] transition-colors duration-500 overflow-hidden flex flex-col"
    >
      <div className="relative aspect-[16/10] overflow-hidden border-b border-steel/10">
        <Image
          src={p.image}
          alt={p.title}
          fittingType="fill"
          className="w-full h-full object-cover grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-cyber/10 mix-blend-color group-hover:opacity-0 transition-opacity duration-700" />
        <div className="absolute top-3 left-3 font-mono text-[10px] tracking-[0.25em] text-steel/60 bg-void/70 px-2 py-1">
          FILE_0x0{i + 1}.enc
        </div>
        <div className="absolute top-3 right-3 font-mono text-[10px] tracking-[0.25em] text-cyber bg-void/70 px-2 py-1">
          DECRYPTED
        </div>
      </div>
      <div className="p-7 sm:p-9 flex flex-col flex-1">
        <h3 className="font-heading font-bold text-xl sm:text-2xl tracking-[0.08em] uppercase text-steel">
          <DecryptText text={p.title} start={seen} speed={30} />
        </h3>
        <p className="mt-4 text-base leading-relaxed text-steel/60">{p.desc}</p>
        <div className="mt-7 flex items-center gap-3 font-mono text-[10px] tracking-[0.2em]">
          <span className="text-steel/40">THREAT LEVEL</span>
          <div className="flex gap-1">
            {[1, 2, 3, 4].map((n) => (
              <span key={n} className={`w-5 h-1.5 ${n <= level ? "bg-alert" : "bg-steel/10"}`} />
            ))}
          </div>
          <span className="text-alert">{p.threat}</span>
        </div>
        <div className="mt-5">
          <p className="font-mono text-[10px] tracking-[0.2em] text-steel/40">RESOLUTION PATH</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {p.stack.map((s) => (
              <span key={s} className="font-mono text-xs px-2.5 py-1 border border-steel/15 text-steel/80 group-hover:border-cyber/40">{s}</span>
            ))}
          </div>
        </div>
        <div className="mt-auto pt-7">
          <a
            href={p.link}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.2em] text-cyber border border-cyber/30 px-4 py-2.5 hover:bg-cyber hover:text-void transition-colors duration-300"
          >
            LAUNCH APP <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </motion.article>
  );
}