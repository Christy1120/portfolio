import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

/** ============ 時間線樣式（沿用你的設定） ============ */
const toneStyles = {
  amber: {
    dot: "bg-amber-500 border-4 border-amber-100",
    railGlow: "bg-gradient-to-r from-amber-200/40 via-amber-300/20 to-amber-200/40",
    tag: "bg-slate-800 text-amber-100",
    border: "border-slate-900",
    cardHover: "hover:border-amber-900 hover:shadow-amber-100/90",
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

export function Timeline({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <div className="pl-8 md:pl-10">
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-gradient-to-b from-slate-900 via-slate-500 to-slate-200"
          style={{ left: "16px" }}
        />
        <div className="space-y-8">{children}</div>
      </div>
    </div>
  );
}

export function TimelineItem({
  tag,
  tone = "slate",
  children,
  index = 0,
}: {
  tag: string;
  tone?: Tone;
  children: React.ReactNode;
  index?: number;
}) {
  const t = toneStyles[tone];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
      }}
      viewport={{ once: true, amount: 0.3 }}
      className="relative"
    >
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{
          scale: 1,
          transition: { delay: index * 0.1 + 0.2, duration: 0.4, type: "spring", stiffness: 400 },
        }}
        whileHover={{ scale: 1.1 }}
        className={`absolute w-4 h-4 rounded-full ${t.dot} cursor-pointer z-10`}
        style={{ left: "-24px", top: "24px" }}
      />
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1, transition: { delay: index * 0.1 + 0.1, duration: 0.3 } }}
        className={`absolute w-8 h-8 rounded-full ${t.railGlow} blur-sm z-0`}
        style={{ left: "-32px", top: "16px" }}
      />
      <motion.div
        initial={{ x: 20, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1, transition: { delay: index * 0.1 + 0.3, duration: 0.4 } }}
        whileHover={{ y: -2, transition: { duration: 0.2 } }}
        className={`rounded-xl border ${t.border} ${t.cardHover} bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-lg`}
      >
        <div className="flex items-left gap-2 mb-3">
          <span className={`px-3 py-1.5 text-xs font-bold rounded-full border ${t.tag}`}>{tag}</span>
        </div>
        <div className="text-sm leading-relaxed text-slate-700">{children}</div>
      </motion.div>
    </motion.div>
  );
}

/** ============ 主頁：左時間線 + 右圖片立即切換 ============ */
export default function TimelineWithInstantSwitchImage() {
  const images = ["/public/robot_flower.png", "/public/robot_wave.png"]; // ← 換成你的兩張圖片
  const [index, setIndex] = useState(0);

  // 每 0.5 秒直接切換
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % images.length), 900);
    return () => clearInterval(id);
  }, [images.length]);

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

      {/* 兩欄：左時間線 / 右圖片 */}
      <div className="grid gap-10 md:grid-cols-[1fr,420px]">
        {/* 左：時間線 */}
        <Timeline>
          <TimelineItem tag="Problem Definition" tone="amber" index={0}>
            <p>Using AI to Tackle Real Agricultural Issues</p>
          </TimelineItem>
          <TimelineItem tag="Data Collection" tone="amber" index={0}>
            <p>Reached out to agricultural sites and collected rose leaf images.</p>
          </TimelineItem>
          <TimelineItem tag="Solution Prototype" tone="amber" index={1}>
            <p>Developing a CNN Model for Pest Detection.</p>
          </TimelineItem>
          <TimelineItem tag="Validation" tone="amber" index={2}>
            <p>Validated accuracy and deployment considerations.</p>
          </TimelineItem>
        </Timeline>

        {/* 右：圖片立即切換 */}
        <aside className="md:sticky md:top-24 h-fit">
          <div className="relative overflow-hidden rounded-xl shadow-sm">
            <div className="relative w-full h-64 md:h-[420px]">
              <img
                
                src={images[index]}
                alt="Switching"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
