import React from "react";
import { motion } from "framer-motion";

/**
 * 垂直時間軸（沿用你的設定）
 */
const toneStyles = {
  amber: {
    dot: "bg-amber-500 border-4 border-amber-100",
    railGlow: "bg-gradient-to-r from-amber-200/40 via-amber-300/20 to-amber-200/40",
    tag: "bg-slate-800 text-amber-100",
    border: "border-slate-900",
    cardHover: "hover:border-slate-900 hover:shadow-slate-100/90",
  },
  slate: {
    dot: "bg-slate-500 border-4 border-slate-100",
    railGlow: "bg-gradient-to-r from-slate-200/40 via-slate-300/20 to-slate-200/40",
    tag: "bg-gradient-to-r from-slate-100 to-slate-50 text-slate-800 border-slate-200",
    border: "border-slate-200/60",
    cardHover: "hover:border-slate-300/80 hover:shadow-slate-100/50",
  },
} as const;

type Tone = keyof typeof toneStyles;

type TimelineProps = {
  children: React.ReactNode;
  className?: string;
};

export function Timeline({ children, className = "" }: TimelineProps) {
  return (
    <div className={`relative ${className}`}>
      {/* 主容器 - 設定左邊距為點的位置 */}
      <div className="pl-8 md:pl-10">
        {/* 垂直線條 - 絕對定位在左側 */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-gradient-to-b from-slate-900 via-slate-500 to-slate-200"
          style={{ left: "16px" }} // 32px / 2 = 16px (點中心)
        />
        {/* 內容區域 */}
        <div className="space-y-8">{children}</div>
      </div>
    </div>
  );
}

type TimelineItemProps = {
  tag: string;
  tone?: Tone;
  children: React.ReactNode;
  index?: number;
};

export function TimelineItem({
  tag,
  tone = "slate",
  children,
  index = 0,
}: TimelineItemProps) {
  const t = toneStyles[tone];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5,
          delay: index * 0.1,
          ease: [0.25, 0.46, 0.45, 0.94],
        },
      }}
      viewport={{ once: true, amount: 0.3 }}
      className="relative"
    >
      {/* 連接點 */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{
          scale: 1,
          transition: {
            delay: index * 0.1 + 0.2,
            duration: 0.4,
            type: "spring",
            stiffness: 400,
          },
        }}
        whileHover={{ scale: 1.1 }}
        className={`absolute w-4 h-4 rounded-full ${t.dot} cursor-pointer z-10`}
        style={{
          left: "-24px", // 讓點居中在線上
          top: "24px", // 與標題對齊
        }}
      />

      {/* 發光效果 */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{
          scale: 1,
          opacity: 1,
          transition: { delay: index * 0.1 + 0.1, duration: 0.3 },
        }}
        className={`absolute w-8 h-8 rounded-full ${t.railGlow} blur-sm z-0`}
        style={{
          left: "-32px",
          top: "16px",
        }}
      />

      {/* 卡片 */}
      <motion.div
        initial={{ x: 20, opacity: 0 }}
        whileInView={{
          x: 0,
          opacity: 1,
          transition: { delay: index * 0.1 + 0.3, duration: 0.4 },
        }}
        whileHover={{
          y: -2,
          transition: { duration: 0.2 },
        }}
        className={`rounded-xl border ${t.border} ${t.cardHover} bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-lg`}
      >
        {/* 標籤 */}
        <div className="flex items-left gap-2 mb-3">
          <span className={`px-3 py-1.5 text-xs font-bold rounded-full border ${t.tag}`}>
            {tag}
          </span>
        </div>

        {/* 內容 */}
        <div className="text-sm leading-relaxed text-slate-700">{children}</div>
      </motion.div>
    </motion.div>
  );
}

/* =====================
 * 範例頁：左側時間線 + 右側圖片（sticky）
 * ===================== */
export default function TimelineWithRightImage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      {/* 標題 */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-bold text-slate-900 mb-8"
      >
        Applying AI to Address Agricultural Challenges
      </motion.h2>

      {/* 兩欄版面：左邊時間線、右邊圖片 */}
      <div className="grid gap-10 md:grid-cols-[1fr,420px]">
        {/* 左：時間線 */}
        <Timeline>
          <TimelineItem tag="Data Collection" tone="amber" index={0}>
            <p className="font-medium text-slate-800 mb-2">
              Reached out to agricultural sites and collected rose leaf images, building a
              high-quality dataset.
            </p>
          </TimelineItem>

          <TimelineItem tag="Model Development" tone="amber" index={1}>
            <p className="font-bold text-slate-900 mb-3 text-base">
              Applied and compared deep learning models to develop a visual recognition
              prototype.
            </p>
          </TimelineItem>

          <TimelineItem tag="Validations" tone="amber" index={2}>
            <p className="font-bold text-slate-900 mb-3 text-base">
              Validated the prototype through experiments, highlighting both detection
              accuracy and practical deployment considerations.
            </p>
          </TimelineItem>
        </Timeline>

        {/* 右：圖片（桌機 sticky；手機自動疊放） */}
        <aside className="md:sticky md:top-24 h-fit">
          <figure className="overflow-hidden rounded-xl  shadow-sm">
            <img
              src="/public/robot_flower.png" // ← 換成你的圖片路徑
              alt="Project visual"
              className="block w-full h-auto object-cover"
            />
          </figure>
        </aside>
      </div>
    </section>
  );
}

/* =====================
 * （可選）若你想在「單一卡片右側」放圖，例子如下：
 * 用法：把下段取代某個 TimelineItem 的 children
 * =====================

<TimelineItem tag="Model Development" tone="amber" index={1}>
  <div className="grid gap-4 md:grid-cols-2 items-start">
    <div>
      <p className="font-bold text-slate-900 mb-3 text-base">
        Applied and compared deep learning models to develop a visual recognition prototype.
      </p>
      <p className="text-slate-700">
        Compared AlexNet and VGG16; iterated hyperparameters and deployment constraints.
      </p>
    </div>
    <img
      src="/images/model-diagram.png"
      alt="Model diagram"
      className="w-full h-40 md:h-48 object-cover rounded-lg border border-slate-200"
    />
  </div>
</TimelineItem>

*/
