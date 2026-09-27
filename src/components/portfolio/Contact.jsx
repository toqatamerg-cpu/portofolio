import { Mail, Linkedin, Github, ArrowUpRight } from "lucide-react";
import SectionHeading from "./SectionHeading";
import ContactForm from "./ContactForm";

const LINKS = [
  { icon: Mail, label: "EMAIL", value: "toqatamerg@gmail.com", href: "mailto:toqatamerg@gmail.com" },
  { icon: Linkedin, label: "LINKEDIN", value: "in/toqa-tamer", href: "https://www.linkedin.com/in/toqa-tamer" },
  { icon: Github, label: "GITHUB", value: "github.com", href: "https://github.com" },
];

export default function Contact() {
  return (
    <section id="contact" className="relative pt-28 md:pt-40 pb-16">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <SectionHeading
          index="06"
          label="SECURE CHANNEL"
          title="Open a connection"
          sub="Hiring, collaborating, or just found something suspicious? Send a transmission."
        />
        <div className="mt-16 grid lg:grid-cols-[1fr_1.3fr] gap-10">
          <ul className="space-y-4">
            {LINKS.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  target={l.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="group flex items-center gap-5 border border-steel/10 p-6 hover:border-cyber/50 transition-colors"
                >
                  <l.icon className="w-6 h-6 text-steel/60 group-hover:text-cyber transition-colors" strokeWidth={1.4} />
                  <div className="flex-1 min-w-0">
                    <p className="font-mono text-[10px] tracking-[0.25em] text-steel/40">SECURE HANDSHAKE · {l.label}</p>
                    <p className="text-lg text-steel truncate mt-1">{l.value}</p>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-steel/30 group-hover:text-cyber group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </a>
              </li>
            ))}
          </ul>
          <ContactForm />
        </div>
        <footer className="mt-28 pt-8 border-t border-steel/10 flex flex-col sm:flex-row justify-between gap-3 font-mono text-[10px] tracking-[0.25em] text-steel/35">
          <span>© 2026 TOQA TAMER · ALL SYSTEMS NOMINAL</span>
          <a href="#identity" className="hover:text-cyber transition-colors">RETURN TO ORIGIN ↑</a>
        </footer>
      </div>
    </section>
  );
}