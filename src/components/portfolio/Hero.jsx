import { motion } from "framer-motion";
import { Image } from "@/components/ui/image";
import DecryptText from "./DecryptText";
import PhotoFrame from "./PhotoFrame";

const BG = "https://media.base44.com/images/public/user_6ab80590070ba43890d882e1/33449da96_Gemini_Generated_Image_nrw0avnrw0avnrw0.jpg";
const PHOTO = "https://media.base44.com/images/public/user_6ab80590070ba43890d882e1/fb0e4c24d_60442904036257999641.jpg";
const BIO =
  "A Computer and Information Science student at Cairo University with a strong foundation in software development, data analytics, and cybersecurity. With one year of practical experience, I bridge technical disciplines — Python, C++, React, SQL, Power BI, Tableau, and Wireshark — to transform complex data and technical challenges into actionable business value. Passionate about engineering scalable solutions and driving informed decision-making through rigorous analysis.";
const STATS = [
  ["01 YR", "Field experience"],
  ["CU", "Cairo University"],
  ["07", "Core toolkits"],
];

export default function Hero() {
  return (
    <section id="identity" className="relative min-h-screen flex items-center overflow-hidden pt-28 pb-24">
      <div className="absolute inset-0">
        <Image src={BG} alt="" className="w-full h-full opacity-[0.18]" />
        <div className="absolute inset-0 bg-gradient-to-b from-void/70 via-void/85 to-void" />
      </div>
      <div className="relative max-w-7xl mx-auto px-5 md:px-10 grid lg:grid-cols-[1.25fr_1fr] gap-20 items-center w-full">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <p className="font-mono text-[11px] tracking-[0.3em] text-alert">[ SUBJECT IDENTIFIED ] — CLEARANCE LVL 5</p>
          <h1 data-text="TOQA TAMER" className="glitch font-heading font-bold text-5xl sm:text-7xl xl:text-8xl tracking-[0.06em] leading-none mt-6 text-steel">
            <DecryptText text="TOQA TAMER" delay={400} />
          </h1>
          <p className="mt-6 font-mono text-cyber tracking-[0.25em] text-sm sm:text-base">
            CYBERSECURITY <span className="text-alert">+</span> DATA ANALYSIS
          </p>
          <p className="mt-8 text-lg leading-[1.7] text-steel/75 max-w-xl">{BIO}</p>
          <dl className="mt-10 grid grid-cols-3 max-w-md border-t border-steel/10">
            {STATS.map(([v, l]) => (
              <div key={l} className="pt-4">
                <dt className="font-heading font-bold text-2xl text-steel">{v}</dt>
                <dd className="font-mono text-[10px] tracking-[0.2em] uppercase text-steel/45 mt-1">{l}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-10 flex flex-wrap gap-4 font-mono text-xs tracking-[0.25em]">
            <a href="#projects" className="bg-alert text-void px-6 py-3.5 font-bold hover:bg-steel transition-colors">OPEN CASE FILES</a>
            <a href="#contact" className="border border-steel/25 px-6 py-3.5 hover:border-cyber hover:text-cyber transition-colors">ESTABLISH CONTACT</a>
          </div>
        </motion.div>
        <PhotoFrame src={PHOTO} />
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-[0.3em] text-steel/40 animate-pulse">
        SCROLL ↓ TRACE THE SIGNAL
      </div>
    </section>
  );
}