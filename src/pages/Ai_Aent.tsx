// src/pages/custom/AiAnalysisAgent.tsx
import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  BrainCircuit, 
  ShieldCheck, 
  Zap, 
  BarChart3, 
  Terminal,
  ChevronRight,
  ChevronLeft,
  Cpu,
  Target
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Contact from '@/components/Contact';

gsap.registerPlugin(ScrollTrigger);

const AiAnalysisAgent: React.FC = () => {
  const navigate = useNavigate();
  const [isAnchorActive, setIsAnchorActive] = useState(true);
  const [mounted, setMounted] = useState(false); 
  
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRefs = useRef<(HTMLElement | null)[]>([]);
  const textScrubRef = useRef<HTMLParagraphElement>(null);

  // 核心範疇更新為 AI Agent 相關
  const coreScopes = [
    { id: "01", title: "LLM Model Selecting", icon: <ShieldCheck className="w-6 h-6" /> },
    { id: "02", title: "Workflow Design", icon: <BrainCircuit className="w-6 h-6" /> },
    { id: "03", title: "Prompt Engineering", icon: <Target className="w-6 h-6" /> },
    { id: "04", title: "Benchmarking", icon: <Zap className="w-6 h-6" /> }
  ];

  const resultText = "Successfully delivered a functional prototype that automated production reports and served as a high-value PoC for future commercial expansion.";
  const resultWords = resultText.split(" ");

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

      if (textScrubRef.current) {
        gsap.fromTo(".scrub-word", 
          { opacity: 0.05, y: 15 },
          {
            opacity: 1, 
            y: 0,
            filter: "blur(0px)",
            stagger: 0.08, 
            ease: "power2.out",
            scrollTrigger: {
              trigger: textScrubRef.current,
              start: "top 80%", 
              end: "bottom 65%", 
              scrub: 1.5, 
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
                <li onClick={() => scrollToSection('overview')} className="hover:text-pink-400 cursor-pointer transition-colors hover:translate-x-1 transform duration-200">01. Overview</li>
                <li onClick={() => scrollToSection('core-scope')} className="hover:text-pink-400 cursor-pointer transition-colors hover:translate-x-1 transform duration-200">02. Project Scope</li>
                <li onClick={() => scrollToSection('strategies')} className="hover:text-pink-400 cursor-pointer transition-colors hover:translate-x-1 transform duration-200">03. Key Strategies</li>
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

      {/* KV Section */}
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
              My Role : Primary Developer
            </p>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-white drop-shadow-lg">
            Data Analysis AI Agent
          </h1>
          <p className="text-xl text-pink-500 font-medium tracking-wide drop-shadow-md">
            How I built a secure AI Agent MVP to automate industrial production line analysis
          </p>
        </div>
      </section>

      <main className="max-w-5xl mx-auto px-6 pt-16">
        
        {/* Project Overview */}
        <section id="overview" className="mb-32 grid md:grid-cols-2 gap-12 items-center" ref={addToRefs}>
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white flex items-center gap-3">
              <span className="text-pink-500 font-mono text-xl">/01</span> Project Overview
            </h2>
            <p className="text-gray-400 leading-relaxed text-lg">
              Amidst the global surge of AI Agents, this project aimed to develop an AI Agent MVP capable of automating the analysis of "production line data" and generating actionable decision reports. 
              <br/><br/>
              The objective was to validate the feasibility of deploying Large Language Models (LLMs) in industrial production environments and to explore potential opportunities within the digital transformation market.
            </p>
          </div>
          
          <div className="aspect-video bg-[#0a0a0a] rounded-2xl flex items-center justify-center relative overflow-hidden group shadow-2xl border border-white/5">
             {/* 這裡模擬一個 AI Agent 的視覺感 */}
             <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-cyan-500/10 opacity-50" />
             <img 
              src="/AI.png" // 記得替換為你的圖片路徑
              alt="AI Validation Dashboard Overview" 
              className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-105 relative z-0"
            />
          </div>
        </section>

        {/* Core Scope */}
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

        {/* Key Strategies */}
        <section id="strategies" className="space-y-16 mb-32 max-w-4xl p-8 rounded-3xl"
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

          {/* Strategy 1 */}
          <div className="space-y-6 text-gray-400 leading-relaxed text-lg" ref={addToRefs}>
            <h3 className="text-2xl font-bold text-white tracking-wide">
              1. Overcoming LLM Limitations: Security & Calculation hallucinations
            </h3>
            <div className="space-y-4">
              <p>
                <span className="text-pink-500 font-mono text-sm font-bold mr-2">[ SECURITY ]</span> 
                Utilizing third-party cloud models posed risks of data breaches. We implemented On-premise deployment using lightweight models (&lt;10B) and De-identification protocols to ensure sensitive info never left the network.
              </p>
              <p>
                <span className="text-pink-500 font-mono text-sm font-bold mr-2">[ PRECISION ]</span> 
                To solve calculation hallucinations, we introduced a "Program-Assisted Calculation" strategy. LLMs parsed requirements, while core computations were offloaded to deterministic Python code.
              </p>
            </div>
          </div>

          {/* Strategy 2 */}
          <div className="space-y-6 text-gray-400 leading-relaxed text-lg pt-8 border-t border-white/5" ref={addToRefs}>
            <h3 className="text-2xl font-bold text-white tracking-wide">
              2. Establishing Domain-Specific Benchmarking
            </h3>
            <p>Moving away from subjective scoring, we established a "Structured Manual Evaluation Mechanism":</p>
            <ul className="space-y-4 pl-4 border-l-2 border-pink-500/30 ml-2">
              <li>
                <strong className="text-gray-200">Defining KIPs:</strong> Set 5 core data checkpoints (Key Information Points) for every generated report.
              </li>
              <li>
                <strong className="text-gray-200">Quantified Scoring:</strong> Points awarded for correct insights, deducted for errors. This transformed qualitative text into rational, digital metrics for model optimization.
              </li>
            </ul>
          </div>

          {/* Strategy 3 */}
          <div className="space-y-6 text-gray-400 leading-relaxed text-lg pt-8 border-t border-white/5" ref={addToRefs}>
            <h3 className="text-2xl font-bold text-white tracking-wide">
              3. Iterative Prompt Engineering
            </h3>
            <p>Utilized a "Task-Relevant Context" identification mechanism to maximize accuracy within limited context windows:</p>
            <div className="bg-white/5 rounded-xl p-6 border border-white/10 font-mono text-sm">
              <span className="text-pink-400">// Prompt Optimization Logic</span>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start gap-2">
                   <span className="text-pink-500">▶</span> Identify high-impact parameters for decision-making.
                </li>
                <li className="flex items-start gap-2">
                   <span className="text-pink-500">▶</span> Remove redundant info to prevent <span className="text-white">"Attention Drift"</span>.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Results with GSAP Scrubbing */}
        <section id="results" className="mb-32 py-24 border border-white/5 rounded-3xl" ref={addToRefs}
          style={{
            backgroundColor: 'hsla(0,0%,100%,0)', 
            backgroundImage: `
              radial-gradient(at 23% 78%, hsla(352, 85%, 82%, 0.38) 0px, transparent 50%),
              radial-gradient(at 90% 7%, hsla(250, 63%, 70%, 0.50) 0px, transparent 50%)
            ` 
          }}>
          <p className="text-pink-500 font-mono font-bold text-sm tracking-widest uppercase mb-8 text-center">
           FINAL OUTCOME
          </p>
          
          <p 
            ref={textScrubRef}
            className="text-3xl md:text-5xl leading-tight font-bold max-w-4xl mx-auto px-6 text-center"
          >
            {resultWords.map((word, i) => (
              <span 
                key={i} 
                className="scrub-word inline-block mx-[0.15em] mb-2 bg-gradient-to-r from-pink-400 via-pink-500 to-pink-400 bg-clip-text text-transparent opacity-10 will-change-[opacity,transform,filter]"
              >
                {word}
              </span>
            ))}
          </p>

          
        </section>

        <Contact/>
      </main>
    </div>
  );
};

export default AiAnalysisAgent;