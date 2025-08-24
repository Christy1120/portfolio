// RoleCard.tsx
import React from "react";

type Props = {
  imageSrc: string;          // 放 public/girl.png -> "/girl.png"
  label: string;
  children?: React.ReactNode;
};

export default function RoleCard({ imageSrc, label, children }: Props) {
  return (
    // 關鍵1：外層 relative + overflow-visible 讓圖片能探出卡片
    <div className="relative overflow-visible">
      {/* 關鍵2：對卡片本身加左邊 padding，預留人物的寬度 */}
      <div className="rounded-xl border border-slate-300 bg-white px-6 py-5
                      pl-[6.5rem] md:pl-[8.5rem]">
        <h3 className="mb-2 text-xl font-extrabold text-slate-900">{label}</h3>
        <div className="text-slate-700 text-base leading-relaxed">{children}</div>
      </div>

      {/* 關鍵3：人物絕對定位，垂直置中；left 用負值讓他探出邊線 */}
      <img
        src={imageSrc}
        alt="role"
        className="pointer-events-none select-none
                   absolute top-1/2 -translate-y-1/2
                   -left-8 md:-left-10
                   w-20 md:w-40"
        draggable={false}
      />
    </div>
  );
}
