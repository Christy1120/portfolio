// src/components/ArchitectureDiagram.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRightLeft, ArrowDown } from 'lucide-react';

const nodes = [
  {
    id: 'react',
    title: 'React',
    subtitle: 'Frontend & Data Import',
    icon: (
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="-11.5 -10.23174 23 20.46348" 
        className="w-10 h-10 mb-3" 
        fill="currentColor"
      >
        <circle cx="0" cy="0" r="2.05" fill="currentColor"/>
        <g stroke="currentColor" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2"/>
          <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
          <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
        </g>
      </svg>
    ),
    color: 'text-pink-500', 
    borderColor: 'border-pink-500',
    shadow: 'shadow-[0_0_15px_rgba(236,72,153,0.3)]',
    desc: 'Acts as the frontend framework. Handles direct user data imports (e.g., CSV/Excel) for Phase 1, and creates a responsive UI to visualize the processed results seamlessly.',
  },
  {
    id: 'flask',
    title: 'Flask',
    subtitle: 'Backend & Processing',
    icon: (
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        className="w-10 h-10 mb-3" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <path d="M9 3h6v4l4 10v4H5v-4l4-10z" />
        <path d="M9 13h6" />
        <path d="M12 3v18" />
      </svg>
    ),
    color: 'text-purple-500', 
    borderColor: 'border-purple-500',
    shadow: 'shadow-[0_0_15px_rgba(168,85,247,0.3)]',
    desc: 'Serves as the core data engine. Synchronously receives the uploaded dataset, executes Python data cleaning and computation in-memory, and sends the output back to the UI.',
  }
];

const ArchitectureDiagram: React.FC = () => {
  const [activeNode, setActiveNode] = useState(nodes[0]); // 預設亮起第一個節點

  return (
    <div className="w-full my-12 relative overflow-visible">

      <h4 className="text-center text-sm font-mono tracking-widest text-gray-400 mb-10 uppercase">
        Phase 1 Architecture Flow
      </h4>

      {/* 節點互動區 */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-12 relative z-10">
        {nodes.map((node, index) => {
          const isActive = activeNode.id === node.id;
          return (
            <React.Fragment key={node.id}>
              {/* 節點卡片 */}
              <motion.button
                onClick={() => setActiveNode(node)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative flex flex-col items-center justify-center p-6 w-full md:w-56 rounded-xl border transition-all duration-300 ${
                  isActive 
                    ? `${node.borderColor} bg-white/[0.05] ${node.shadow}` 
                    : 'border-white/10 bg-black/50 hover:border-white/30 text-gray-500'
                }`}
              >
                <div className={`${isActive ? node.color : 'text-gray-500'} transition-colors duration-300`}>
                  {node.icon}
                </div>
                <span className={`font-bold tracking-wide ${isActive ? 'text-white' : 'text-gray-400'}`}>
                  {node.title}
                </span>
                <span className="text-xs font-mono mt-1 opacity-70">
                  {node.subtitle}
                </span>
              </motion.button>

              {/* 箭頭連接線 (只在第一個節點後面顯示) */}
              {index === 0 && (
                <div className="text-gray-600 flex items-center justify-center">
                  <ArrowRightLeft className="w-8 h-8 hidden md:block" />
                  <ArrowDown className="w-8 h-8 md:hidden" />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* 動態說明面板 */}
      <div className="relative min-h-[120px] bg-black/40 border border-white/5 rounded-xl p-6 overflow-hidden max-w-2xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeNode.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="relative z-10"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-2 h-2 rounded-full bg-current ${activeNode.color}`} />
              <h5 className="text-white font-bold text-lg">{activeNode.title} Role</h5>
            </div>
            <p className="text-gray-300 leading-relaxed text-sm md:text-base">
              {activeNode.desc}
            </p>
          </motion.div>
        </AnimatePresence>
        
        {/* 面板背景動態漸層 */}
        <div className={`absolute -bottom-10 -right-10 w-40 h-40 rounded-full blur-3xl opacity-[0.15] transition-colors duration-500 bg-current ${activeNode.color}`} />
      </div>
    </div>
  );
};
 
export default ArchitectureDiagram;