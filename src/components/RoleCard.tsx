import React from "react";

type Props = {
  imageSrc: string;
  label: string;
  children?: React.ReactNode;
};

export default function RoleCard({ imageSrc, label, children }: Props) {
  return (
    <div className="relative overflow-visible rounded-xl border border-slate-300 bg-white 
                    p-6 md:py-5 md:pr-6 md:pl-[8.5rem] mt-4 md:mt-0">
      
      {/* 圖片魔法：
        - 手機版 (預設)：當作一般圖片，放在標題上方，寬度 w-24，下方留白 mb-4
        - 電腦版 (md:)：變成絕對定位 (absolute)，飛到左邊破格顯示
      */}
      <img
        src={imageSrc}
        alt="role"
        draggable={false}
        className="pointer-events-none select-none
                   w-20 mb-4                       
                   md:absolute md:mb-0 md:w-40     
                   md:top-1/2 md:-translate-y-1/2 md:-left-10"
      />

      {/* 文字內容區塊 */}
      <div>
        <h3 className="mb-2 text-xl font-extrabold text-slate-900">{label}</h3>
        <div className="text-slate-700 text-base leading-relaxed">{children}</div>
      </div>
      
    </div>
  );
}