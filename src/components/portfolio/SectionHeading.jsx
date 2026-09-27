import { motion } from "framer-motion";

export default function SectionHeading({ index, label, title, sub, color = "text-cyber" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8 }}
      className="max-w-3xl"
    >
      <p className={`font-mono text-[11px] tracking-[0.3em] ${color}`}>
        {index} // {label}
      </p>
      <h2 className="font-heading font-bold text-3xl sm:text-5xl tracking-[0.12em] uppercase mt-4 text-steel">{title}</h2>
      {sub && <p className="mt-5 text-lg leading-relaxed text-steel/60">{sub}</p>}
    </motion.div>
  );
}