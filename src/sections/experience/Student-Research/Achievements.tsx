import React from "react";
import { motion } from "framer-motion";
import { SectionTitle } from "@/components/ui";
import "./achievements.css";

const container = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut", when: "beforeChildren", staggerChildren: 0.12 },
  },
};

const lineVariants = {
  hidden: { scaleX: 0, opacity: 0, originX: 0 },
  show: { scaleX: 1, opacity: 1, transition: { duration: 0.7, ease: [0.25, 0.8, 0.25, 1] } },
};

const titleVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const contentVariants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut", staggerChildren: 0.08 } },
};

const pillVariants = {
  hidden: { opacity: 0, y: 6, filter: "blur(2px)" as any },
  show: { opacity: 1, y: 0, filter: "blur(0px)" as any, transition: { duration: 0.35, ease: "easeOut" } },
};

export default function Achievements() {
  return (
    <section className="achievement-section">
      <SectionTitle title="Key Achievements" />

      {/* 外層容器：進場 + 子層交錯 */}
      <motion.div
        className="version-2 animate-fade-in-luxury"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* 幾何線條：scaleX 畫線效果 */}
        <motion.div
          className="geometric-line animate-draw-premium"
          variants={lineVariants}
        />

        {/* 大標題：淡入上浮 */}
        <motion.h2
          className="main-title animate-emerge"
          variants={titleVariants}
        >
          Research Validated on an International Stage
        </motion.h2>

        {/* 內文：容器淡入 + span 膠囊交錯浮現 */}
        <motion.div className="content animate-reveal-elegant" variants={contentVariants}>
          Published the study as{" "}
          <motion.span className="highlight-pill animate-shimmer-in" variants={pillVariants}>
            first author
          </motion.span>{" "}
          at{" "}
          <motion.span className="highlight-pill animate-shimmer-in-delayed-1" variants={pillVariants}>
            IEEE ICCE 2025
          </motion.span>
          , where it was recognized with the{" "}
          <motion.span className="highlight-pill animate-shimmer-in-delayed-2" variants={pillVariants}>
            Best Presentation Award
          </motion.span>{" "}
          in the Embedded System for IoT Applications session.
        </motion.div>
      </motion.div>
    </section>
  );
}
