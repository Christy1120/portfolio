import React from "react";
import { motion } from "framer-motion";
import { reveal } from "@/components/ui/common/animations";
import { SectionTitle, InfoCard } from "@/components/ui";
import TimelineWithRightImage from "./VerticalTimeline";

type CardItem = {
  tag: string;
  tone: "amber" | "slate";
  title: string;
  text: string;
};

type Row = {
  img: string;
  side: "left" | "right";
  cards: CardItem[];
  /** 可選：這筆內容前要顯示的編號標題 */
  numberedTitle?: string;
  number?: string; // 例如 "01", "02"
};

type SectionTitleNumberedProps = { title: string; number: string };

function SectionTitleNumbered({ title, number }: SectionTitleNumberedProps) {
  return (
    <div className="mb-6 flex items-baseline">
      <span className="mr-4 text-4xl font-bold text-gray-300">{number}</span>
      <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
      <div className="mt-3 ml-4 flex-1 border-t border-dashed border-gray-300" />
    </div>
  );
}

export default function WhatIDidSection() {
  const rows: Row[] = [
    {
      img: "/Friendly Farmer Wave Illustration.png",
      side: "right",
      number: "01",
      numberedTitle: `As a rose farmer,
I want to detect spider mite damage on rose leaves early,
so that I can act before infestations spread and reduce crop losses.`,
      cards: [
        {
          tag: "Solution",
          tone: "amber",
          title: "Dataset Creation",
          text:
            "Personally conducted fieldwork to capture over 1,000 rose leaf images and completed labeling/classification to build a structured dataset.",
        },
        {
          tag: "Value",
          tone: "slate",
          title: "Research Foundation",
          text:
            "Provided a high-quality dataset as the base for deep learning experiments to explore AI-based pest detection.",
        },
      ],
    },
    {
      img: "/Smiling Elder in Yellow Sweater.png",
      side: "left",
      number: "02",
      numberedTitle: `As a researcher ,
I want to test whether deep learning models can recognize agricultural pest damage,
so that we can validate feasibility and explore practical adoption.`,
      cards: [
        {
          tag: "Solution",
          tone: "amber",
          title: "Model Prototyping",
          text:
            "Applied and compared CNN models to evaluate recognition accuracy on the custom dataset.",
        },
        {
          tag: "Value",
          tone: "slate",
          title: "Feasibility",
          text:
            "Demonstrated the technical feasibility of computer vision for agricultural pest detection.",
        },
      ],
    },
  ];

  /** ===== 動畫 variants（標題、圖片、文字） ===== */
  const headingVariants = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const imageContainerVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 60 },
    show: (i: number) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.8, delay: i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] },
    }),
  };

  const imageVariants = {
    hidden: { scale: 1.05, filter: "blur(4px) brightness(0.9)" as any },
    show: {
      scale: 1,
      filter: "blur(0px) brightness(1)" as any,
      transition: { duration: 0.9, delay: 0.15, ease: "easeOut" },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, x: 30, y: 20 },
    show: (i: number) => ({
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.6, delay: i * 0.15 + 0.25, ease: [0.25, 0.46, 0.45, 0.94] },
    }),
  };

  return (
    <section className="relative overflow-hidden bg-white">
      <div className="relative z-10 mx-auto max-w-6xl px-6 py-16 md:py-20">
        {/* 區塊主標 */}
        <SectionTitle title="What I Did" />

        {/* 你的時間軸（保留） */}
        <TimelineWithRightImage />
        <SectionTitle title="User Story" />
        {/* 逐段：每筆 rows 都可以有自己的 SectionTitleNumbered + 兩欄內容 */}
        <div className="mt-12 space-y-24">
          {rows.map((row, i) => (
            <div key={i} className="space-y-6">
              {/* 每筆 row 的編號大標（有浮現動畫；有給才顯示） */}
              {row.numberedTitle && row.number && (
                <motion.div
                  variants={headingVariants}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <SectionTitleNumbered number={row.number} title={row.numberedTitle} />
                </motion.div>
              )}

              {/* 兩欄：圖片 + InfoCard 區塊 */}
              <motion.div
                variants={reveal()}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
                custom={i}
                className="md:grid md:grid-cols-12 md:items-start gap-x-12 gap-y-8"
              >
                {/* 圖片欄 */}
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
                    alt="What I Did"
                    className="h-auto w-[260px] rounded-2xl object-cover md:w-[320px] lg:w-[360px]"
                  />
                </motion.div>

                {/* 文字欄（多個 InfoCard） */}
                <motion.div
                  variants={textVariants}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.3 }}
                  custom={i}
                  className={`md:col-span-7 ${
                    row.side === "left" ? "md:order-2 md:pl-6" : "md:order-1 md:pr-6"
                  }`}
                >
                  {/* 專給 InfoCard 的動畫鍵（hidden/visible），避免與父層鍵名衝突 */}
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    className="space-y-4"
                  >
                    {row.cards.map((c, idx) => (
                      <InfoCard key={idx} tag={c.tag} tone={c.tone} labelWidth="9rem">
                        <h3 className="text-base font-semibold leading-6 text-slate-900">
                          {c.title}
                        </h3>
                        <p className="mt-1 text-base leading-7 text-slate-700">{c.text}</p>
                      </InfoCard>
                    ))}
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
