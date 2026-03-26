import React from "react";
import { motion } from "framer-motion";
import { BrainCircuit } from "lucide-react";

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

  const sizeMap: Record<string, string> = {
    sm: "max-w-[18rem] md:max-w-[20rem]",
    md: "max-w-[22rem] md:max-w-[26rem]",
    lg: "max-w-[26rem] md:max-w-[30rem]",
  };

  const hues: Record<string, { tint: string; bullet: string; ring: string; heading: string }> = {
    Says:   { tint: "rgba(16,185,129,.12)",  bullet: "rgba(16,185,129,.9)",  ring: "rgba(16,185,129,.25)",  heading: "rgba(15,118,110,1)" },
    Thinks: { tint: "rgba(99,102,241,.12)",  bullet: "rgba(99,102,241,.9)",  ring: "rgba(99,102,241,.25)",  heading: "rgba(67,56,202,1)" },
    Does:   { tint: "rgba(245,158,11,.12)",  bullet: "rgba(245,158,11,.9)",  ring: "rgba(245,158,11,.25)",  heading: "rgba(180,83,9,1)" },
    Feels:  { tint: "rgba(236,72,153,.12)",  bullet: "rgba(236,72,153,.9)",  ring: "rgba(236,72,153,.25)",  heading: "rgba(190,24,93,1)" },
  };

  return (
    <section className={`w-full ${className}`}>
      <h4 className="mb-4 text-left text-lg font-bold text-slate-800">Empathy Map</h4>

      {/* 1. 拿掉寫死的 style={{aspectRatio}}，改用 Tailwind 的 md:aspect-square 讓它只在電腦版變正方形 */}
      <div className={`relative mx-auto ${sizeMap[size]} md:aspect-square`}>
        
        {/* 2. 中心圖示：手機版放最上方置中，電腦版絕對定位在正中央 */}
        <div className="flex justify-center mb-6 md:mb-0 md:absolute md:left-1/2 md:top-1/2 md:z-10 md:-translate-x-1/2 md:-translate-y-1/2">
          <motion.div
            className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-md ring-1 ring-black/5 md:h-20 md:w-20"
            initial={{ scale: 0.98 }}
            animate={{ scale: [0.98, 1, 0.98] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <span
              aria-hidden
              className="pointer-events-none absolute -inset-4 rounded-full blur-2xl"
              style={{ background: `radial-gradient(40% 40% at 50% 50%, ${accent}22, transparent)` }}
            />
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-full"
              style={{ boxShadow: `inset 0 0 0 1px ${accent}33` }}
            />
            <BrainCircuit className="h-8 w-8" style={{ color: accent }} />
          </motion.div>
        </div>

        {/* 3. 十字分隔線：只有電腦版的 2x2 網格需要，手機版隱藏 (hidden md:block) */}
        <div className="hidden md:block pointer-events-none absolute inset-0">
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

        {/* 4. 四象限網格：手機版單欄往下排 (grid-cols-1)，電腦版絕對定位且 2x2 網格 */}
        <div className="grid grid-cols-1 gap-4 md:absolute md:inset-0 md:grid-cols-2 md:grid-rows-2 md:gap-4 md:p-3">
          {quadrants.map((q, i) => {
            const tone = hues[q.title as keyof typeof hues] ?? hues.Says;
            return (
              <motion.div
                key={q.title}
                className="flex flex-col items-start justify-center rounded-xl bg-white/65 backdrop-blur-sm p-4 md:p-3 text-left shadow-sm ring-1 ring-black/5"
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
                  className="mb-2 md:mb-1.5 text-base font-semibold md:text-[15px]"
                  style={{ color: colorful ? tone.heading : undefined }}
                >
                  {q.title}
                </h5>
                <ul
                  className="list-disc list-outside pl-5 space-y-1.5 md:space-y-1 leading-relaxed text-sm md:text-xs"
                  style={{ color: colorful ? tone.bullet : undefined }}
                >
                  {q.items.map((item, k) => (
                    <li key={k}>
                      <span className="text-slate-600 text-sm md:text-xs">{item}</span>
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