// src/pages/ExperienceDetailOverlay.tsx
import React, { useEffect, useRef, useState, Suspense } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { TIMELINE } from "../data/timeline";

/** ===================== 背景樣式 ===================== */
const BACKDROP = {
  primary: `
    radial-gradient(ellipse 120% 80% at 50% 0%, rgba(248,250,252,0.8) 0%, rgba(241,245,249,0.7) 40%, transparent 100%),
    linear-gradient(135deg, rgba(251,191,36,0.15) 0%, rgba(14,165,233,0.12) 50%, rgba(168,85,247,0.08) 100%),
    linear-gradient(45deg, rgba(251,191,36,0.06), transparent 60%)
  `,
  accent: `
    radial-gradient(circle at 25% 25%, rgba(251,191,36,0.2), transparent 40%),
    radial-gradient(circle at 75% 75%, rgba(14,165,233,0.15), transparent 40%)
  `,
  noise: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E")`
};

/** ===================== 動畫參數 ===================== */
const animations = {
  backdrop: {
    initial: { opacity: 0, backdropFilter: "blur(0px)" as any },
    animate: {
      opacity: 1,
      backdropFilter: "blur(8px)" as any,
      transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }
    },
    exit: {
      opacity: 0,
      backdropFilter: "blur(0px)" as any,
      transition: { duration: 0.3, ease: [0.4, 0, 1, 1] }
    }
  },
  modal: {
    initial: { opacity: 0, y: 40, scale: 0.94, rotateX: 4, filter: "blur(4px) brightness(0.9)" },
    animate: {
      opacity: 1, y: 0, scale: 1, rotateX: 0, filter: "blur(0px) brightness(1)",
      transition: { type: "spring", damping: 25, stiffness: 300, mass: 0.8, duration: 0.6 }
    },
    exit: { opacity: 0, y: -20, scale: 0.96, rotateX: -2, filter: "blur(2px) brightness(0.95)", transition: { duration: 0.25, ease: [0.4, 0, 1, 1] } }
  },
  content: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { delay: 0.15, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } }
  },
  button: {
    rest: { scale: 1, rotate: 0 },
    hover: { scale: 1.05, rotate: 90, transition: { type: "spring", stiffness: 400, damping: 10 } },
    tap: { scale: 0.95 }
  }
};

