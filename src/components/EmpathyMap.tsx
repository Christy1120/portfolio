// src/components/EmpathyMap.tsx
import React from "react";
import { motion } from "framer-motion";
import { BrainCircuit } from "lucide-react";

export default function EmpathyMap({
  size = "md",
  accent = "#ec4899", // 改為 Tailwind 的 pink-500
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

  const sizeMap: Record<string, string> = {
    sm: "max-w-[18rem] md:max-w-[20rem]",
    md: "max-w-[22rem] md:max-w-[26rem]",
    lg: "max-w-[26rem] md:max-w-[30rem]",
  };

  // 換成粉/紫/紫紅/玫瑰色系，適配深色背景
  const hues: Record<string, { tint: string; bullet: string; ring: string; heading: string }> = {
    Says:   { tint: "rgba(236,72,153,.15)",  bullet: "rgba(236,72,153,.9)",  ring: "rgba(236,72,153,.3)",  heading: "rgba(244,114,182,1)" }, // Pink
    Thinks: { tint: "rgba(168,85,247,.15)",  bullet: "rgba(168,85,247,.9)",  ring: "rgba(168,85,247,.3)",  heading: "rgba(192,132,252,1)" }, // Purple
    Does:   { tint: "rgba(217,70,239,.15)",  bullet: "rgba(217,70,239,.9)",  ring: "rgba(217,70,239,.3)",  heading: "rgba(232,121,249,1)" }, // Fuchsia
    Feels:  { tint: "rgba(244,63,94,.15)",   bullet: "rgba(244,63,94,.9)",   ring: "rgba(244,63,94,.3)",   heading: "rgba(251,113,133,1)" }, // Rose
  };

  return (
    <section className={`w-full ${className}`}>
      <h4 className="mb-4 text-left text-lg font-bold text-white">Empathy Map</h4>

      <div className={`relative mx-auto ${sizeMap[size]} md:aspect-square`}>
        
        {/* 中心圖示：改為深色底 */}
        <div className="flex justify-center mb-6 md:mb-0 md:absolute md:left-1/2 md:top-1/2 md:z-10 md:-translate-x-1/2 md:-translate-y-1/2">
          <motion.div
            className="relative flex h-16 w-16 items-center justify-center rounded-full bg-[#0a0a0a] shadow-[0_0_20px_rgba(236,72,153,0.2)] ring-1 ring-white/10 md:h-20 md:w-20"
            initial={{ scale: 0.98 }}
            animate={{ scale: [0.98, 1, 0.98] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <span
              aria-hidden
              className="pointer-events-none absolute -inset-4 rounded-full blur-2xl"
              style={{ background: `radial-gradient(40% 40% at 50% 50%, ${accent}33, transparent)` }}
            />
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-full"
              style={{ boxShadow: `inset 0 0 0 1px ${accent}44` }}
            />
            <BrainCircuit className="h-8 w-8" style={{ color: accent }} />
          </motion.div>
        </div>

        {/* 十字分隔線：調整為適合深色背景的白/灰漸層 */}
        <div className="hidden md:block pointer-events-none absolute inset-0">
          <div
            className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2"
            style={{
              background:
                "linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0.15), rgba(255,255,255,0))",
            }}
          />
          <div
            className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2"
            style={{
              background:
                "linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,0.15), rgba(255,255,255,0))",
            }}
          />
        </div>

        {/* 四象限網格：改為深色毛玻璃背景與淺色文字 */}
        <div className="grid grid-cols-1 gap-4 md:absolute md:inset-0 md:grid-cols-2 md:grid-rows-2 md:gap-4 md:p-3">
          {quadrants.map((q, i) => {
            const tone = hues[q.title as keyof typeof hues] ?? hues.Says;
            return (
              <motion.div
                key={q.title}
                className="flex flex-col items-start justify-center rounded-xl bg-[#0a0a0a]/60 backdrop-blur-md p-4 md:p-3 text-left shadow-sm ring-1 ring-white/5"
                style={
                  colorful
                    ? {
                        backgroundImage: `linear-gradient(135deg, ${tone.tint} 0%, rgba(0,0,0,0) 70%)`,
                        boxShadow: `inset 0 0 0 1px ${tone.ring}, 0 4px 6px rgba(0,0,0,.3)`,
                      }
                    : undefined
                }
                initial={{ opacity: 0, scale: 0.95, y: 4 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.45, delay: 0.12 * i, ease: "easeOut" }}
              >
                <h5
                  className="mb-2 md:mb-1.5 text-base font-bold md:text-[15px]"
                  style={{ color: colorful ? tone.heading : "#fff" }}
                >
                  {q.title}
                </h5>
                <ul
                  className="list-disc list-outside pl-5 space-y-1.5 md:space-y-1 leading-relaxed text-sm md:text-xs"
                  style={{ color: colorful ? tone.bullet : "#cbd5e1" }}
                >
                  {q.items.map((item, k) => (
                    <li key={k}>
                      <span className="text-gray-300 text-sm md:text-xs">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}