// src/pages/ProjectDetail.tsx
import React from 'react';
import { useProjectDetail } from '../features/project/hooks/useProjectDetail';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ProjectDetail() {
  const navigate = useNavigate();
  // ⚡️ 直接呼叫你寫好的 Hook，資料就全部拿到了！
  const { project, heroData } = useProjectDetail();

  // 如果網址亂輸入，找不到專案的防呆機制
  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center text-pink-500 font-mono">
        [ ERROR // 404_PROJECT_NOT_FOUND ]
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 px-6 md:px-12 max-w-7xl mx-auto">
      {/* 返回按鈕 */}
      <button 
        onClick={() => navigate(-1)}
        className="group flex items-center gap-2 text-zinc-500 font-mono text-xs tracking-widest uppercase mb-12 hover:text-pink-400 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        Return to System
      </button>

      {/* 渲染從 Hook 拿到的 heroData */}
      <div className="max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-6">
          {heroData.title}
        </h1>
        <p className="text-xl text-zinc-400 leading-relaxed mb-12">
          {heroData.subtitle}
        </p>
      </div>

      {/* 渲染從 Hook 拿到的專案細節 (Scope) */}
      <div className="border-t border-white/10 pt-12">
        <p className="text-zinc-500 font-mono text-sm tracking-widest uppercase mb-6">
          [ SYSTEM // PROJECT_SCOPE ]
        </p>
        <ul className="flex flex-wrap gap-4">
          {project.scope.map((s, idx) => (
            <li key={idx} className="px-4 py-2 rounded-full border border-white/10 bg-white/[0.02] text-zinc-300 font-mono text-xs">
              {s}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}