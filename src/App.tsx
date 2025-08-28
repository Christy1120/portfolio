// src/App.tsx
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Home from "./pages/Home";
import ExperienceDetail from "./pages/ExperienceDetail";
import ExperienceDetailOverlay from "./pages/ExperienceDetailOverlay";
import Portfolio from "./pages/Portfolio";
import ProjectDetail from "./pages/ProjectDetail";

const pageVariants = {
  initial: { opacity: 0, y: 12, filter: "blur(4px)" },
  in: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
  },
  out: {
    opacity: 0,
    y: -12,
    filter: "blur(4px)",
    transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function App() {
  const location = useLocation();
  const state = location.state as { background?: Location } | undefined;
  const background = state?.background;

  return (
    <>
      {/* 底層主路由（若有 background，這裡用 background 當 location，保持首頁不卸載） */}
      <AnimatePresence mode="wait">
        <motion.main
          key={(background || location).pathname}
          variants={pageVariants}
          initial="initial"
          animate="in"
          exit="out"
        >
          <Routes location={background || location}>
            <Route path="/" element={<Home />} />
            <Route path="/experience/:slug" element={<ExperienceDetail />} />
            <Route path="/project/:slug" element={<ProjectDetail />} />
            <Route path="/portfolio" element={<Portfolio />} />
          </Routes>
        </motion.main>
      </AnimatePresence>

      {/* 若有 background，代表是從列表點開的 → 顯示覆蓋層詳情 */}
      <AnimatePresence>
        {background && (
          <Routes>
            <Route
              path="/experience/:slug"
              element={<ExperienceDetailOverlay />}
            />
          </Routes>
        )}
      </AnimatePresence>
    </>
  );
}
