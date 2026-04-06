// src/components/SkillsBento.tsx
import React, { MouseEvent, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { 
  Database, 
  Award, 
  Cpu, 
  LayoutTemplate, 
  Users, 
  ExternalLink,
  LineChart
} from 'lucide-react';

// 註冊 GSAP 滾動套件
gsap.registerPlugin(ScrollTrigger);

// --- Types ---
interface BentoCardProps {
  id: string;
  title: string;
  description: string;
  label: string;
  icon: React.ReactNode;
  tags: string[];
  href?: string;
  className?: string;
}

// --- English Mock Data (Based on Resume) ---
const skillsData: BentoCardProps[] = [
  {
    id: 'cert-data',
    title: 'Data Analytics',
    description: 'Certified in leveraging Python and statistical analysis to uncover insights. Applied at PowerArena to analyze 10,000+ manufacturing records and deliver Root Cause Analysis (RCA) reports.',
    label: '[ CERT // GOOGLE ]',
    icon: <LineChart className="w-5 h-5 text-pink-500" />,
    tags: ['Python', 'Pandas', 'Data Viz', 'RCA'],
    href: 'https://coursera.org/share/6629f0600047688b02b0daa088468abc',
    className: 'md:col-span-2 md:row-span-2', // 大卡片
  },
  {
    id: 'cert-pm',
    title: 'Project Management',
    description: 'Combining Google’s methodology with real-world execution of 4+ large-scale projects. Specialist in translating stakeholder pain points into Product Requirements (SOWs) and leading cross-functional teams for successful digital implementation.',
    label: '[ CERT // GOOGLE ]',
    icon: <Award className="w-5 h-5 text-pink-500" />,
    tags: ['SOW', 'Agile', 'Stakeholder Mgmt'],
    href: 'https://coursera.org/share/4d74b0f51b71c9ce756393d7bcd3141c',
    className: 'md:col-span-2 md:row-span-2', // 大卡片
  },
  {
    id: 'skill-ai',
    title: 'AI & LLM Automation',
    description: 'Pilot AI Agent MVP experiments using Dify. Built automated workflows for data cleaning and report generation, validating the commercial viability of LLMs in industrial engineering.',
    label: '[ SYS // AI_AGENT ]',
    icon: <Cpu className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />,
    tags: ['Dify', 'LLM Workflow', 'MVP'],
    className: 'md:col-span-2',
  },
  {
    id: 'skill-frontend',
    title: 'Vibe Coding &  Prototyping',
    description: 'Adept at leveraging Wireframes and Vibe Coding to bridge communication gaps and accelerate project execution. ',
    label: '[ SYS // DEV ]',
    icon: <LayoutTemplate className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />,
    tags: ['Vibe Coding', 'Wireframing', 'Rapid Prototyping'],
    className: 'md:col-span-1',
  },
  {
    id: 'skill-comms',
    title: 'Strategic Proposal',
    description: 'Adept at uncovering business pain points and translating them into  digital solution. Successfully orchestrated 2 project proposals  , delivering professional-grade strategic plans that earned satisfaction from enterprise clients.',
    label: '[ SYS // B2B ]',
    icon: <Users className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />,
    tags: ['Problem Framing', 'Proposal'],
    className: 'md:col-span-1',
  }
];

// --- Component ---
export default function SkillsBento() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  // 要被刷洗的段落文字
  const paragraphText = "A versatile toolkit spanning data analysis, project management, and vibe coding, designed to ship value from discovery to delivery.";
  const words = paragraphText.split(" ");

  // --- GSAP Text Scrubbing 動畫 ---
  useEffect(() => {
    // 使用 gsap.context 確保在 React 重新渲染時能正確清理動畫
    const ctx = gsap.context(() => {
      // 1. 標題 (Skillset) 的漸進式刷洗
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { 
            backgroundPosition: "200% center",
            opacity: 0.5 
          },
          {
            backgroundPosition: "0% center",
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
              end: "bottom 60%",
              scrub: 0.5,
            }
          }
        );
      }

      // 2. 段落文字的逐字亮起刷洗
      if (textRef.current) {
        gsap.fromTo(
          ".scrub-word",
          { 
            color: "rgba(148, 163, 184, 0.2)",
             // text-slate-400 低透明度
          },
          {
            color: "rgba(245, 178, 213, 1)", // 亮白色 text-slate-50
            stagger: 0.1,
            ease: "none",
            scrollTrigger: {
              trigger: textRef.current,
              start: "top 85%",
              end: "bottom 55%",
              scrub: 0.5,
            }
          }
        );
      }
    }, containerRef);

    return () => ctx.revert(); // 清理動畫，避免 Memory Leak
  }, []);

  // --- 處理滑鼠追蹤光暈特效 (Vercel Style Spotlight) ---
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const cards = document.getElementsByClassName('bento-card');
    for (const card of cards) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      (card as HTMLElement).style.setProperty('--mouse-x', `${x}px`);
      (card as HTMLElement).style.setProperty('--mouse-y', `${y}px`);
    }
  };

  return (
    <section 
      id="skills" 
      ref={containerRef}
      className="bg-black py-24 relative flex justify-center w-full overflow-hidden" // 建議直接用 bg-black
      style={{
        backgroundColor: 'hsla(21,0%,0%,1)', // ✅ 移除分號
        backgroundImage: `
         radial-gradient(at 63% 34%, hsla(345,90%,87%,0.28) 0px, transparent 50%),
          radial-gradient(at 33% 44%, hsla(345,67%,63%,0.13) 0px, transparent 50%)
        ` // ✅ 移除分號
      }}
    >
      <div className="w-full max-w-6xl px-6 relative z-10">
        
        {/* === Text Scrubbing 標題區塊 === */}
        <div className="mb-16 max-w-3xl">
          
          
          <h2 
            ref={headerRef}
            className="text-4xl md:text-5xl font-bold tracking-tight mb-6 pb-1 inline-block text-transparent bg-clip-text"
            style={{
              backgroundImage: "linear-gradient(90deg, #ffffff 0%, #ffaad7ff 50%, rgba(255,255,255,0.1) 100%)",
              backgroundSize: "200% auto",
            }}
          >
            Skills
          </h2>
          
          <p 
            ref={textRef} 
            className="text-lg md:text-xl font-bold  leading-relaxed flex flex-wrap gap-x-[0.35rem] gap-y-1"
          >
            {words.map((word, i) => (
              <span 
                key={i} 
                className="scrub-word transition-colors duration-75"
              >
                {word}
              </span>
            ))}
          </p>
        </div>

        {/* === Bento Grid Container === */}
        <div 
          className="group grid grid-cols-1 md:grid-cols-4 gap-4"
          onMouseMove={handleMouseMove}
        >
          {skillsData.map((card, index) => {
            // 動態決定要渲染 <a> 還是 <div>
            const CardWrapper = card.href ? 'a' : 'div';
            const wrapperProps = card.href 
              ? { href: card.href, target: '_blank', rel: 'noopener noreferrer' } 
              : {};

            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`bento-card relative rounded-2xl bg-white/[0.02] border border-white/10 overflow-hidden flex flex-col p-6 transition-all duration-300 hover:border-pink-500/30 hover:bg-white/[0.04] ${card.className}`}
                style={{ minHeight: '240px' }}
              >
                {/* 互動式滑鼠光暈 (Spotlight Effect) */}
                <div 
                  className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(255, 20, 147, 0.15), transparent 40%)`,
                    zIndex: 0
                  }}
                />

                <CardWrapper 
                  {...wrapperProps} 
                  className="relative z-10 flex flex-col h-full cursor-pointer focus:outline-none"
                >
                  {/* Top: Label, Icon, and External Link Indicator */}
                  <div className="flex justify-between items-start mb-6">
                   
                    <div className="flex items-center gap-3">
                      {card.href && (
                        <ExternalLink className="w-4 h-4 text-slate-500 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-pink-400" />
                      )}
                      {card.icon}
                    </div>
                  </div>

                  {/* Middle: Text Content */}
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-semibold text-slate-100 mb-3 group-hover:text-white transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                      {card.description}
                    </p>
                  </div>

                  {/* Bottom: Tags */}
                  <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-white/5">
                    {card.tags.map(tag => (
                      <span 
                        key={tag} 
                        className="text-xs font-medium text-slate-300 bg-white/5 px-3 py-1.5 rounded-full border border-white/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardWrapper>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}