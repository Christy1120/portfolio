import React from "react";
import type { Project } from "../../hooks/useProjectDetail";

export default function EnhancedProjectHeader({ project }: { project: Project }) {
  return (
    <div className="space-y-8 pd-fade-in-delay">
      <div className="space-y-4">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">{project.title}</h1>
        <div className="w-24 h-1 bg-gradient-to-r from-[#fbd786] to-[#f7797d] rounded-full" />
      </div>
      {project.desc && <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">{project.desc}</p>}
    </div>
  );
}
