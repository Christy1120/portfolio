import React from "react";
import {
  EnhancedHeroSection,
  EnhancedProjectHeader,
  EnhancedTagsSection,
  EnhancedActionButtons,
  EnhancedSidebar,
} from "../../../components/project-detail";

export const DefaultHeader = ({ project, hero }: any) => (
  <>
    <EnhancedHeroSection project={project} hero={hero} />
    <EnhancedProjectHeader project={project} />
    <EnhancedTagsSection tags={project.tags} />
    <EnhancedActionButtons href={project.href} />
  </>
);

export const DefaultOverview = ({ longDesc }: { longDesc?: string }) => (
  <div className="pd-glass-card rounded-xl p-8">
    <h2 className="text-2xl font-bold text-gray-900 mb-6">專案概述</h2>
    {longDesc ? (
      <p className="text-base text-gray-700 leading-relaxed">{longDesc}</p>
    ) : (
      <p className="text-base text-gray-500">暫無專案概述。</p>
    )}
  </div>
);

export const DefaultSidebar = ({ project }: any) => (
  <EnhancedSidebar project={project} />
);
