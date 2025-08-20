// src/pages/ExperienceDetailOverlay.tsx (優化版：更大畫面＋專業動畫)
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { TIMELINE } from "../data/timeline";

// 升級背景：更豐富的層次感與質感
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

// 專業動畫配置
const animations = {
  backdrop: {
    initial: { opacity: 0, backdropFilter: "blur(0px)" },
    animate: { 
      opacity: 1, 
      backdropFilter: "blur(8px)",
      transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }
    },
    exit: { 
      opacity: 0, 
      backdropFilter: "blur(0px)",
      transition: { duration: 0.3, ease: [0.4, 0, 1, 1] }
    }
  },
  
  modal: {
    initial: { 
      opacity: 0, 
      y: 40, 
      scale: 0.94, 
      rotateX: 4,
      filter: "blur(4px) brightness(0.9)"
    },
    animate: { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      rotateX: 0,
      filter: "blur(0px) brightness(1)",
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
        mass: 0.8,
        duration: 0.6
      }
    },
    exit: { 
      opacity: 0, 
      y: -20, 
      scale: 0.96,
      rotateX: -2,
      filter: "blur(2px) brightness(0.95)",
      transition: { 
        duration: 0.25, 
        ease: [0.4, 0, 1, 1] 
      }
    }
  },

  content: {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: 0.15, 
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  },

  button: {
    rest: { scale: 1, rotate: 0 },
    hover: { 
      scale: 1.05, 
      rotate: 90,
      transition: { type: "spring", stiffness: 400, damping: 10 }
    },
    tap: { scale: 0.95 }
  }
};

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
    <AnimatePresence mode="wait">
      {/* 升級背景遮罩：多層次漸層＋質感紋理 */}
      <motion.div
        className="fixed inset-0 z-[100]"
        style={{ 
          background: `${BACKDROP.primary}, ${BACKDROP.noise}`,
          backgroundBlendMode: "multiply, normal"
        }}
        variants={animations.backdrop}
        initial="initial"
        animate="animate"
        exit="exit"
        onClick={() => nav(-1)}
      >
        {/* 動態光影層 */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: BACKDROP.accent }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        />
      </motion.div>

      {/* 主要內容區域 */}
      <motion.div
        className="fixed inset-0 z-[101] flex items-center justify-center p-3 md:p-6"
        variants={animations.modal}
        initial="initial"
        animate="animate"
        exit="exit"
        onClick={(e) => e.stopPropagation()}
        style={{ perspective: "1000px" }}
      >
        {/* 超大尺寸卡片：佔滿螢幕90%+，極高可讀性 */}
        <motion.article 
          className="w-full h-full max-w-none max-h-none md:w-[95vw] md:h-[90vh] md:max-w-[1400px] md:max-h-[900px] bg-white/95 backdrop-blur-3xl rounded-3xl md:rounded-[32px] shadow-[0_32px_128px_rgba(2,6,23,0.25),0_8px_32px_rgba(2,6,23,0.1)] border border-white/80 overflow-hidden flex flex-col"
          layoutId={`experience-${item.slug}`}
        >
          {/* 頭部區域：更大間距與字體 */}
          <motion.header 
            className="flex-shrink-0 px-6 md:px-12 py-6 md:py-10 border-b border-white/50 bg-gradient-to-r from-white/60 to-white/40"
            variants={animations.content}
            initial="initial"
            animate="animate"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 pr-6">
                <motion.div 
                  className="text-xs md:text-sm uppercase tracking-[0.3em] text-slate-500/90 font-bold mb-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                >
                  {item.period}
                </motion.div>
                
                <motion.h1 
                  className="text-2xl md:text-5xl lg:text-6xl font-black leading-[1.1] text-slate-900 mb-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  {item.title}
                </motion.h1>
                
                {item.company && (
                  <motion.p 
                    className="text-base md:text-lg text-slate-600/90 font-medium"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.4 }}
                  >
                    {item.company}
                  </motion.p>
                )}
              </div>

              {/* 升級關閉按鈕：更大、更美觀、有動畫 */}
              <motion.button
                onClick={() => nav(-1)}
                className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white/80 hover:bg-white backdrop-blur-xl border border-white/60 shadow-lg flex items-center justify-center text-slate-700 text-lg md:text-xl font-light"
                variants={animations.button}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
                aria-label="關閉詳情"
              >
                ✕
              </motion.button>
            </div>
          </motion.header>

          {/* 內容區域：可滾動，更大字體與間距 */}
          <motion.div 
            className="flex-1 overflow-y-auto px-6 md:px-12 py-8 md:py-12 space-y-8 md:space-y-10"
            variants={animations.content}
            initial="initial"
            animate="animate"
          >
            {/* 主要描述 */}
            <motion.p 
              className="text-lg md:text-xl leading-relaxed md:leading-loose text-slate-700 font-normal"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              {item.summary}
            </motion.p>

            {/* 標籤群組：更大更美觀 */}
            {item.tags?.length ? (
              <motion.div 
                className="flex flex-wrap gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                {item.tags.map((tag, index) => (
                  <motion.span
                    key={tag}
                    className="px-4 py-2 md:px-5 md:py-3 text-sm md:text-base font-semibold rounded-2xl bg-gradient-to-r from-white/90 to-white/70 backdrop-blur-sm border border-white/60 text-slate-800 shadow-sm hover:shadow-md transition-shadow"
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.1, duration: 0.4 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </motion.div>
            ) : null}

            {/* 詳細內容區塊：更大字體與更好的層次 */}
            <motion.section 
              className="space-y-4 md:space-y-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 border-l-4 border-amber-400 pl-4">
                我做了什麼
              </h2>
              
              <ul className="space-y-3 md:space-y-4 pl-6">
                {[
                  "拆解需求、定義成功指標，規劃里程碑",
                  "協作設計/工程落地 MVP，建立追蹤數據", 
                  "以數據驗證假設，持續迭代體驗與性能"
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    className="text-base md:text-lg leading-relaxed text-slate-700 flex items-start"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.0 + index * 0.15, duration: 0.5 }}
                  >
                    <span className="inline-block w-2 h-2 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 mt-3 mr-4 flex-shrink-0"></span>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.section>
          </motion.div>
        </motion.article>
      </motion.div>
    </AnimatePresence>
  );
}