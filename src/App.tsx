// src/App.tsx
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Nav from "./components/Nav"; 
import Home from "./pages/Home";
import ProjectDetail from "./pages/ProjectDetail"; 
import UI_UX_Revamp from "./pages/UI_UX_Revamp";
import Data_Analysis from "./pages/Data_Analysis";
import Ai_Aent from "./pages/Ai_Aent";
import Web3toon from './pages/Web3toon';
import RosePestAI from './pages/RosePestAI';
import NSTC_Metaverse from './pages/NSTC_Metaverse'
import ScrollToTop from './components/ScrollToTop';
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

  // [ SYSTEM // NAV CONTROL ]: 定義不需要顯示導覽列的路徑
  const hideNavPaths = [
    "/project/UI_UX_Revamp",
    "/project/Data_Analysis",
    "/project/Ai_Aent",
    "/project/Web3toon",
    "/project/RosePestAI",
    "/project/NSTC_Metaverse"
  ];

  // 檢查目前路徑是否在黑名單中
  const shouldShowNav = !hideNavPaths.includes(location.pathname);

  return (
    <>
    <ScrollToTop />
      {/* [ SYSTEM // LOGIC ]: 
         只有在非客製化頁面時才渲染 Nav。
         這能確保沉浸式頁面（如 Data_Analysis）擁有完全的視覺控制權。
      */}
      {shouldShowNav && <Nav />}

      <AnimatePresence mode="wait">
        <motion.main
          key={(background || location).pathname}
          variants={pageVariants}
          initial="initial"
          animate="in"
          exit="out"
          className="relative min-h-screen bg-[#050A10] text-zinc-300 selection:bg-[#f472b6] selection:text-white overflow-clip" 
        >
          <Routes location={background || location}>
            <Route path="/" element={<Home />} />
            
            {/* 客製化專案頁面 */}
            <Route path="/project/Data_Analysis" element={<Data_Analysis />} />
            <Route path="/project/UI_UX_Revamp" element={<UI_UX_Revamp />} />
            <Route path="/project/Ai_Aent" element={<Ai_Aent />} />
            <Route path="/project/Web3toon" element={<Web3toon />} />
            <Route path="/project/RosePestAI" element={<RosePestAI />} />
            <Route path="/project/NSTC_Metaverse" element={<NSTC_Metaverse />} />
            
            {/* 公版專案頁面 */}
            <Route path="/project/:slug" element={<ProjectDetail />} />
          </Routes>
        </motion.main>
      </AnimatePresence>

      <AnimatePresence>
        {background && (
          <Routes>
            <Route path="/experience/:slug" element={<></>} />
          </Routes>
        )}
      </AnimatePresence>
    </>
  );
}