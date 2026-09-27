import { motion } from "framer-motion";
import { ShieldCheck, BarChart3, Network, Database, ArrowUpRight } from "lucide-react";
import SectionHeading from "./SectionHeading";

const ICONS = { SECURITY: ShieldCheck, ANALYTICS: BarChart3, NETWORKING: Network, DATA: Database };

const CERTS = [
  { title: "Hands-On Cybersecurity Labs", issuer: "TechBiz Security Academy", date: "2026", field: "SECURITY" },
  { title: "Computer Network Fundamentals", issuer: "ITI · Mahara-Tech", date: "Jun 2026", field: "NETWORKING" },
  { title: "Cybersecurity Fundamentals", issuer: "Sprints", date: "2026", field: "SECURITY" },
  { title: "HCIA-Security V4.0", issuer: "Huawei ICT Academy", date: "Aug 2026", field: "SECURITY" },
  { title: "Data Fundamentals", issuer: "IBM SkillsBuild", date: "Jul 2026", field: "DATA", link: "https://www.credly.com/badges/8083891b-f6be-402f-a996-fe62cc0e1f35" },
  { title: "Data Analyst L1", issuer: "MBRF · UNDP · Coursera", date: "2026", field: "ANALYTICS" },
  { title: "Google Data Analytics", issuer: "Google · Coursera", date: "Aug 2026", field: "ANALYTICS", link: "https://coursera.org/verify/professional-cert/3S20W9EB2K7U" },
  { title: "Google Cybersecurity", issuer: "Google · Coursera", date: "Jul 2026", field: "SECURITY", link: "https://coursera.org/verify/professional-cert/KFLBOK8SWPIE" },
  { title: "Ethical Hacking", issuer: "ITI · Mahara-Tech", date: "Jun 2026", field: "SECURITY" },
  { title: "Cybersecurity For Beginners", issuer: "ITI Mahara-Tech · VMware", date: "Jun 2026", field: "SECURITY" },
  { title: "Digital Safety and Security Awareness", issuer: "Cisco Networking Academy · Cairo University", date: "Feb 2026", field: "SECURITY" },
  { title: "Networking Basics", issuer: "Cisco Networking Academy · Cairo University", date: "Feb 2026", field: "NETWORKING" },
];

export default function Certifications() {
  return (
    <section id="certs" className="relative py-28 md:py-40">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <SectionHeading index="05" label="CLEARANCE CREDENTIALS" title="Certifications" color="text-alert" />
        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-steel/10 border border-steel/10">
          {CERTS.map((c, i) => {
            const Icon = ICONS[c.field];
            return (
              <motion.div
                key={c.title}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: (i % 4) * 0.1 }}
                className="bg-void p-8 group hover:bg-alert/[0.04] transition-colors flex flex-col"
              >
                <div className="flex justify-between items-start">
                  <Icon className="w-7 h-7 text-steel/70 group-hover:text-alert transition-colors" strokeWidth={1.3} />
                  <span className="font-mono text-[10px] tracking-[0.2em] text-steel/35">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <p className="font-mono text-[10px] tracking-[0.25em] text-cyber mt-10">{c.field}</p>
                <h3 className="font-heading font-bold text-lg tracking-[0.05em] mt-2 text-steel">{c.title}</h3>
                <p className="text-sm text-steel/45 mt-2">{c.issuer} · {c.date}</p>
                {c.link && (
                  <a
                    href={c.link}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.2em] text-cyber/80 hover:text-cyber"
                  >
                    VERIFY <ArrowUpRight className="w-3 h-3" />
                  </a>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}