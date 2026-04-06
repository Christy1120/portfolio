// src/components/DataFlowSVG.tsx
import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function DataFlowSVG() {
  const svgRef = useRef<SVGSVGElement>(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: svgRef.current,
          start: "top 80%", // 當 SVG 進入畫面 80% 時觸發
          toggleActions: "play none none reverse", // 往下滾播放，往上滾退回
        }
      });

      // 1. 畫出主幹資料流 (粉色發光線條)
      tl.fromTo(".data-path", 
        { strokeDashoffset: 1 }, 
        { 
          strokeDashoffset: 0, 
          duration: 1.5, 
          ease: "power2.inOut", 
          stagger: 0.2 // 多條線條依序畫出
        }
      )
      // 2. 點亮資料節點 (粉色圓點)
      .fromTo(".data-node",
        { opacity: 0, scale: 0, transformOrigin: "center" },
        { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(2)", stagger: 0.1 },
        "-=0.8" // 與線條繪製重疊播放，視覺更連貫
      )
      // 3. 背景網格微光閃動 (呼吸燈效果)
      .to(".bg-grid-line", {
        opacity: 0.3,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      }, 0);

    }, svgRef);

    return () => ctx.revert();
  }, []);

  return (
    <svg 
      ref={svgRef} 
      viewBox="0 0 400 300" 
      className="w-full h-full max-h-[300px] drop-shadow-[0_0_15px_rgba(236,72,153,0.3)]"
    >
      <defs>
        {/* 建立高質感的霓虹發光濾鏡 */}
        <filter id="neon-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* 科技感背景裝飾線 (低透明度) */}
      <g className="opacity-10">
        <line x1="0" y1="150" x2="400" y2="150" stroke="#ffffff" strokeWidth="1" strokeDasharray="4 4" className="bg-grid-line" />
        <line x1="200" y1="0" x2="200" y2="300" stroke="#ffffff" strokeWidth="1" strokeDasharray="4 4" className="bg-grid-line" />
      </g>

      {/* 動態資料流線條 (使用 pathLength="1" 技巧) */}
      <g fill="none" stroke="#ec4899" strokeWidth="2" filter="url(#neon-glow)" strokeLinecap="round">
        {/* 從左到中的曲線 */}
        <path className="data-path" pathLength="1" strokeDasharray="1" d="M 40 150 C 100 150, 120 80, 200 80" />
        {/* 從下到中的曲線 */}
        <path className="data-path" pathLength="1" strokeDasharray="1" d="M 80 260 C 140 260, 160 80, 200 80" />
        {/* 從中分岔到右側的直線/折線 */}
        <path className="data-path" pathLength="1" strokeDasharray="1" d="M 200 80 L 280 80 L 320 120 L 360 120" />
        <path className="data-path" pathLength="1" strokeDasharray="1" d="M 200 80 L 260 180 L 340 180" />
      </g>

      {/* 核心節點與端點 */}
      <g fill="#ec4899">
        {/* 匯聚中心 (PM/資料分析的核心) */}
        <circle className="data-node" cx="200" cy="80" r="6" filter="url(#neon-glow)" />
        <circle className="data-node" cx="200" cy="80" r="12" fill="none" stroke="#ec4899" strokeWidth="1" opacity="0.5" />
        
        {/* 輸入來源端點 */}
        <circle className="data-node" cx="40" cy="150" r="4" />
        <circle className="data-node" cx="80" cy="260" r="4" />
        
        {/* 輸出結果端點 */}
        <circle className="data-node" cx="360" cy="120" r="4" />
        <circle className="data-node" cx="340" cy="180" r="4" />
      </g>
    </svg>
  );
}