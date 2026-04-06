// src/components/ScrollLottie.tsx
import React, { useRef, useLayoutEffect, useState } from 'react';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// 🌟 修改 1：移除原本寫死的 import
// import animationData from '../assets/lottie/Web Design.json'; 

gsap.registerPlugin(ScrollTrigger);

// 🌟 修改 2：定義要接收的 Prop 型別
interface ScrollLottieProps {
  animationData: any; // 接收來自父層的 Lottie JSON 檔案
}

// 🌟 修改 3：在元件參數中解構取出 animationData
export default function ScrollLottie({ animationData }: ScrollLottieProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useLayoutEffect(() => {
    // 必須等 Lottie 載入完成才能綁定觸發器
    if (!isLoaded || !lottieRef.current) return;

    let ctx = gsap.context(() => {
      
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 80%", // 當動畫區塊頂部進入畫面 80% 的位置時
        onEnter: () => {
          // 進入畫面時，以正常速度播放
          lottieRef.current?.play();
        },
        onLeaveBack: () => {
          // 往上滑離開了畫面，讓動畫暫停並回到第一幀
          lottieRef.current?.stop();
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, [isLoaded]);

  // 🌟 修改 4：防呆機制。如果父層還沒準備好動畫資料，顯示一個科技感的 Loading 或空畫面，防止網頁崩潰
  if (!animationData) {
    return (
      <div className="w-full h-full min-h-[300px] flex items-center justify-center">
        <span className="text-pink-500/30 font-mono text-sm">[ SYSTEM // AWAITING_LOTTIE_DATA ]</span>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full min-h-[300px] flex items-center justify-center"
    >
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData} // 🌟 修改 5：這裡直接使用 Props 傳進來的變數
        loop={true}      
        autoplay={false} // 保持 false，因為我們要等 GSAP 觸發才開始播
        onDOMLoaded={() => setIsLoaded(true)} 
        // 保留你原本超帥的粉色霓虹發光 Hover 效果！
        className="w-full max-w-[80%] drop-shadow-[0_0_15px_rgba(236,72,153,0.2)] transition-all duration-500 hover:drop-shadow-[0_0_25px_rgba(236,72,153,0.5)]"
      />
    </div>
  );
}