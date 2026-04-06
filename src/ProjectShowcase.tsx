import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// 移除了原本的圖示，因為新版設計主要依賴圖片，但保留 ArrowRight 給按鈕使用
import { ArrowRight } from 'lucide-react';

// 🌟 引入資料庫
import { SHOWCASE_DATA } from './data/showcaseData'; 
import Threads from './components/Threads';

gsap.registerPlugin(ScrollTrigger);

const GRID_DATA = SHOWCASE_DATA.filter(
    item => item.displayArea === 'grid' || item.displayArea === 'both'
  );

export default function ProjectShowcase() {
  const location = useLocation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".split-char",
        { y: 40, opacity: 0, rotateX: -90 },
        { y: 0, opacity: 1, rotateX: 0, duration: 0.8, stagger: 0.05, ease: "back.out(1.5)",
          scrollTrigger: { trigger: titleRef.current, start: "top 80%", toggleActions: "play none none reverse" }
        }
      );

      gsap.fromTo(
        cardsRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%", toggleActions: "play none none reverse" }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const splitTitle = "PROJECTS".split('');

  return (
    <section 
      ref={sectionRef}
      id="project" 
      className="py-32 relative bg-black min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      
      {/* 背景動畫 */}
      <div className="absolute inset-0 z-0 pointer-events-auto" >
        <Threads
          color={[0.8, 0.2, 0.6]}
          amplitude={0.7}
          distance={0.5}
          enableMouseInteraction
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pointer-events-none">
        
        <div className="mb-4 text-center text-zinc-500 font-mono text-sm tracking-[0.2em] uppercase">
          <span className="text-pink-500 mr-2">{'>_'}</span>
          See more Project
        </div>

        <h2 ref={titleRef} className="text-5xl md:text-7xl font-black text-white mb-16 text-center tracking-tighter" style={{ perspective: '400px' }}>
          {splitTitle.map((char, index) => (
            <span key={index} className="split-char inline-block text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500">
              {char}
            </span>
          ))}
        </h2>

        {/* 🌟 卡片網格區塊 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pointer-events-auto">
          {GRID_DATA.map((item, index) => (
            <div
              key={item.id}
              ref={(el) => (cardsRef.current[index] = el)}
              // 卡片主容器：設定大圓角、固定高度與隱藏溢出
              className="group relative flex flex-col w-full h-[520px] rounded-[32px] overflow-hidden cursor-pointer"
            >
              {/* 1. 背景圖片 (Hover 時會有輕微放大的互動感) */}
              <img 
                // 如果你的 item 裡沒有 image，這裡先用一張星空山脈圖當作範例
                src={item.image || "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80"} 
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* 2. 漸層遮罩 (從底部的深色過渡到頂部的透明) */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a111a] via-[#0a111a]/70 to-transparent pointer-events-none" />

              {/* 3. 卡片內容容器 (定位在底部) */}
              <div className="absolute bottom-0 w-full p-6 flex flex-col z-10">
          

                {/* 標題與右側徽章 (將價格改為顯示公司名稱) */}
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-2xl font-bold text-white tracking-wide">
                    {item.title}
                  </h3>
                  <div className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-xs font-medium whitespace-nowrap">
                    {item.company}
                  </div>
                </div>

                {/* 描述文字 (限制行數避免破版) */}
                <p className="text-sm text-gray-300 leading-relaxed line-clamp-2 mb-4">
                  {item.desc}
                </p>

                {/* 標籤區塊 (可依照專案屬性動態生成，這裡先寫死示範原圖效果) */}
                <div className="flex gap-2 mb-6">
                   {/* 使用 .map() 歷遍 item.scope 陣列 */}
                  {item.tag?.map((tag, tagIndex) => (
                    <span 
                      key={tagIndex} // React 規定 map 出來的元素必須要有唯一的 key
                      className="px-3 py-1.5 bg-white/10 rounded-full text-gray-300 text-[11px] font-medium tracking-wide whitespace-nowrap"
                    >
                      {tag}
                    </span>
                  ))}
                  
                </div>

                {/* 行動呼籲按鈕 */}
                <Link 
                  to={`/project/${item.slug}`} 
                  className="w-full py-3.5 bg-white text-[#0a111a] rounded-2xl flex items-center justify-center text-sm font-bold transition-all duration-300 group-hover:bg-pink-50"
                >
                  View Project
                  <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}