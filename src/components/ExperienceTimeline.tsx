import { useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, useScroll } from "framer-motion";
import { TIMELINE } from "../data/timeline";

// 中線節點配色
const DOTS = [
  { dot: "bg-amber-400", ring: "ring-amber-100", ping: "bg-amber-300/40" },
  { dot: "bg-sky-400", ring: "ring-sky-100", ping: "bg-sky-300/40" },
  { dot: "bg-emerald-400", ring: "ring-emerald-100", ping: "bg-emerald-300/40" },
  { dot: "bg-violet-400", ring: "ring-violet-100", ping: "bg-violet-300/40" },
];

// 半幅區隔用的多層漸層（沿用你原本的參數）
const ENHANCED_GRADS = [
  {
    primary: "linear-gradient(135deg, rgba(251,191,36,0.25), rgba(14,165,233,0.15), rgba(251,191,36,0.08))",
    secondary: "linear-gradient(45deg, rgba(251,191,36,0.15), rgba(14,165,233,0.25))",
    accent: "radial-gradient(circle at 30% 30%, rgba(251,191,36,0.3), transparent 50%)",
  },
  {
    primary: "linear-gradient(135deg, rgba(14,165,233,0.25), rgba(99,102,241,0.15), rgba(14,165,233,0.08))",
    secondary: "linear-gradient(45deg, rgba(14,165,233,0.15), rgba(99,102,241,0.25))",
    accent: "radial-gradient(circle at 70% 20%, rgba(14,165,233,0.3), transparent 50%)",
  },
  {
    primary: "linear-gradient(135deg, rgba(16,185,129,0.25), rgba(14,165,233,0.15), rgba(16,185,129,0.08))",
    secondary: "linear-gradient(45deg, rgba(16,185,129,0.15), rgba(14,165,233,0.25))",
    accent: "radial-gradient(circle at 20% 70%, rgba(16,185,129,0.3), transparent 50%)",
  },
  {
    primary: "linear-gradient(135deg, rgba(139,92,246,0.25), rgba(251,191,36,0.15), rgba(139,92,246,0.08))",
    secondary: "linear-gradient(45deg, rgba(139,92,246,0.15), rgba(251,191,36,0.25))",
    accent: "radial-gradient(circle at 80% 80%, rgba(139,92,246,0.3), transparent 50%)",
  },
];

