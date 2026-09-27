import SectionHeading from "./SectionHeading";
import SkillsRadar from "./SkillsRadar";
import PacketStream from "./PacketStream";

export default function ForensicLab() {
  return (
    <section id="lab" className="relative py-28 md:py-40 border-y border-steel/5 bg-[radial-gradient(ellipse_at_top,rgba(0,240,255,0.05),transparent_60%)]">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <SectionHeading
          index="04"
          label="FORENSIC LAB · LIVE"
          title="Where data meets defense"
          sub="On the left, my skill signature. On the right, a live capture. My job is to spot the one red line in a thousand grey ones, and explain what it means."
        />
        <div className="mt-16 grid lg:grid-cols-[1fr_1.4fr] gap-6 items-start">
          <SkillsRadar />
          <PacketStream />
        </div>
      </div>
    </section>
  );
}