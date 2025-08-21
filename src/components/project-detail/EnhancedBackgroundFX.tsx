import React from "react";

export default function EnhancedBackgroundFX() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* 背景漸層（吃 variables） */}
      <div className="absolute inset-0 pd-bg" />

      {/* 漂浮柔光球（抽成 utils，不用 inline） */}
      <div className="absolute top-20 left-10 w-72 h-72 pd-orb pd-orb-1 animate-pulse" />
      <div className="absolute top-40 right-20 w-96 h-96 pd-orb pd-orb-2 animate-pulse pd-delay-1" />
      <div className="absolute bottom-20 left-1/3 w-80 h-80 pd-orb pd-orb-3 animate-pulse pd-delay-2" />

      {/* 超淡網格（抽成 utils） */}
      <div className="absolute inset-0 pd-grid" />
    </div>
  );
}
