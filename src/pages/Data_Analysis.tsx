// src/pages/custom/AiModelValidation.tsx
import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  BrainCircuit, 
  Database, 
  Users, 
  Activity, 
  Terminal,
  ChevronRight,
  ChevronLeft,
  Zap,
  TrendingUp,
  MessageSquare,
  CheckCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Contact from '@/components/Contact';
import EmpathyMap from '@/components/EmpathyMap';
import ArchitectureDiagram from '@/components/ArchitectureDiagram';

gsap.registerPlugin(ScrollTrigger);

const AiModelValidation: React.FC = () => {
  const navigate = useNavigate();
  // 判斷螢幕寬度，若大於等於 768px (桌機/平板) 則預設展開，否則 (手機) 預設收合
  const [isAnchorActive, setIsAnchorActive] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 768;
    }
    return false; 
  });
  const [mounted, setMounted] = useState(false); 
  
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRefs = useRef<(HTMLElement | null)[]>([]);
  const resultCardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const coreScopes = [
    { id: "01", title: "Problem Framing", icon: <Activity className="w-6 h-6" /> },
    { id: "02", title: "Architecture Design", icon: <Database className="w-6 h-6" /> },
    { id: "03", title: "UI/UX design", icon: <Users className="w-6 h-6" /> },
    { id: "04", title: "Web App Develop", icon: <BrainCircuit className="w-6 h-6" /> }
  ];

  const resultsData = [
    {
      title: "Efficiency Gains",
      desc: "Enabled data scientists to evaluate results more efficiently, significantly cutting down manual cross-referencing work.",
      icon: <Zap className="w-6 h-6 text-pink-400" />
    },
    {
      title: "Faster Insights",
      desc: "Accelerated the process of identifying performance gaps and model improvement opportunities.",
      icon: <TrendingUp className="w-6 h-6 text-pink-500" />
    },
    {
      title: "Clearer Communication",
      desc: "Improved clarity and streamlined communication between technical and non-technical stakeholders.",
      icon: <MessageSquare className="w-6 h-6 text-pink-400" />
    },
    {
      title: "Successful Integration",
      desc: "The tool was successfully adopted by the data team as a  part of their validation workflow.",
      icon: <CheckCircle className="w-6 h-6 text-pink-500" />
    }
  ];

  useEffect(() => {
    setMounted(true); 
    const ctx = gsap.context(() => {
      contentRefs.current.forEach((el) => {
        if (el) {
          gsap.fromTo(el,
            { opacity: 0, y: 30 },
            {
              opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
              scrollTrigger: { trigger: el, start: "top 85%" }
            }
          );
        }
      });

      if (resultCardsRef.current.length > 0) {
        gsap.fromTo(resultCardsRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: resultCardsRef.current[0],
              start: "top 85%",
            }
          }
        );
      }
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const addToRefs = (el: HTMLElement | null) => {
    if (el && !contentRefs.current.includes(el)) contentRefs.current.push(el);
  };

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // 🌟 [ SYSTEM // UI_COMPONENTS ]: 換回 Pink 主題
  const FloatingUI = (
    <>
      <motion.button 
        onClick={() => navigate('/')}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="fixed top-6 left-6 z-[100] flex items-center gap-3 px-5 py-2.5 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-gray-400 hover:text-pink-400 hover:border-pink-500/50 hover:bg-pink-500/5 transition-all shadow-[0_0_15px_rgba(0,0,0,0.8)] group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="font-mono text-xs tracking-widest uppercase font-semibold">Back</span>
      </motion.button>

      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-[100] flex items-center">
        <AnimatePresence mode="wait">
          {!isAnchorActive ? (
            <motion.button
              key="open-btn"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              onClick={() => setIsAnchorActive(true)}
              className="bg-[#0a0a0a]/90 backdrop-blur-md border border-pink-500/40 border-r-0 rounded-l-xl p-2.5 shadow-[-5px_0_20px_rgba(236,72,153,0.15)] text-pink-500 hover:text-pink-300 hover:bg-pink-500/10 transition-all duration-300"
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>
          ) : (
            <motion.div
              key="menu-panel"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: -24 }} 
              exit={{ opacity: 0, x: 50 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-[#0a0a0a]/95 backdrop-blur-xl border border-pink-500/40 rounded-2xl p-6 shadow-[0_0_30px_rgba(236,72,153,0.2)] min-w-[220px]"
            >
              <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-3">
                <span className="text-xs font-mono font-bold text-pink-500 tracking-widest uppercase flex items-center gap-2">
                  Content
                </span>
                <button 
                  onClick={() => setIsAnchorActive(false)} 
                  className="text-gray-700 hover:text-pink-400 p-1 rounded-md hover:bg-pink-500/10 transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <ul className="flex flex-col gap-4 text-sm font-medium text-gray-400">
                <li onClick={() => scrollToSection('overview')} className="hover:text-pink-400 cursor-pointer transition-colors hover:translate-x-1 transform duration-200">01. Project Overview</li>
                <li onClick={() => scrollToSection('core-scope')} className="hover:text-pink-400 cursor-pointer transition-colors hover:translate-x-1 transform duration-200">02. Project Scope</li>
                <li onClick={() => scrollToSection('key-strategies')} className="hover:text-pink-400 cursor-pointer transition-colors hover:translate-x-1 transform duration-200">03. Key Strategies</li>
                <li onClick={() => scrollToSection('results')} className="hover:text-pink-400 cursor-pointer transition-colors hover:translate-x-1 transform duration-200">04. Results</li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white relative font-sans selection:bg-pink-500 selection:text-white pb-10">
      
      {mounted && createPortal(FloatingUI, document.body)}

      {/* KV 獨立背景區塊 - 套用你原版的漸層 */}
      <section 
        className="relative w-full min-h-[60vh] flex flex-col items-center justify-center pt-24 pb-16 overflow-hidden"
        style={{
          backgroundColor:'hsla(0,0%,0%,1)',
          backgroundImage:`
          radial-gradient(at 78% 11%, hsla(352,84%,82%,0.46) 0px, transparent 50%),
          radial-gradient(at 61% 38%, hsla(228,63%,70%,0.66) 0px, transparent 50%)
          `
        }}
      >
        <div className="relative z-10 text-center px-6 space-y-6 max-w-4xl mx-auto" ref={addToRefs}>
          <div className="inline-block px-4 py-1.5 border border-pink-500/50 bg-black/50 backdrop-blur-md rounded-full mb-4 shadow-[0_0_15px_rgba(236,72,153,0.2)]">
            <p className="text-xs font-mono text-pink-400 uppercase tracking-widest">
              My Role : Primary Developer | Lead UI Designer
            </p>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-white drop-shadow-lg">
            AI Model Validation Dashboard
          </h1>
          <p className="text-xl text-pink-500 font-medium tracking-wide drop-shadow-md">
            How I Engineered an Internal Process Optimization Tool
          </p>
        </div>
      </section>

      <main className="max-w-5xl mx-auto px-6 pt-16">
        
        <section id="overview" className="mb-32 grid md:grid-cols-2 gap-12 items-center" ref={addToRefs}>
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white flex items-center gap-3">
              <span className="text-pink-500 font-mono text-xl">/01</span> Project Overview
            </h2>
            <p className="text-gray-400 leading-relaxed text-lg">
               AI model validation is a complex and labor-intensive process. Due to fragmented data architectures, data scientists often spent excessive time on manual cross-referencing, which led to significant productivity loss. To solve this, data team initiated a project focused on visualizing results to turn raw data into  useful information.
            </p>
          </div>
          
          <div className="aspect-video bg-[#0a0a0a] rounded-2xl flex items-center justify-center relative overflow-hidden group shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <img 
              src="/Dashboard_Mockup.png" // 記得替換為你的圖片路徑
              alt="AI Validation Dashboard Overview" 
              className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-105 relative z-0"
            />
          </div>
        </section>

        <section id="core-scope" className="mb-32" ref={addToRefs}>
          <h2 className="text-3xl font-bold text-white mb-10 flex items-center gap-3">
             <span className="text-pink-500 font-mono text-xl">/02</span> Project Scope
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {coreScopes.map((scope, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -8, scale: 1.02 }}
                className="relative group flex flex-col p-6 border border-white/30 rounded-2xl hover:border-pink-500/60 transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(236,72,153,0.15)] overflow-hidden"
                style={{
                backgroundColor: 'hsla(300, 16%, 27%, 0.50)',
                backgroundImage: `
                  radial-gradient(at 15% 84%, hsla(351,63%,76%,0.69) 0px, transparent 50%),
                  radial-gradient(at 86% 78%, hsla(250,63%,70%,0.65) 0px, transparent 50%)
                `
              }}
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-pink-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="text-pink-500/90 font-mono text-xs mb-4">{scope.id} //</span>
                <div className="text-pink-400 mb-4 group-hover:text-pink-300 transition-colors">
                  {scope.icon}
                </div>
                <span className="font-semibold text-gray-200 mt-auto leading-tight group-hover:text-white transition-colors">
                  {scope.title}
                </span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 套用原版的排版格式與 hsla 背景 */}
        <section id="key-strategies" className="space-y-16 mb-32 max-w-4xl p-8 rounded-3xl"
        style={{
        backgroundColor: 'hsla(21,0%,0%,1)', 
        backgroundImage: `
         radial-gradient(at 57% 63%, hsla(352,84%,82%,0.31) 0px, transparent 50%),
         radial-gradient(at 41% 40%, hsla(250,63%,70%,0.4) 0px, transparent 50%)
        ` 
         }}>
          <h2 className="text-4xl font-bold text-white border-b border-white/10 pb-6 flex items-center gap-3" ref={addToRefs}>
            <span className="text-pink-500 font-mono text-2xl">/03</span> Key Strategies
          </h2>

          <div className="space-y-6 text-gray-400 leading-relaxed text-lg" ref={addToRefs}>
            <h3 className="text-2xl font-bold text-white tracking-wide">
              1. Problem Framing: Identifying User Pain Points
            </h3>
            <p><span className="text-pink-500 font-bold mr-2">【Challenge】</span>At the early stages, while the goal was clear, the specific day-to-day pain points of model validation were not fully mapped out.</p>
            <p><span className="text-pink-500 font-bold mr-2">【My Approach】</span>Established a baseline through observation:</p>
            <ul className="space-y-3 pl-4 border-l-2 border-pink-500/30 ml-2">
              <li><strong className="text-gray-200">Critical Path Demo:</strong> Asked data scientists to demo their workflow to identify bottlenecks.</li>
              <li><strong className="text-gray-200">Empathy Mapping:</strong> Developed a  Empathy Map to guide the design process.</li>
            </ul>
            <div className="mt-6 p-1  rounded-xl">
               <EmpathyMap />
            </div>
            <p className="pt-2"><span className="text-pink-500 font-bold mr-2">【Result】</span>Successfully bridged the gap between abstract goals and actual user needs.</p>
          </div>

          <div className="space-y-6 text-gray-400 leading-relaxed text-lg pt-8 border-t border-white/5" ref={addToRefs}>
            <h3 className="text-2xl font-bold text-white tracking-wide">
              2. Architectural Selection: Building for Flexibility
            </h3>
            <p><span className="text-pink-500 font-bold mr-2">【Challenge】</span>The core issues were scattered data across fragmented architectures and a lack of intuitive visualizations.</p>
            <p><span className="text-pink-500 font-bold mr-2">【My Approach】</span>Designed a solution tailored to handle diverse data types, including unstructured data, utilizing a full-stack flow:</p>
            <ul className="space-y-3 pl-4 border-l-2 border-pink-500/30 ml-2 mb-6">
              <li><strong className="text-gray-200">Python:</strong> For robust data preprocessing and cleaning.</li>
              <li><strong className="text-gray-200">Flask:</strong> As the backend framework to handle logic and data routing.</li>
              <li><strong className="text-gray-200">React:</strong> As the frontend framework for dynamic UI.</li>
            </ul>
            <ArchitectureDiagram />
            <p className="pt-4"><span className="text-pink-500 font-bold mr-2">【Result】</span>Accommodated complex data structures while maintaining a smooth, responsive user experience.</p>
          </div>

          <div className="space-y-6 text-gray-400 leading-relaxed text-lg pt-8 border-t border-white/5" ref={addToRefs}>
            <h3 className="text-2xl font-bold text-white tracking-wide">
              3. User-First Approach: Iterative Prototyping via Scrum
            </h3>
            <p><span className="text-pink-500 font-bold mr-2">【Challenge】</span>Ensuring the final tool actually fit the data scientists' workflow without introducing new usability friction.</p>
            <p><span className="text-pink-500 font-bold mr-2">【My Approach】</span>Implemented an agile, feedback-driven loop:</p>
            <ul className="space-y-3 pl-4 border-l-2 border-pink-500/30 ml-2">
              <li><strong className="text-gray-200">Test-Driving Wireframes:</strong> Presented prototypes during weakly reviews for feedback.</li>
              <li><strong className="text-gray-200">Iterative Optimization:</strong> Identified usability issues early and adjusted the dashboard layout accordingly.</li>
            </ul>
            <p className="pt-2"><span className="text-pink-500 font-bold mr-2">【Result】</span>The final product aligned with user expectations and technical requirements.</p>
          </div>
        </section>

        {/* --- 重構的 Results 區塊 (保留原本的粉色與背景設定) --- */}
        <section id="results" className="mb-32 py-16 border border-white/5 rounded-3xl relative" ref={addToRefs}
          style={{
            backgroundColor: 'hsla(0,0%,100%,0)', 
            backgroundImage: `
            radial-gradient(at 23% 78%, hsla(352, 85%, 82%, 0.38) 0px, transparent 50%),
            radial-gradient(at 90% 7%, hsla(250, 63%, 70%, 0.50) 0px, transparent 50%)
            ` 
        }}>
          <div className="relative z-10 text-center mb-12">
            <p className="text-pink-500 font-mono font-bold text-sm tracking-widest uppercase mb-4 flex items-center justify-center gap-2">
              <span className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"></span>
              RESULT 
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
              Value Delivered
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto px-6 relative z-10">
            {resultsData.map((item, index) => (
              <div 
                key={index}
                ref={(el) => (resultCardsRef.current[index] = el)}
                className="group relative p-8 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-sm transition-all duration-500 ease-out flex flex-col gap-4 overflow-hidden hover:border-pink-500/50 hover:shadow-[0_0_30px_rgba(236,72,153,0.15)]"
              >
                {/* 卡片內部微光暈 */}
                <div className="absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-pink-500/5 to-transparent rounded-2xl pointer-events-none" />
                
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-white/5 border border-white/10 group-hover:border-pink-500/30 transition-colors">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-wide group-hover:text-pink-100 transition-colors">
                    {item.title}
                  </h3>
                </div>
                
                <p className="text-gray-400 leading-relaxed font-light">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        <Contact/>
      </main>
    </div>
  );
};

export default AiModelValidation;