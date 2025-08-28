// src/components/media/YouTubeEmbed.tsx
import React from "react";

type Props = {
  /** YouTube 影片 ID，例如 dQw4w9WgXcQ */
  videoId: string;
  /** 區塊標題（頁面上顯示；可留空） */
  title?: string;
  /** 起始秒數，預設 0 */
  start?: number;
  /** 區塊外層額外 class（可改內外距、背景等） */
  className?: string;
};

export default function YouTubeEmbed({
  videoId,
  title = "",
  start = 0,
  className = "",
}: Props) {
  return (
    // 重點 1：只針對影片段落關閉 scroll anchoring，避免初次載入把視窗卡在中段
    <section className={`rounded-2xl px-4 py-8 backdrop-blur-sm [overflow-anchor:none] ${className}`}>
      <div className="mx-auto max-w-3xl">
        {/* 有 title 才渲染，避免留下多餘間距 */}
        {title ? (
          <h3 className="mb-3 text-xl font-semibold text-slate-800">{title}</h3>
        ) : null}

        {/* 重點 2：固定 16:9 比例 (aspect-video) 預留高度，避免 CLS 推版 */}
        <div className="relative w-full aspect-video overflow-hidden rounded-xl border border-slate-300 shadow-sm">
          <iframe
            className="absolute inset-0 h-full w-full"
            loading="lazy"
            src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&playsinline=1&start=${start}`}
            title={title || "YouTube video player"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
