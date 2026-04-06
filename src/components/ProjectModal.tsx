import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Activity } from 'lucide-react';

interface ProjectModalProps {
  activeProject: any | null;
  setActiveProject: (project: any | null) => void;
}

export default function ProjectModal({ activeProject, setActiveProject }: ProjectModalProps) {
  
  // 處理 Scrollbar Shift 與背景滾動鎖定
  useEffect(() => {
    if (activeProject) {
      // 計算滾動條寬度，補償 padding 避免畫面因 overflow: hidden 產生閃爍與偏移
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '0px';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '0px';
    };
  }, [activeProject]);

  // 使用 Portal 將 DOM 節點傳送到最外層
  const modalContent = (
    <AnimatePresence>
      {activeProject && (
        <motion.div 
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* 毛玻璃背景層 - 加深黑色比例以突顯粉色 */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={() => setActiveProject(null)}
          />

          {/* Modal 主體 - 強化亮粉色發光陰影與極致黑底色 */}
          <motion.div 
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#050505] border border-pink-500/20 rounded-2xl shadow-[0_0_30px_rgba(236,72,153,0.1)] flex flex-col scrollbar-thin scrollbar-track-transparent scrollbar-thumb-pink-500/30"
            initial={{ y: 40, scale: 0.95, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 20, scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} 
          >
            {/* 終端機風格 Header */}
            <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 border-b border-pink-500/20 bg-[#050505]/90 backdrop-blur-md">
              <div className="flex items-center gap-3">
                {/* 呼吸燈效果的粉色指示器 */}
                <motion.div 
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-3 h-3 rounded-full bg-pink-500 shadow-[0_0_10px_#ec4899]"
                />
                <span className="text-zinc-400 font-mono text-xs tracking-widest">
                  [ SYSTEM // CASE_STUDY_VIEWER ]
                </span>
              </div>
              <button 
                onClick={() => setActiveProject(null)}
                className="p-2 rounded-lg hover:bg-pink-500/10 text-zinc-500 hover:text-pink-400 transition-colors group"
              >
                <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
              </button>
            </div>

            {/* 彈窗內容區塊 */}
            <div className="p-8 md:p-12">
              <div className="flex items-center gap-2 mb-4">
                <Activity className="w-4 h-4 text-pink-500" />
                <span className="text-pink-500 font-mono text-sm tracking-wider uppercase">
                  {activeProject.company || "CONFIDENTIAL"}
                </span>
              </div>
              
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 tracking-tight">
                {activeProject.title}
              </h2>
              
              {/* 漸層分隔線 */}
              <div className="h-px w-full bg-gradient-to-r from-pink-500/60 via-pink-500/10 to-transparent mb-8"></div>

              <div className="prose prose-invert max-w-none">
                <p className="text-zinc-400 leading-relaxed text-lg font-light">
                  {activeProject.desc}
                </p>
                
                {/* 範例數據呈現：對齊 PM 重視數據的特質 */}
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-6 rounded-xl border border-pink-500/10 bg-white/[0.01] hover:bg-pink-500/[0.02] transition-colors">
                    <div className="text-pink-500 font-mono text-xs tracking-widest mb-2">METRIC_01</div>
                    <div className="text-4xl font-bold text-white mb-1">+40<span className="text-pink-500">%</span></div>
                    <div className="text-zinc-500 text-sm">Efficiency Boost</div>
                  </div>
                  {/* 可在此依據你的履歷資料新增更多數據卡片 */}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // 確保在 SSR 或是 Document 還沒準備好時不會報錯
  if (typeof document === 'undefined') return null;
  return createPortal(modalContent, document.body);
}