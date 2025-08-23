import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { TIMELINE } from "../data/timeline";
import BackgroundFX from "../components/timeline/BackgroundFX";
import { CenterProgressLine } from "../components/timeline/CenterProgressLine";
import { TimelineItemRow } from "../components/timeline/TimelineItemRow";
import type { TimelineItem } from "../components/timeline/types";

export default function ExperienceTimeline() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start 0.9", "end 0.1"] });

  return (
    <section id="experience" className="relative overflow-hidden py-20 bg-slate-50" ref={sectionRef}>
      <BackgroundFX />

      <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          className="text-4xl font-bold text-left mb-16 bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Experience
        </motion.h2>

        <div className="relative mt-10">
          <CenterProgressLine scrollYProgress={scrollYProgress} />

          <ul className="space-y-16">
            {(TIMELINE as TimelineItem[]).map((item, idx) => (
              <TimelineItemRow key={`${item.title}-${idx}`} item={item} idx={idx} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
