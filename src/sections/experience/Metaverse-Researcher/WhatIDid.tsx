import React from "react";
import { motion } from "framer-motion";
import { SectionTitle } from "@/components/ui";
import { reveal } from "@/components/ui/common/animations";

type Row = { title: string; text: string; img: string; side: "left" | "right" };

export default function WhatIDidSection() {
  const rows: Row[] = [
    {
      title: "Interview with Industry Leadership",
      text: "Reached out to and scheduled an interview with the CEO of an art-tech startup, then conducted the interview to understand the company’s adoption of metaverse technologies and related challenges.",
      img: "/public/girl_interview.png",
      side: "right",
    },
    {
      title: "Comprehensive Data Collection & Field Study", 
      text: "Collected data through literature review, case materials, and field observations, including interactive exhibition experiences.",
      img: "/public/girl_read.png",
      side: "left",
    },
    {
      title: "Framework-Based Industry Analysis",
      text: "Organized and analyzed findings using structured frameworks (PEST, CPND) to evaluate opportunities and barriers in the arts industry.",
      img: "/public/girl_type.png",
      side: "right",
    },
  ];

  const imageContainerVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 60 },
    show: (i: number) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.8, delay: i * 0.2, ease: [0.25, 0.46, 0.45, 0.94] },
    }),
  };

  const imageVariants = {
    hidden: { scale: 1.05, filter: "blur(4px) brightness(0.9)" },
    show: {
      scale: 1,
      filter: "blur(0px) brightness(1)",
      transition: { duration: 1.0, delay: 0.2, ease: "easeOut" },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, x: 30, y: 20 },
    show: (i: number) => ({
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.7, delay: i * 0.2 + 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
    }),
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, delay: i * 0.2 + 0.4, ease: "easeOut" },
    }),
  };

  return (
    <section className="bg-white relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20 relative z-10">
        <SectionTitle title="What I Did" />

        <div className="mt-12 space-y-24">
          {rows.map((row, i) => (
            <motion.div
              key={i}
              variants={reveal()}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              custom={i}
              className="md:grid md:grid-cols-12 md:items-center gap-x-12 gap-y-8"
            >
              {/* 圖片 */}
              <motion.div
                variants={imageContainerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                custom={i}
                className={`md:col-span-5 flex ${
                  row.side === "left" ? "md:order-1 justify-start" : "md:order-2 justify-end"
                }`}
              >
                <motion.img
                  variants={imageVariants}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.3 }}
                  src={row.img || "/research-focus.png"}
                  alt={row.title}
                  className="w-[260px] md:w-[320px] lg:w-[360px] h-auto object-cover rounded-2xl"
                />
              </motion.div>

              {/* 文字 */}
              <div
                className={`md:col-span-7 ${
                  row.side === "left" ? "md:order-2 md:pl-6" : "md:order-1 md:pr-6"
                }`}
              >
                <motion.h3
                  variants={titleVariants}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.3 }}
                  custom={i}
                  className="text-2xl font-extrabold text-slate-900"
                >
                  {row.title}
                </motion.h3>
                
                <motion.p
                  variants={textVariants}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.3 }}
                  custom={i}
                  className="mt-2 max-w-prose text-slate-700 leading-7"
                >
                  {row.text}
                </motion.p>

                {/* 單色底線 */}
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  whileInView={{ width: "60px", opacity: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8, delay: i * 0.2 + 0.6 }}
                  className="mt-4 h-1 bg-[#FABC00] rounded-full"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
