import SectionHeading from "./SectionHeading";
import ProjectCard from "./ProjectCard";

const PROJECTS = [
  {
    title: "Steam Threat Dashboard",
    desc: "A Streamlit-powered cybersecurity dashboard that analyses Steam gaming data — surfacing key metrics, a live world map of secure vs. attack connections, threat-severity breakdowns, correlation matrices, and time-of-day threat activity.",
    threat: "CRITICAL",
    stack: ["Python", "Streamlit", "Pandas", "Plotly"],
    link: "https://app-dashboard-ujhbvafry9jpmhnwufe2en.streamlit.app/",
    image: "https://media.base44.com/images/public/6ab8060c97bbd49aeced3f3a/4c957c8dd_Gemini_Generated_Image_sb9asjsb9asjsb9a.jpg",
  },
  {
    title: "Fuel Theft Analytics",
    desc: "A React dashboard that visualises fuel-theft patterns — theft-rate gauges, geospatial hotspots, transaction-trend lines, day-of-week breakdowns, and regional volume rankings — giving investigators a single forensic view.",
    threat: "HIGH",
    stack: ["React", "JavaScript", "Recharts", "Vercel"],
    link: "https://fuel-dashboard-eta.vercel.app/",
    image: "https://media.base44.com/images/public/6ab8060c97bbd49aeced3f3a/ebd4b53d3_Screenshot2026-09-11214022.png",
  },
  {
    title: "Olist Cybereason Insights",
    desc: "A threat-intelligence dashboard built on Olist e-commerce data — tracking active threats and monetary impact, a South American attack-node map, threat-vector profiling, and rolling ransomware / system-compromise timelines.",
    threat: "HIGH",
    stack: ["Python", "React", "Data Viz", "GitHub Pages"],
    link: "https://toqatamerg-cpu.github.io/olist-dashboard/",
    image: "https://media.base44.com/images/public/6ab8060c97bbd49aeced3f3a/901dacc92_Gemini_Generated_Image_hua3r5hua3r5hua3.jpg",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="relative py-28 md:py-40">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <SectionHeading
          index="03"
          label="DECRYPTED FILES"
          title="Case files"
          sub="Each project began as noise: raw packets, raw tables, raw problems. These are the cases I closed."
        />
        <div className="mt-16 grid md:grid-cols-2 gap-6">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.title} p={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}