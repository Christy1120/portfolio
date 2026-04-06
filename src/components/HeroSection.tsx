//src/components/HeroSection.tsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import ColorBends from "./ColorBends"; // 確保路徑正確

// 🌟 定義通用的浮出動畫
const fadeInUpVariants = {
  initial: { opacity: 0, y: 30, filter: "blur(4px)" },
  animate: (delay: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { 
      duration: 1.2, 
      delay: delay, 
      ease: [0.22, 1, 0.36, 1] 
    },
  }),
};

export default function Hero() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-[#050A10] overflow-hidden">
      
      {/* 🌟 WebGL ColorBends 背景 (修復版) */}
      <div className="absolute inset-0 z-0 h-full w-full"> 
        <ColorBends 
          // 使用粉色、深粉、極深藍黑的組合，創造科技感
          colors={["#f472b6","#cbabffff","#abf0ffff",]} 
          rotation={135}      // 斜向流動更有動感
          speed={0.15}        // 慢速流動更有質感
          scale={1.2}         // 稍微放大減少碎裂感
          frequency={1.5}     // 增加波紋頻率
          warpStrength={1.2}  // 增加扭曲力道
          mouseInfluence={0.5} 
          parallax={0.3}
          noise={0.05}        // 微量噪點增加膠捲感
          transparent={false} // 💡 重要：先設為 false 確保看得到底色渲染
          autoRotate={0.2}    // 讓它緩慢自轉
        />
      </div>

      {/* 🌟 主要內容區 */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        
       

        {/* 1. 大標題 */}
        <motion.h1 
          variants={fadeInUpVariants}
          custom={0.2}
          initial="initial"
          animate="animate"
          className="text-7xl md:text-8xl lg:text-9xl font-extrabold text-white tracking-tighter leading-none mb-4"
        >
          Hi I'm <br className="block sm:hidden" />
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-pink-400 via-white to-pink-600 drop-shadow-[0_0_30px_rgba(236,72,153,0.4)]">
            Kai Ting
          </span>
        </motion.h1>

        {/* 2. 副標題 */}
        <motion.p 
          variants={fadeInUpVariants}
          custom={0.4}
          initial="initial"
          animate="animate"
          className="text-lg md:text-xl text-pink-100/60 font-light tracking-[0.3em] uppercase mb-12"
        >
          Data-driven Project Builder
        </motion.p>

        {/* 3. 按鈕區 */}
        <motion.div 
          variants={fadeInUpVariants}
          custom={0.6}
          initial="initial"
          animate="animate"
          className="flex flex-col items-center gap-4"
        >
          {/*<button
            onClick={() => setIsResumeOpen(true)}
            className="group relative px-10 py-4 overflow-hidden rounded-full bg-white text-black font-bold tracking-widest transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <span className="relative z-10">VIEW RESUME</span>
            <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="absolute -inset-1 bg-pink-500 rounded-full blur opacity-20 group-hover:opacity-60 transition duration-300" />
          </button>*/}
          
          <span className="text-[10px] font-mono text-white/30 tracking-widest animate-pulse">
            SCROLL TO EXPLORE // ↓
          </span>
        </motion.div>
      </div>

      {/* 🌟 履歷 Lightbox */}
      <AnimatePresence>
        {isResumeOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 md:p-10"
            onClick={() => setIsResumeOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 40, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 40, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 100 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl h-full max-h-[90vh] bg-[#050A10] border border-pink-500/50 rounded-lg shadow-[0_0_80px_rgba(236,72,153,0.2)] overflow-hidden flex flex-col"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-pink-500/20 bg-[#0A111A]">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
                  <h3 className="text-sm font-mono text-pink-500 uppercase tracking-widest">
                    Document_Viewer.exe
                  </h3>
                </div>
                <button
                  onClick={() => setIsResumeOpen(false)}
                  className="p-2 text-white/50 hover:text-pink-500 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 w-full bg-[#111111]">
                <iframe 
                  src="/Resume_final.pdf#view=FitH" 
                  className="w-full h-full border-none grayscale hover:grayscale-0 transition-all duration-700"
                  title="Kai Ting Resume"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}