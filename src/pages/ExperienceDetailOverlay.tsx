// src/pages/ExperienceDetailOverlay.tsx
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { TIMELINE } from "../data/timeline";

// 鎖住 body 捲動（開 overlay 時避免底層滾動）
function useLockBody(lock: boolean) {
  useEffect(() => {
    if (!lock) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [lock]);
}

export default function ExperienceDetailOverlay() {
  const nav = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const item = TIMELINE.find(x => x.slug === slug);

  useLockBody(true);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && nav(-1);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [nav]);

  if (!item) return null;

  return (
    <AnimatePresence>
      {/* 背景遮罩 */}
      <motion.div
        className="fixed inset-0 z-[100] bg-black/40"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={() => nav(-1)}
      />
      {/* 內容卡片（阻止冒泡） */}
      <motion.div
        className="fixed inset-0 z-[101] flex items-start md:items-center justify-center p-4 md:p-8"
        initial={{ opacity: 0, y: 24, scale: 0.98, filter: "blur(4px)" }}
        animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: 12, scale: 0.98, filter: "blur(4px)" }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <article className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl border overflow-hidden">
          <header className="px-6 py-4 border-b flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-widest text-slate-500 font-semibold">{item.period}</div>
              <h1 className="text-2xl font-bold">{item.title}</h1>
              {item.company && <p className="text-slate-600">{item.company}</p>}
            </div>
            <button
              onClick={() => nav(-1)}
              className="h-9 px-3 rounded-md border hover:bg-slate-50"
              aria-label="關閉"
            >
              ✕
            </button>
          </header>

          <div className="px-6 py-6 space-y-4">
            <p className="text-slate-700 leading-relaxed">{item.summary}</p>
            <div className="flex flex-wrap gap-2">
              {item.tags.map(t => (
                <span key={t} className="px-3 py-1 text-xs font-medium bg-slate-100 text-slate-700 rounded-full border">{t}</span>
              ))}
            </div>

            {/* 內容雛形，可以放成果、KPI、圖片 */}
            <section className="pt-4 space-y-2">
              <h2 className="font-semibold">我做了什麼</h2>
              <ul className="list-disc pl-5 text-slate-700 space-y-1">
                <li>拆解需求、定義成功指標，規劃里程碑</li>
                <li>協作設計/工程落地 MVP，建立追蹤數據</li>
                <li>以數據驗證假設，持續迭代體驗與性能</li>
              </ul>
            </section>
          </div>
        </article>
      </motion.div>
    </AnimatePresence>
  );
}
