import React from "react";
import { motion } from "framer-motion";
import { BrainCircuit } from "lucide-react";

/**
 * EmpathyMap — Polished (colorful, brand‑aware)
 * - 柔和十字分隔線（漸層）
 * - 四象限卡片：玻璃感 + 可選色彩襯底（colorful=true）
 * - 子彈符號用色但文字維持灰階（透過 ul 的 color 與 li span）
 * - 中心圖示：品牌色光暈（accent，預設 #FABC00）
 * - 尺寸控制：size = "sm" | "md" | "lg"
 */
export default function EmpathyMap({
  size = "md",
  accent = "#FABC00",
  colorful = true,
  className = "",
}: {
  size?: "sm" | "md" | "lg";
  accent?: string;
  colorful?: boolean;
  className?: string;
}) {
  const quadrants = [
    {
      title: "Says",
      items: [
        '"Validating results takes too much time."',
        '"Switching across sources is frustrating."',
      ],
    },
    {
      title: "Thinks",
      items: ["There should be a faster way to evaluate performance."],
    },
    {
      title: "Does",
      items: [
        "Manually check outputs against references.",
        "Juggle multiple tools/files to verify.",
      ],
    },
    {
      title: "Feels",
      items: [
        "Frustrated by inefficiency.",
        "Overwhelmed by context-switching.",
      ],
    },
  ];

  // 尺寸映射（控制最大寬度）
  const sizeMap: Record<string, string> = {
    sm: "max-w-[18rem] md:max-w-[20rem]",
    md: "max-w-[22rem] md:max-w-[26rem]",
    lg: "max-w-[26rem] md:max-w-[30rem]",
  };

  // 色盤（RGBA 方便加透明度）
  const hues: Record<string, { tint: string; bullet: string; ring: string; heading: string }> = {
    Says:   { tint: "rgba(16,185,129,.12)",  bullet: "rgba(16,185,129,.9)",  ring: "rgba(16,185,129,.25)",  heading: "rgba(15,118,110,1)" }, // emerald/teal
    Thinks: { tint: "rgba(99,102,241,.12)",  bullet: "rgba(99,102,241,.9)",  ring: "rgba(99,102,241,.25)",  heading: "rgba(67,56,202,1)" },   // indigo
    Does:   { tint: "rgba(245,158,11,.12)",  bullet: "rgba(245,158,11,.9)",  ring: "rgba(245,158,11,.25)",  heading: "rgba(180,83,9,1)" },    // amber
    Feels:  { tint: "rgba(236,72,153,.12)",  bullet: "rgba(236,72,153,.9)",  ring: "rgba(236,72,153,.25)",  heading: "rgba(190,24,93,1)" },   // pink/rose
  };

  return (
    <section className={`w-full ${className}`}>
      <h4 className="mb-3 text-left text-lg font-bold text-slate-800">Empathy Map</h4>

      {/* 容器：限制最大寬度 + 維持正方形比例 */}
      <div className={`relative mx-auto ${sizeMap[size]}`} style={{ aspectRatio: "1 / 1" }}>
        {/* 中間十字分隔線：漸層淡入淡出 */}
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2"
            style={{
              background:
                "linear-gradient(to bottom, rgba(100,116,139,0), rgba(100,116,139,0.35), rgba(100,116,139,0))",
            }}
          />
          <div
            className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2"
            style={{
              background:
                "linear-gradient(to right, rgba(100,116,139,0), rgba(100,116,139,0.35), rgba(100,116,139,0))",
            }}
          />
        </div>

        {/* 四象限：玻璃感卡片 + 色彩襯底（左對齊） */}
        <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-3 p-2 md:gap-4 md:p-3">
          {quadrants.map((q, i) => {
            const tone = hues[q.title as keyof typeof hues] ?? hues.Says;
            return (
              <motion.div
                key={q.title}
                className="flex flex-col items-start justify-center rounded-xl bg-white/65 backdrop-blur-sm p-2.5 md:p-3 text-left shadow-sm ring-1 ring-black/5"
                style={
                  colorful
                    ? {
                        backgroundImage: `linear-gradient(135deg, ${tone.tint} 0%, rgba(255,255,255,0) 70%)`,
                        boxShadow: `inset 0 0 0 1px ${tone.ring}, 0 1px 1px rgba(0,0,0,.04)`,
                      }
                    : undefined
                }
                initial={{ opacity: 0, scale: 0.95, y: 4 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.45, delay: 0.12 * i, ease: "easeOut" }}
              >
                <h5
                  className="mb-1.5 text-sm font-semibold md:text-[15px]"
                  style={{ color: colorful ? tone.heading : undefined }}
                >
                  {q.title}
                </h5>
                {/* 讓子彈顏色套用 tone，但文字維持灰階；改為 list-outside + padding 讓縮排一致 */}
                <ul
                  className="list-disc list-outside pl-5 space-y-1 leading-relaxed md:text-xs"
                  style={{ color: colorful ? tone.bullet : undefined }}
                >
                  {q.items.map((item, k) => (
                    <li key={k}>
                      <span className="text-slate-600 text-[11px] md:text-xs">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        {/* 中心圖示：品牌色光暈 + 細環（包一層 wrapper，避免 transform 被覆蓋） */}
        <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
          <motion.div
            className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-md ring-1 ring-black/5 md:h-20 md:w-20"
            initial={{ scale: 0.98 }}
            animate={{ scale: [0.98, 1, 0.98] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* 光暈 */}
            <span
              aria-hidden
              className="pointer-events-none absolute -inset-4 rounded-full blur-2xl"
              style={{ background: `radial-gradient(40% 40% at 50% 50%, ${accent}22, transparent)` }}
            />
            {/* 內圈淡色 */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-full"
              style={{ boxShadow: `inset 0 0 0 1px ${accent}33` }}
            />
            <BrainCircuit className="h-8 w-8" style={{ color: accent }} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
