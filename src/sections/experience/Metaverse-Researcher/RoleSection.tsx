import React from "react";
import { motion } from "framer-motion";
import { SectionTitle, Para, CenterNote } from "@/components/ui";
import { reveal } from "@/components/ui/common/animations";

export default function RoleSection() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <SectionTitle title="My Role" />
        <motion.div
          variants={reveal()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="mt-10 text-center"
        >
          <div className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 p-[2px] shadow-lg">
            <div className="rounded-full bg-white px-8 py-4 text-lg font-extrabold text-[#505050]">
              🎓 Primary Researcher
            </div>
          </div>
          <div className="mx-auto mt-8 max-w-2xl text-center text-lg leading-relaxed text-zinc-700">
            <Para noMarker>
              Took on the role of lead student researcher, responsible for reaching out
              to the case company CEO, conducting the interview, and analyzing findings
              through PEST and CPND frameworks.
            </Para>
            <CenterNote>
              Grateful for the supervision and advice from my professor, which helped
              refine the research and publication.
            </CenterNote>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