/** ===================== Body 鎖定（開啟 Overlay 時） ===================== */
function useLockBody(lock: boolean) {
  useEffect(() => {
    if (!lock) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [lock]);
}

/** ===================== Header 縮放參數 ===================== */
const HEADER_LARGE = 152;
const HEADER_SMALL = 88;
const SCROLL_THRESHOLD = 48;

/** ===================== 詳情頁註冊（可輕鬆擴充） ===================== */
// 懶載入（code splitting）
const DataAnalysisInternDetail = React.lazy(() => import("./experience-details/DataAnalysisInternDetail"));
const MetaverseResearcherDetail = React.lazy(() => import("./experience-details/MetaverseResearcherDetail"));
// 之後新增頁面：照這樣加一行即可
// const NewPageDetail = React.lazy(() => import("./experience-details/NewPageDetail"));

const DETAIL_REGISTRY: Record<string, React.LazyExoticComponent<React.ComponentType>> = {
  "data-analysis": DataAnalysisInternDetail,
  "metaverse-researcher": MetaverseResearcherDetail,
  // "new-page-slug": NewPageDetail,
};

const normalize = (s?: string) => (s || "").trim().toLowerCase();

/** ===================== Loading 與 NotFound ===================== */
function Loading() {
  return (
    <div className="p-10 flex items-center justify-center">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-slate-300 border-t-[#FABC00]" />
      <span className="ml-3 text-slate-600">Loading…</span>
    </div>
  );
}

function NotFound({ slug }: { slug?: string }) {
  return (
    <div className="p-12 text-center text-slate-600">
      <p className="text-lg font-semibold">Oops — 這個經歷尚未對應元件</p>
      <p className="mt-1 text-sm">
        slug:{" "}
        <code className="px-2 py-1 rounded bg-slate-100">{slug}</code>
      </p>
      <p className="mt-3 text-sm">
        請到 <span className="font-mono">DETAIL_REGISTRY</span> 註冊或檢查 <span className="font-mono">TIMELINE</span> 的 slug。
      </p>
    </div>
  );
}

/** ===================== 主元件 ===================== */
export default function ExperienceDetailOverlay() {
  const nav = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const key = normalize(slug);

  // 從 TIMELINE 撈對應資料（大小寫無關）
  const item = TIMELINE.find((x) => normalize(x.slug) === key);

  // 找對應的詳情頁元件
  const DetailComponent = DETAIL_REGISTRY[key];

  const [scrolled, setScrolled] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useLockBody(true);

  // 監聽 ESC & 內容區捲動
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && nav(-1);
    window.addEventListener("keydown", onKey);

    const el = scrollRef.current;
    const onScroll = () => el && setScrolled(el.scrollTop > SCROLL_THRESHOLD);
    el?.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("keydown", onKey);
      el?.removeEventListener("scroll", onScroll);
    };
  }, [nav]);

  // Header 顯示的安全值（即使 TIMELINE 還沒補，也不會空白）
  const period = item?.period || "";
  const title  = item?.title  || (slug ? slug.replace(/-/g, " ") : "Detail");
  const company = item?.company || "";

  return (
    <AnimatePresence mode="wait">
      {/* 背景遮罩（點擊關閉） */}
      <motion.div
        className="fixed inset-0 z-[100]"
        style={{ background: `${BACKDROP.primary}, ${BACKDROP.noise}`, backgroundBlendMode: "multiply, normal" }}
        variants={animations.backdrop}
        initial="initial"
        animate="animate"
        exit="exit"
        onClick={() => nav(-1)}
        aria-hidden
      >
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: BACKDROP.accent }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        />
      </motion.div>

      {/* Overlay 內容（點擊不關閉） */}
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="overlay-title"
        className="fixed inset-0 z-[101] flex items-center justify-center p-3 md:p-6"
        variants={animations.modal}
        initial="initial"
        animate="animate"
        exit="exit"
        onClick={(e) => e.stopPropagation()}
        style={{ perspective: "1000px" }}
      >
        <motion.article
          className="w-full h-full max-w-none max-h-none md:w-[95vw] md:h-[90vh] md:max-w-[1400px] md:max-h-[900px]
                     bg-white/95 backdrop-blur-3xl rounded-3xl
                     shadow-[0_32px_128px_rgba(2,6,23,0.25),0_8px_32px_rgba(2,6,23,0.1)]
                     border border-white/80 overflow-hidden flex flex-col"
          layoutId={`experience-${key}`}
        >
          {/* Header（高度過渡 + 左邊界不漂移） */}
          <motion.header
            className="sticky top-0 z-20 w-full border-b border-slate-200/70 bg-white/80"
            animate={{
              height: scrolled ? HEADER_SMALL : HEADER_LARGE,
              backdropFilter: scrolled ? "blur(12px) saturate(1.05)" : "blur(6px) saturate(1)",
              boxShadow: scrolled ? "0 10px 30px rgba(2,6,23,0.06)" : "0 8px 24px rgba(2,6,23,0.04)",
            }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
          >
            <div className="h-full flex items-center justify-between px-6 md:px-12">
              {/* 左側群組（縮放，不漂移） */}
              <motion.div
                className="flex flex-col items-start"
                animate={{ scale: scrolled ? 0.86 : 1, y: scrolled ? -2 : 0 }}
                transition={{ type: "spring", stiffness: 320, damping: 26 }}
                style={{ transformOrigin: "left center", willChange: "transform" }}
              >
                {period && (
                  <div
                    className="uppercase tracking-[0.3em] text-slate-500/90 font-bold leading-none"
                    style={{ fontSize: 12 }}
                  >
                    {period}
                  </div>
                )}

                <h1
                  id="overlay-title"
                  className="font-black text-slate-900 leading-[1.05] mt-1"
                  style={{ fontSize: 40 }}
                >
                  {title}
                </h1>

                {company && (
                  <p
                    className="text-slate-600/90 font-medium leading-none mt-2"
                    style={{ fontSize: 15 }}
                  >
                    {company}
                  </p>
                )}
              </motion.div>

              {/* Close Button */}
              <motion.button
                onClick={() => nav(-1)}
                className="flex-shrink-0 rounded-2xl bg-white/80 hover:bg-white
                          backdrop-blur-xl border border-white/60 shadow-lg
                          flex items-center justify-center text-slate-700 font-light"
                variants={animations.button}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
                aria-label="關閉詳情"
                animate={{ width: scrolled ? 40 : 52, height: scrolled ? 40 : 52, fontSize: scrolled ? 16 : 18 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
              >
                ✕
              </motion.button>
            </div>
          </motion.header>

          {/* 可滾動內容區：監聽這裡的 scroll */}
          <motion.div
            ref={scrollRef}
            className="flex-1 overflow-y-auto"
            variants={animations.content}
            initial="initial"
            animate="animate"
          >
            <Suspense fallback={<Loading />}>
              {DetailComponent ? <DetailComponent /> : <NotFound slug={slug} />}
            </Suspense>
          </motion.div>
        </motion.article>
      </motion.div>
    </AnimatePresence>
  );
}
