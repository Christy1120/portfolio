import React, { ReactNode } from "react";

type Props = {
  icon: ReactNode;           // 接收 React 元件，不再是字串 emoji
  title: string;
  desc: ReactNode;
  className?: string;
};

export default function AchievementCard({ icon, title, desc, className = "" }: Props) {
  return (
    <div
      className={`rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md ${className}`}
      role="listitem"
    >
      {/* Icon Badge */}
      <div className="mb-4 flex items-center">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 ring-1 ring-amber-200/60">
          {/* 圖示顏色建議與品牌色相近 */}
          <span className="[&>svg]:h-6 [&>svg]:w-6 [&>svg]:text-amber-600" aria-hidden="true">
            {icon}
          </span>
        </div>
      </div>

      <h3 className="text-base font-semibold text-zinc-900">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-zinc-600">{desc}</p>
    </div>
  );
}
