import React from "react";
import { ArrowLeft } from "lucide-react";
import { useProjectDetail } from "../hooks/useProjectDetail";

import {
  ThemeCSS,
  EnhancedBackgroundFX,
  EnhancedNavigationBar,
  EnhancedHeroSection,
  EnhancedProjectHeader,
  EnhancedTagsSection,
  EnhancedActionButtons,
  EnhancedSidebar,
  EnhancedContentSections,
  NotFoundView,
} from "../components/project-detail";

export default function ProjectDetail() {
  const { project, hero } = useProjectDetail();
  if (!project) return <NotFoundView />;

  return (
    <div className="project-detail-theme min-h-screen relative bg-white">
      <ThemeCSS />
      <EnhancedBackgroundFX />
      <EnhancedNavigationBar />

      <div className="relative z-10 container mx-auto px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <EnhancedHeroSection project={project} hero={hero} />

          <div className="grid lg:grid-cols-3 gap-12 mb-20">
            <div className="lg:col-span-2 space-y-10">
              <EnhancedProjectHeader project={project} />
              <EnhancedTagsSection tags={project.tags} />
              <EnhancedActionButtons href={project.href} />

              <div className="pd-glass-card rounded-xl p-8 pd-gentle-hover pd-fade-in-delay">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg" />
                  專案概述
                </h2>
                <p className="text-base text-gray-700 leading-relaxed">
                  {project.longDesc}
                </p>
              </div>
            </div>

            <EnhancedSidebar project={project} />
          </div>

          <EnhancedContentSections />
        </div>
      </div>

      {/* 返回頂部按鈕（保留行為一致） */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 pd-interactive z-50"
        aria-label="返回頂部"
      >
        <ArrowLeft className="w-5 h-5 mx-auto rotate-90" />
      </button>
    </div>
  );
}
