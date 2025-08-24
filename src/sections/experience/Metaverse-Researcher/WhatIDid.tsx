import React from "react";
import { motion } from "framer-motion";
import { SectionTitle, Para } from "@/components/ui";
import { reveal } from "@/components/ui/common/animations";

export default function WhatIDidSection() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-2">
        <SectionTitle title="What I Did" />
        <div className="mt-12 grid items-start gap-10 md:grid-cols-2">
          <motion.div
            variants={reveal()}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="space-y-5 text-lg leading-relaxed text-zinc-700"
          >
            <Para>
              Reached out to and <strong>scheduled an interview with the CEO</strong> of an
              art-tech startup, then conducted the interview to understand the
              company’s adoption of metaverse technologies and related challenges.
            </Para>
            <Para>
              Collected data through literature review, case materials, and <strong>field
              observations</strong>, including interactive exhibition experiences.
            </Para>
            <Para>
              <strong>Organized and analyzed findings</strong> using structured frameworks (PEST,
              CPND) to evaluate opportunities and barriers in the arts industry.
            </Para>
          </motion.div>

          <motion.div
            variants={reveal()}
            initial="hidden"
            whileInView="show"
            custom={1}
            viewport={{ once: true, amount: 0.3 }}
          >
            <img
              src="/research-focus.png"
              alt="研究重點圖片"
              className="w-full h-auto rounded-2xl object-cover"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
