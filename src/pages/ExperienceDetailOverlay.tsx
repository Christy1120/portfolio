import React, { useEffect, useRef, useState, Suspense } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { TIMELINE } from "../data/timeline";

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

const animations = {
  backdrop: {
    initial: { opacity: 0, scale: 1 },
    animate: {
      opacity: 1,
      scale: 1,
      backdropFilter: "blur(8px)",
      transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }
    },
    exit: {
      opacity: 0,
      scale: 0.98,
      backdropFilter: "blur(0px)",
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

function useLockBody(lock: boolean) {
  useEffect(() => {
    if (!lock) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [lock]);
}

const HEADER_LARGE = 152;
const HEADER_SMALL = 88;
const SCROLL_THRESHOLD = 48;

const DataAnalysisInternDetail = React.lazy(() => import("./experience-details/DataAnalysisInternDetail"));
const MetaverseResearcherDetail = React.lazy(() => import("./experience-details/MetaverseResearcherDetail"));
const StudentResearch = React.lazy(() => import("./experience-details/StudentResearch"));

const DETAIL_REGISTRY: Record<string, React.LazyExoticComponent<React.ComponentType>> = {
  "data-analysis": DataAnalysisInternDetail,
  "metaverse-researcher": MetaverseResearcherDetail,
  "student-research": StudentResearch
};

const normalize = (s?: string) => (s || "").trim().toLowerCase();

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
        slug: <code className="px-2 py-1 rounded bg-slate-100">{slug}</code>
      </p>
    </div>
  );
}

export default function ExperienceDetailOverlay() {
  const nav = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const key = normalize(slug);
  const item = TIMELINE.find((x) => normalize(x.slug) === key);
  const DetailComponent = DETAIL_REGISTRY[key];

  const [scrolled, setScrolled] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useLockBody(true);

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

  const period = item?.period || "";
  const title = item?.title || (slug ? slug.replace(/-/g, " ") : "Detail");
  const company = item?.company || "";

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="fixed inset-0 z-[100]"
        style={{ background: `${BACKDROP.primary}, ${BACKDROP.noise}`, backgroundBlendMode: "multiply, normal" }}
        variants={animations.backdrop}
        initial="initial"
        animate="animate"
        exit="exit"
        onClick={() => nav(-1)}
        whileTap={{ scale: 0.985 }}
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

      <motion.div
        role="dialog"
        aria-modal="true"
        className="fixed inset-0 z-[101] flex items-center justify-center p-3 md:p-6"
        variants={animations.modal}
        initial="initial"
        animate="animate"
        exit="exit"
        style={{ perspective: "1000px" }}
        onClick={() => nav(-1)}
      >
        <motion.article
          onClick={(e) => e.stopPropagation()}
          className="w-full h-full max-w-none max-h-none md:w-[95vw] md:h-[90vh] md:max-w-[1400px] md:max-h-[900px] bg-white/95 backdrop-blur-3xl rounded-3xl shadow-[0_32px_128px_rgba(2,6,23,0.25),0_8px_32px_rgba(2,6,23,0.1)] border border-white/80 overflow-hidden flex flex-col"
          layoutId={`experience-${key}`}
        >
          <motion.header
            className="sticky top-0 z-20 w-full border-b border-slate-200/70 bg-white/80"
            animate={{
              height: scrolled ? HEADER_SMALL : HEADER_LARGE,
              backdropFilter: scrolled ? "blur(12px) saturate(1.05)" : "blur(6px) saturate(1)",
              boxShadow: scrolled ? "0 10px 30px rgba(2,6,23,0.06)" : "0 8px 24px rgba(2,6,23,0.04)"
            }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
          >
            <div className="h-full flex items-center justify-between px-6 md:px-12">
              <motion.div
                className="flex flex-col items-start"
                animate={{ scale: scrolled ? 0.86 : 1, y: scrolled ? -2 : 0 }}
                transition={{ type: "spring", stiffness: 320, damping: 26 }}
                style={{ transformOrigin: "left center", willChange: "transform" }}
              >
                {period && (
                  <div className="uppercase tracking-[0.3em] text-slate-500/90 font-bold leading-none" style={{ fontSize: 12 }}>{period}</div>
                )}
                <h1 id="overlay-title" className="font-black text-slate-900 leading-[1.05] mt-1" style={{ fontSize: 40 }}>{title}</h1>
                {company && (
                  <p className="text-slate-600/90 font-medium leading-none mt-2" style={{ fontSize: 15 }}>{company}</p>
                )}
              </motion.div>
              <motion.button
                onClick={() => nav(-1)}
                className="flex-shrink-0 rounded-2xl bg-white/80 hover:bg-white backdrop-blur-xl border border-white/60 shadow-lg flex items-center justify-center text-slate-700 font-light"
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
