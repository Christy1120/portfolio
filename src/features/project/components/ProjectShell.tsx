// src/features/project/components/ProjectShell.tsx
import React from "react";
import Nav from "../../../components/Nav";
import FloatingScrollTop from "../../../components/FloatingScrollTop";
import { EnhancedBackgroundFX } from "../../../components/project-detail";

export default function ProjectShell({
  hero,       // 👈 新增 hero slot
  header,
  overview,
  sidebar,
  sections,
}: {
  hero: React.ReactNode;
  header: React.ReactNode;
  overview: React.ReactNode;
  sidebar: React.ReactNode;
  sections: React.ReactNode;
}) {
  return (
    <div className="project-detail-theme min-h-screen relative bg-white">
      <Nav />
      <EnhancedBackgroundFX />   {/* 背景特效 */}
      <div className="relative z-10 container mx-auto px-6 py-12">
        <div className="max-w-7xl mx-auto">
          {hero}                 {/* 👈 Hero 區塊回來了 */}
          {header}
          <div className="grid lg:grid-cols-3 gap-12 mb-20">
            <div className="lg:col-span-2 space-y-10">
              {overview}
              {sections}
            </div>
            {sidebar}
          </div>
        </div>
      </div>
      <FloatingScrollTop />
    </div>
  );
}
