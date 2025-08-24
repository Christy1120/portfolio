import React from "react";
import { motion } from "framer-motion";
import TagPill from "../atoms/TagPill";
import { itemVariants } from "../common/animations";

/**
 * InfoCard — 固定左欄寬度，消除因 Tag 文字長度不同造成的右側對齊偏移
 * 用 grid 的明確欄寬，確保右側內容在所有卡片中起點一致。
 *
 * 可用 props 覆寫 labelWidth，例如：
 * <InfoCard labelWidth="9rem" ... />
 */
export default function InfoCard({
  tag,
  tone,
  children,
  labelWidth = "8rem",
}: {
  tag: string;
  tone: "amber" | "slate";
  children: React.ReactNode;
  /** 左側標籤區塊固定寬度（可用 rem / px / ch），預設 8rem */
  labelWidth?: string;
}) {
  return (
    <motion.div
      variants={itemVariants}
      className="grid items-start gap-4 rounded-xl bg-white p-4 transition-all duration-300"
      // 以 CSS 變數方式將寬度帶入 grid template
      style={{ gridTemplateColumns: `minmax(${labelWidth}, ${labelWidth}) 1fr` }}
    >
      {/* 左欄固定寬度，避免因字長引起的右欄位移；微調頂部 2px 讓視覺更齊 */}
      <div className="w-full mt-[2px]">
        <TagPill label={tag} tone={tone} />
      </div>

      {/* 右欄內容固定從同一位置開始 */}
      <div className="text-base leading-relaxed text-slate-800">
        {children}
      </div>
    </motion.div>
  );
}

/**
 * 使用建議：
 * - 在桌面版可設 labelWidth="9rem"，行動版縮小：
 *   <div className="space-y-4">
 *     <InfoCard tag="Pain Point" tone="slate" labelWidth="9rem">...</InfoCard>
 *     <InfoCard tag="Solution" tone="amber" labelWidth="9rem">...</InfoCard>
 *     <InfoCard tag="Outcome"  tone="amber" labelWidth="9rem">...</InfoCard>
 *   </div>
 * - 若要響應式：外層用容器偵測斷點切換不同 width，或在組件內用
 *   style={{ gridTemplateColumns: `minmax(${isMobile? '7rem':'9rem'}, ${isMobile? '7rem':'9rem'}) 1fr` }}
 */
