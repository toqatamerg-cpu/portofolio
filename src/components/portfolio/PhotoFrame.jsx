import { motion } from "framer-motion";
import { Image } from "@/components/ui/image";

const Corner = ({ className }) => <span className={`absolute w-6 h-6 border-cyber ${className}`} />;

export default function PhotoFrame({ src }) {
  return (
    <motion.figure
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, delay: 0.6 }}
      className="relative mx-auto w-full max-w-sm aspect-square group rounded-full"
    >
      <div className="absolute inset-0 rounded-full border border-cyber/40 group-hover:border-cyber transition-colors duration-500 z-10 pointer-events-none" />
      <div className="absolute -inset-2 rounded-full border border-cyber/20 pointer-events-none" />
      <div className="relative w-full h-full overflow-hidden bg-void rounded-full">
        <Image
          src={src}
          alt="Portrait of Toqa Tamer"
          focalPointX={0.5}
          focalPointY={0.3}
          className="w-full h-full grayscale contrast-125 group-hover:grayscale-0 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-cyber/20 mix-blend-color group-hover:opacity-0 transition-opacity duration-700" />
        <div className="absolute inset-0 bg-[repeating-linear-gradient(to_bottom,rgba(8,8,10,0.35)_0_1px,transparent_1px_4px)]" />
        <div className="scan-line absolute inset-x-0 h-12 bg-gradient-to-b from-transparent via-cyber/25 to-transparent" />
      </div>
      <figcaption className="absolute -bottom-12 inset-x-0 flex justify-between font-mono text-[10px] tracking-[0.25em] text-steel/50">
        <span>ID: TT-0426</span>
        <span className="text-cyber">FACE MATCH 99.8%</span>
      </figcaption>
    </motion.figure>
  );
}