export default function ExperienceTimeline() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.9", "end 0.1"],
  });
  const location = useLocation();

  return (
    <section id="experience" className="relative overflow-hidden py-20 bg-slate-50" ref={sectionRef}>
      {/* 主背景 - 多層漸層營造深度感（完全沿用你的動畫數值） */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {/* 基礎漸層背景 */}
        <motion.div
          className="absolute inset-0 opacity-60"
          style={{
            background:
              "linear-gradient(135deg, rgba(251,191,36,0.08), rgba(14,165,233,0.12), rgba(139,92,246,0.08), rgba(16,185,129,0.10))",
            backgroundSize: "400% 400%",
          }}
          animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />

        {/* 角落裝飾光暈 */}
        <motion.div
          className="absolute -top-32 -left-32 h-96 w-96 rounded-full blur-3xl opacity-40"
          style={{
            background: "radial-gradient(circle, rgba(251,191,36,0.4), rgba(14,165,233,0.2), transparent)",
          }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/3 -right-32 h-[32rem] w-[32rem] rounded-full blur-3xl opacity-40"
          style={{
            background: "radial-gradient(circle, rgba(139,92,246,0.4), rgba(16,185,129,0.2), transparent)",
          }}
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* 浮動粒子效果 */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full blur-sm"
            style={{ left: `${20 + i * 15}%`, top: `${30 + i * 10}%` }}
            animate={{ y: [-20, 20, -20], x: [-10, 10, -10], opacity: [0.2, 0.8, 0.2] }}
            transition={{ duration: 6 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          經歷時間軸
        </motion.h2>

        <div className="relative mt-10">
          {/* 中線底色 */}
          <div className="absolute left-1/2 top-0 bottom-0 -ml-px w-px bg-slate-300 hidden md:block" />

          {/* 中線進度條（跟隨滾動填滿） */}
          <motion.div
            style={{ scaleY: scrollYProgress }}
            className="origin-top absolute left-1/2 top-0 -ml-[2px] w-[3px] hidden md:block rounded-full"
            initial={{ background: "linear-gradient(to bottom, #f59e0b, #0ea5e9)" }}
            animate={{
              background: [
                "linear-gradient(to bottom, #f59e0b, #0ea5e9)",
                "linear-gradient(to bottom, #0ea5e9, #8b5cf6)",
                "linear-gradient(to bottom, #8b5cf6, #10b981)",
                "linear-gradient(to bottom, #10b981, #f59e0b)",
              ],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />

          <ul className="space-y-16">
            {TIMELINE.map((item, idx) => {
              const left = idx % 2 === 0;
              const d = DOTS[idx % DOTS.length];
              const gradients = ENHANCED_GRADS[idx % ENHANCED_GRADS.length];

              const to = (item as any).href ?? `/experience/${(item as any).slug}`;
              const isExternal = Boolean((item as any).href);

              return (
                <li key={`${item.title}-${idx}`} className="relative md:grid md:grid-cols-2 md:gap-10">
                  {/* 多層漸層背景（半幅 panel；完全沿用你的動畫數值） */}
                  <div
                    className={[
                      "pointer-events-none absolute -z-10 top-6 bottom-6 rounded-[32px]",
                      "left-0 right-0 md:mx-0",
                      left ? "md:left-0 md:right-1/2 md:mr-10" : "md:left-1/2 md:right-0 md:ml-10",
                    ].join(" ")}
                  >
                    {/* 主要漸層 */}
                    <motion.div
                      className="absolute inset-0 rounded-[32px]"
                      style={{ background: gradients.primary, backgroundSize: "300% 300%" }}
                      animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                      transition={{ duration: 15 + idx * 2, repeat: Infinity, ease: "linear" }}
                    />
                    {/* 次要漸層 */}
                    <motion.div
                      className="absolute inset-0 rounded-[32px]"
                      style={{ background: gradients.secondary, backgroundSize: "200% 200%" }}
                      animate={{
                        backgroundPosition: ["100% 0%", "0% 100%", "100% 0%"],
                        opacity: [0.7, 1, 0.7],
                      }}
                      transition={{ duration: 12 + idx, repeat: Infinity, ease: "easeInOut" }}
                    />
                    {/* 強調漸層 */}
                    <motion.div
                      className="absolute inset-0 rounded-[32px]"
                      style={{ background: gradients.accent, backgroundSize: "150% 150%" }}
                      animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"], scale: [1, 1.05, 1] }}
                      transition={{ duration: 8 + idx * 0.5, repeat: Infinity, ease: "easeInOut" }}
                    />

                    {/* 進場（panel 的淡入放大） */}
                    <motion.div
                      className="absolute inset-0 rounded-[32px] bg-white/10"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: false, amount: 0.3 }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: idx * 0.1 }}
                    />
                  </div>

                  {/* 節點圓點（增強光暈效果） */}
                  <span className="hidden md:block absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-20">
                    <motion.span
                      className="relative flex h-6 w-6"
                      whileInView={{ scale: [0, 1.2, 1] }}
                      viewport={{ once: false }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                      <motion.span
                        className={`absolute inline-flex h-full w-full rounded-full ${d.ping}`}
                        animate={{ scale: [1, 2, 1], opacity: [0.6, 0, 0.6] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                      />
                      <motion.span
                        className={`relative inline-flex rounded-full h-6 w-6 ${d.dot} ring-4 ${d.ring} shadow-lg`}
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                      />
                    </motion.span>
                  </span>

                  {/* 卡片可點（用 group 讓箭頭有 group-hover） */}
                  {isExternal ? (
                    <a
                      href={to}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={[
                        left ? "md:col-start-1 md:pr-10" : "md:col-start-2 md:pl-10",
                        "group block focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 rounded-2xl",
                      ].join(" ")}
                    >
                      <CardBody idx={idx} left={left} item={item} isExternal />
                    </a>
                  ) : (
                    <Link
                      to={to}
                      state={{ background: location }} // 給 Overlay 模式使用；若沒用 overlay 也不影響
                      className={[
                        left ? "md:col-start-1 md:pr-10" : "md:col-start-2 md:pl-10",
                        "group block focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 rounded-2xl",
                      ].join(" ")}
                    >
                      <CardBody idx={idx} left={left} item={item} />
                    </Link>
                  )}

                  {/* 對側占位（維持左右交錯排版） */}
                  <div
                    className={left ? "hidden md:block md:col-start-2" : "hidden md:block md:col-start-1"}
                    aria-hidden="true"
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

/** 把卡片內容抽成子元件，方便重複使用（保留你原動畫數值） */
function CardBody({
  idx,
  left,
  item,
  isExternal = false,
}: {
  idx: number;
  left: boolean;
  item: any;
  isExternal?: boolean;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: false, amount: 0.28 }}
      whileHover={{ y: -8, scale: 1.02, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: idx * 0.1 }}
      className={[
        "relative bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-white/50 shadow-lg transition-all duration-300 z-10",
        left ? "md:col-start-1 md:pr-10" : "md:col-start-2 md:pl-10",
      ].join(" ")}
    >
      <motion.div
        className="text-xs uppercase tracking-widest text-slate-500 font-semibold"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2 + idx * 0.1 }}
      >
        {item.period}
      </motion.div>

      <motion.h3
        className="text-2xl font-bold mt-2 text-slate-800"
        initial={{ opacity: 0, x: left ? -20 : 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 + idx * 0.1 }}
      >
        {item.title}
      </motion.h3>

      {item.company && (
        <motion.div
          className="text-sm text-slate-600 font-medium"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 + idx * 0.1 }}
        >
          {item.company}
        </motion.div>
      )}

      <motion.p
        className="mt-4 text-slate-700 leading-relaxed"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5 + idx * 0.1 }}
      >
        {item.summary}
      </motion.p>

      {!!item.tags?.length && (
        <motion.div
          className="mt-6 flex flex-wrap gap-2"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 + idx * 0.1 }}
        >
          {item.tags.map((tag: string, tagIdx: number) => (
            <motion.span
              key={tag}
              className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 rounded-full border border-slate-300/50 hover:from-slate-200 hover:to-slate-300 transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 + idx * 0.1 + tagIdx * 0.05, duration: 0.3 }}
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>
      )}

      {/* 右對齊 CTA（整卡可點；箭頭用 group-hover） */}
      <div className="mt-6 flex justify-end">
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-sky-700/90">
          {isExternal ? "前往連結" : "閱讀詳情"}
          <svg
            className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12h14" />
            <path d="M12 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </motion.article>
  );
}
