// src/pages/NSTC_Metaverse.tsx
import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Target, 
  Terminal,
  ChevronRight,
  ChevronLeft,
  Users,
  BarChart3,
  Globe,
  Mic,
  ScrollText,
  Presentation,
  Search,
  BookOpen
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Contact from '@/components/Contact';

gsap.registerPlugin(ScrollTrigger);

const NSTC_Metaverse: React.FC = () => {
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
  const textScrubRef = useRef<HTMLParagraphElement>(null);

  // 核心範疇卡片內容更新為 Metaverse 研究相關
  const coreScopes = [
    { id: "01", title: "Outreach & Execution", icon: <Mic className="w-6 h-6" /> },
    { id: "02", title: "Analytical Ownership", icon: <BarChart3 className="w-6 h-6" /> },
    { id: "03", title: "Field Observation", icon: <Search className="w-6 h-6" /> },
    { id: "04", title: "Strategy Formulation", icon: <BookOpen className="w-6 h-6" /> }
  ];

  // 結果展示文字 - 聚焦於國際研討會與學術發表
  const resultText = "Successfully presented at the International Conference on Information Management (ICIM) and published a comprehensive research paper.";
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
                  <Terminal className="w-3 h-3"/> Content
                </span>
                <button 
                  onClick={() => setIsAnchorActive(false)} 
                  className="text-gray-500 hover:text-pink-400 p-1 rounded-md hover:bg-pink-500/10 transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <ul className="flex flex-col gap-4 text-sm font-medium text-gray-400">
                <li onClick={() => scrollToSection('overview')} className="hover:text-pink-400 cursor-pointer transition-colors hover:translate-x-1 transform duration-200">01. Overview</li>
                <li onClick={() => scrollToSection('core-scope')} className="hover:text-pink-400 cursor-pointer transition-colors hover:translate-x-1 transform duration-200">02. Core Scope</li>
                <li onClick={() => scrollToSection('key-strategies')} className="hover:text-pink-400 cursor-pointer transition-colors hover:translate-x-1 transform duration-200">03. Key Strategies</li>
                <li onClick={() => scrollToSection('results')} className="hover:text-pink-400 cursor-pointer transition-colors hover:translate-x-1 transform duration-200">04. Recognition & Learnings</li>
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
              My Role : Lead Researcher
            </p>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-white drop-shadow-lg leading-tight">
           Metaverse in the Arts Industry
          </h1>
          <p className="text-xl text-pink-500 font-medium tracking-wide drop-shadow-md max-w-3xl mx-auto">
            Bridging Academic Theory and Real-World Art-Tech Implementation
          </p>
          <div className="flex flex-wrap justify-center gap-2 mt-4">
             {["National Science & Technology Council", "Industry Analysis", "Stakeholder Interview", "PEST & CPND Frameworks"].map(tag => (
               <span key={tag} className="text-[10px] font-mono px-3 py-1 bg-white/5 border border-white/10 rounded-full text-gray-400">
                 # {tag}
               </span>
             ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 pt-16">
        
        {/* 01. Overview */}
        <section id="overview" className="mb-32 grid md:grid-cols-2 gap-12 items-center" ref={addToRefs}>
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white flex items-center gap-3">
              <span className="text-pink-500 font-mono text-xl">/01</span> Overview
            </h2>
            <div className="space-y-4">
              <h4 className="text-pink-400 font-bold uppercase tracking-widest text-xs">Context & Problem</h4>
              <p className="text-gray-400 leading-relaxed">
                The emergence of metaverse technologies presents both transformative opportunities and significant barriers for the arts industry. My research aimed to examine how art-tech startups adopt these technologies and identify the practical challenges they face during this digital transition.
              </p>
              <h4 className="text-pink-400 font-bold uppercase tracking-widest text-xs pt-2">Our Solution</h4>
              <p className="text-gray-400 leading-relaxed">
                A framework-based industry analysis centered on a primary case study. By combining literature reviews with first-hand leadership interviews, I developed a structured paper outlining transitional strategies for emerging technologies in the arts sector.
              </p>
            </div>
          </div>
          
          <div className="aspect-video bg-[#0a0a0a] rounded-3xl flex items-center justify-center relative overflow-hidden group shadow-2xl border border-white/5">
             <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
             <div className="absolute z-10 flex flex-col items-center gap-3 text-pink-500/50 group-hover:text-pink-400 transition-colors">
                <Globe className="w-12 h-12 mb-2" />
                <span className="text-xs font-mono uppercase tracking-widest">Industry Ecosystem Map</span>
             </div>
          </div>
        </section>

        {/* 02. Core Scope */}
        <section id="core-scope" className="mb-32" ref={addToRefs}>
          <h2 className="text-3xl font-bold text-white mb-10 flex items-center gap-3">
             <span className="text-pink-500 font-mono text-xl">/02</span> Core Scope
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
          <div className="mt-8 p-6 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-6">
              <Terminal className="w-6 h-6 text-pink-500 shrink-0" />
              <p className="text-sm text-gray-400 font-mono">
                Literature Review → CEO Interview → PEST & CPND Analysis → Strategy Formulation → Academic Publication
              </p>
          </div>
        </section>

        {/* 03. Key Strategies */}
        <section id="key-strategies" className="space-y-16 mb-32 max-w-4xl"
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
            <div className="flex items-center gap-3">
               <Mic className="text-pink-500 w-6 h-6" />
               <h3 className="text-2xl font-bold text-white tracking-wide">
                 1. High-Level Stakeholder Interview
               </h3>
            </div>
            <p><span className="text-pink-500 font-bold mr-2">【Action】</span>Planned and executed a structured interview with an art-tech startup CEO, from initial outreach to tailored questioning.</p>
            <p><span className="text-pink-500 font-bold mr-2">【Outcome】</span>Successfully gathered primary data on industry adoption and pain points often inaccessible through secondary research alone.</p>
          </div>

          <div className="space-y-6 text-gray-400 leading-relaxed text-lg pt-8 border-t border-white/5" ref={addToRefs}>
            <div className="flex items-center gap-3">
               <BarChart3 className="text-pink-500 w-6 h-6" />
               <h3 className="text-2xl font-bold text-white tracking-wide">
                 2. Framework-Based Industry Analysis
               </h3>
            </div>
            <p><span className="text-pink-500 font-bold mr-2">【Action】</span>Utilized PEST (Political, Economic, Social, Technological) and CPND (Content, Platform, Network, Device) frameworks to evaluate the ecosystem.</p>
            <p><span className="text-pink-500 font-bold mr-2">【Outcome】</span>Organized complex field observations into a structured format, allowing for a clear evaluation of market opportunities and barriers.</p>
          </div>

          <div className="space-y-6 text-gray-400 leading-relaxed text-lg pt-8 border-t border-white/5" ref={addToRefs}>
            <div className="flex items-center gap-3">
               <ScrollText className="text-pink-500 w-6 h-6" />
               <h3 className="text-2xl font-bold text-white tracking-wide">
                 3. Comprehensive Field Study & Synthesis
               </h3>
            </div>
            <p><span className="text-pink-500 font-bold mr-2">【Action】</span>Combined literature reviews with direct field observations, including interactive exhibition experiences.</p>
            <p><span className="text-pink-500 font-bold mr-2">【Outcome】</span>Consolidated theoretical findings with practical insights, forming the basis for a research paper on transitional strategies.</p>
          </div>
        </section>

        {/* 04. Results */}
        <section id="results" className="mb-12 py-24 border border-white/5 rounded-3xl" ref={addToRefs}
          style={{
          backgroundColor: 'hsla(0,0%,100%,0)', 
          backgroundImage: `
          radial-gradient(at 23% 78%, hsla(352, 85%, 82%, 0.38) 0px, transparent 50%),
          radial-gradient(at 90% 7%, hsla(250, 63%, 70%, 0.50) 0px, transparent 50%)
          ` 
        }}>
          <p className="text-pink-500 font-mono font-bold text-sm tracking-widest uppercase mb-8 text-center flex items-center justify-center gap-2">
           <Presentation className="w-4 h-4" /> PUBLICATION
          </p>
          <p ref={textScrubRef} className="text-3xl md:text-5xl leading-tight font-bold max-w-4xl mx-auto px-6 text-center">
            {resultWords.map((word, i) => (
              <span key={i} className="scrub-word inline-block mx-[0.15em] mb-2 bg-gradient-to-r from-pink-400 via-pink-500 to-pink-400 bg-clip-text text-transparent opacity-10 will-change-[opacity,transform,filter]">
                {word}
              </span>
            ))}
          </p>
        </section>

        {/* Key Learnings */}
        <section id="post-mortem" className="mb-32 grid md:grid-cols-3 gap-8" ref={addToRefs}>
           <div className="p-8 bg-white/5 rounded-2xl border border-white/10 space-y-4 hover:bg-white/10 transition-colors">
              <h4 className="font-bold text-pink-400 uppercase text-xs tracking-widest">Interview Mastery</h4>
              <p className="text-sm text-gray-400 leading-relaxed">Mastered the process of gathering first-hand insights from industry stakeholders, from initial outreach to structured questioning.</p>
           </div>
           <div className="p-8 bg-white/5 rounded-2xl border border-white/10 space-y-4 hover:bg-white/10 transition-colors">
              <h4 className="font-bold text-pink-400 uppercase text-xs tracking-widest">Stakeholder Comm.</h4>
              <p className="text-sm text-gray-400 leading-relaxed">Developed the ability to communicate across levels—from extracting insights from a CEO to refining research with a professor.</p>
           </div>
           <div className="p-8 bg-white/5 rounded-2xl border border-white/10 space-y-4 hover:bg-white/10 transition-colors">
              <h4 className="font-bold text-pink-400 uppercase text-xs tracking-widest">Research Comm.</h4>
              <p className="text-sm text-gray-400 leading-relaxed">Learned to tailor complex research outcomes clearly to both academic and professional audiences for maximum impact.</p>
           </div>
        </section>

        <Contact/>
      </main>
    </div>
  );
};

export default NSTC_Metaverse;