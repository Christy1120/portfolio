import React, { useState, useRef, useLayoutEffect, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Rocket } from 'lucide-react';
// [ SYSTEM // NEW ]: 引入 React Router 的導航 Hook
import { useNavigate } from 'react-router-dom'; 

import { SHOWCASE_DATA } from '../data/showcaseData'; 
import ScrollLottie from './ScrollLottie';

gsap.registerPlugin(ScrollTrigger);

export default function InteractiveShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null); 
  const textScrubRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const SPOTLIGHT_DATA = SHOWCASE_DATA.filter(
    item => item.displayArea === 'spotlight' || item.displayArea === 'both'
  );
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const navItemRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  const [activeIndex, setActiveIndex] = useState(0);
  
  // [ SYSTEM // NEW ]: 初始化導航功能
  const navigate = useNavigate();

  const scrubText = "Data-driven Project Builder, specialized in bridging the gap between technical feasibility and business requirements through evidence-based decision-making.";
  const words = useMemo(() => scrubText.split(" "), [scrubText]);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      
      // 1. 標題 (Spotlight) 的漸進式刷洗動畫
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

      // 2. 核心：Text Scrubbing (文字逐字亮起為亮粉色)
      if (textScrubRef.current) {
        gsap.fromTo(
          ".scrub-word",
          { 
            color: "rgba(255, 255, 255, 0.1)", 
          },
          {
            color: "#f472b6", 
            stagger: 0.1,
            ease: "none",
            scrollTrigger: {
              trigger: textScrubRef.current,
              start: "top 80%",
              end: "bottom 50%",
              scrub: 0.5,
            }
          }
        );
      }

      // 3. 左側選單：高質感滑入 (Expo.out)
      if (navItemRefs.current.length > 0) {
        gsap.from(navItemRefs.current, {
          x: -20,
          opacity: 0,
          duration: 1.2,
          stagger: 0.1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse"
          }
        });
      }

      // 4. 右側專案區塊：交錯進場與內容連動
      sectionRefs.current.forEach((section, index) => {
        if (!section) return;
        const q = gsap.utils.selector(section);

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            toggleActions: "play none none reverse"
          }
        });

        tl.fromTo(q(".stagger-reveal"), 
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.1,
            ease: "expo.out"
          }
        ).fromTo(q(".visual-reveal"),
          { scale: 0.9, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1.2, ease: "expo.out" },
          "-=0.8"
        );

        ScrollTrigger.create({
          trigger: section,
          start: "top 50%",
          end: "bottom 50%",
          onEnter: () => setActiveIndex(index),
          onEnterBack: () => setActiveIndex(index),
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleScrollToSection = (index: number) => {
    const section = sectionRefs.current[index];
    if (section) {
      const yOffset = section.getBoundingClientRect().top + window.scrollY - 180;
      window.scrollTo({ top: yOffset, behavior: 'smooth' });
    }
  };

  return (
    <section ref={containerRef} id="spotlight" 
    className="relative bg-[#050A10] w-full pt-32 lg:pt-40 pb-40 on"
    style={{
        backgroundColor: 'hsla(0, 0%, 0%, 1)',
        backgroundImage: `
          radial-gradient(at 63% 67%, hsla(345,90%,87%,0.28) 0px, transparent 50%),
          radial-gradient(at 33% 44%, hsla(345,67%,63%,0.13) 0px, transparent 50%)
        `
      }}
    >
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        <div ref={triggerRef} className="mb-32 max-w-4xl">
          
          <h2 
            ref={headerRef}
            className="text-5xl md:text-7xl font-black tracking-tighter mb-8 pb-2 inline-block text-transparent bg-clip-text"
            style={{
              backgroundImage: "linear-gradient(90deg, #ffffff 0%, #f472b6 50%, rgba(255,255,255,0.1) 100%)",
              backgroundSize: "200% auto",
            }}
          >
            Spotlight
          </h2>
          
          <div 
            ref={textScrubRef} 
            className="flex flex-wrap gap-x-[0.4rem] gap-y-2 text-xl md:text-3xl font-light leading-snug max-w-3xl"
          >
            {words.map((word, i) => (
              <span key={i} className="scrub-word font-bold transition-colors duration-75">
                {word}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 relative ">
          
          {/* 左側：導覽選單 */}
          <div className="hidden lg:block lg:w-1/5" >
            <div className="sticky top-40 flex flex-col border-l border-white/10 ml-2">
              {SPOTLIGHT_DATA.map((item, i) => {
                const isActive = activeIndex === i;
                return (
                  <div 
                    key={item.id}
                    ref={(el) => (navItemRefs.current[i] = el)}
                    onClick={() => handleScrollToSection(i)}
                    className="relative py-4 pl-6 cursor-pointer group"
                  >
                    <div 
                      className={`absolute -left-[4.5px] w-2 h-2 rounded-full transition-all duration-300
                        ${isActive ? 'bg-pink-500 shadow-[0_0_12px_#f472b6]' : 'bg-transparent group-hover:bg-white/20'}
                      `}
                    />
                    <h3 className={`text-xs font-mono tracking-widest uppercase transition-colors duration-300 
                      ${isActive ? 'text-pink-400' : 'text-zinc-500 group-hover:text-zinc-300'}
                    `}>
                      {item.title}
                    </h3>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 右側：主內容區塊 (Project Cards) */}
          <div className="lg:w-4/5 flex flex-col gap-48 pb-32">
            {SPOTLIGHT_DATA.map((data, i) => (
              <div 
                key={data.id}
                ref={(el) => (sectionRefs.current[i] = el)} 
                className="w-full flex flex-col gap-12"
              >
                {/* 上半部：文字與視覺並排 */}
                <div className="w-full flex flex-col xl:flex-row gap-16 items-center">
                  {/* 左側：文案區 */}
                  <div className="flex-1 flex flex-col ">
                    <div className="stagger-reveal flex items-center gap-4 mb-5 p-2 pr-6 rounded-xl w-max">
                      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-pink-500 shadow-[0_0_15px_rgba(244,114,182,0.4)]">
                        <Rocket className="w-5 h-5 text-black" fill="currentColor" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-zinc-500 font-mono text-[10px] uppercase tracking-tighter">My Role</span>
                        <span className="text-pink-400 font-mono text-sm font-bold tracking-wide">{data.role}</span>
                      </div>
                    </div>
                    
                    <h4 className="stagger-reveal text-2xl lg:text-5xl text-white font-bold tracking-tighter leading-none mb-8">
                      {data.title}
                    </h4>
                    
                    <p className="stagger-reveal text-zinc-400 text-lg leading-relaxed mb-5 max-w-xl">
                      {data.desc}
                    </p>
                    
                    <div className="mb-0 xl:mb-5">
                      <p className="stagger-reveal text-zinc-500 font-mono text-[10px] tracking-[0.2em] uppercase mb-6 flex items-center gap-3">
                        <span className="w-8 h-[1px] bg-pink-500/30"></span> Scope of Project
                      </p>
                      <ul className="space-y-4">
                        {data.scope.map((s, idx) => (
                          <li key={idx} className="stagger-reveal flex items-center gap-4 text-zinc-300">
                            <div className="w-1 h-1 rounded-full bg-pink-500 shadow-[0_0_8px_#f472b6]"></div>
                            <span className="text-sm font-light tracking-wide">{s}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* 右側：視覺呈現區塊 */}
                  <div className="visual-reveal min-w-0 flex-1 w-full relative flex items-center justify-center lg:min-h-[500px] overflow-hidden ">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-pink-500/10 blur-[120px] rounded-full pointer-events-none z-0" />
                    <div className="relative z-10 w-[110%] md:w-full h-full flex items-center justify-center scale-100 md:scale-[1.2] lg:scale-[1.5] transition-transform duration-700">
                      <ScrollLottie animationData={data.lottieData} />
                    </div>
                  </div>
                </div>

                {/* 下半部：置中按鈕 */}
                <div className="w-full flex justify-center mt-2 lg:mt-2 stagger-reveal">
                  <button 
                  onClick={() => navigate(`/project/${data.slug}`)}
                  className="
                    group relative inline-flex items-center gap-3 px-10 py-4 
                    rounded-full font-bold text-white tracking-widest uppercase text-sm
                    /* 漸層背景：從深藍到橘紅 */
                    bg-gradient-to-r from-[#f472b6] via-[#ff80ea] to-[#ea80ff]
                    /* 外發光效果：與漸層色呼應的陰影 */
                    shadow-[0_0_20px_rgba(161,98,232,0.4)]
                    /* 動效：滑過時放大與增強發光 */
                    
                    hover:scale-105 hover:shadow-[0_0_30px_rgba(240,124,100,0.6)]
                  "
                >
                  {/* 文字光暈效果 */}
                  <span className="drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] flex items-center gap-3">
                    Read Case Study
                    <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </span>
                </button>
                </div>

              </div>
            ))}
          </div>
          
        </div>
      </div>
      
    </section>
  );
}