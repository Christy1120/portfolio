import React from "react";
import { motion } from "framer-motion";
import TagPill from "../atoms/TagPill";
import { itemVariants } from "../common/animations";

export default function InfoCard({
  tag,
  tone,
  children,
  labelWidth = "8rem",
}: {
  tag: string;
  tone: "amber" | "slate";
  children: React.ReactNode;
  labelWidth?: string;
}) {
  return (
    <motion.div
      variants={itemVariants}
      // 👇 魔法在這裡：預設 grid-cols-1 (手機版上下排)，md 以上套用自訂雙欄比例
      className="grid grid-cols-1 md:grid-cols-[var(--label-width)_1fr] items-start gap-3 md:gap-4 rounded-xl bg-white p-4 transition-all duration-300"
      // 把 labelWidth 變成 CSS 變數傳給 Tailwind 讀取
      style={{ "--label-width": labelWidth } as React.CSSProperties}
    >
      {/* 左欄 / 上欄 */}
      <div className="w-full md:mt-[2px] flex">
        <TagPill label={tag} tone={tone} />
      </div>

      {/* 右欄 / 下欄 */}
      <div className="text-base leading-relaxed text-slate-800">
        {children}
      </div>
    </motion.div>
  );
}