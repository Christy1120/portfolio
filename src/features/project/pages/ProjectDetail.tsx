// src/features/project/pages/ProjectDetail.tsx
import React from "react";
import ProjectShell from "../components/ProjectShell";
import {
  DefaultHeader,
  DefaultOverview,
  DefaultSidebar,
} from "../components/project-defaults";
import { RenderSections } from "../sections";
import { useProjectDetail } from "../hooks/useProjectDetail";
import {
  EnhancedHeroSection,
  NotFoundView,
} from "../../../components/project-detail";

export default function ProjectDetail() {
  const { project, heroData, overrides } = useProjectDetail();
  if (!project) return <NotFoundView />;

  const Header = overrides?.Header ?? DefaultHeader;
  const Overview = overrides?.Overview ?? DefaultOverview;
  const Sidebar = overrides?.Sidebar ?? DefaultSidebar;
  const Sections = overrides?.Sections ?? RenderSections;

  return (
    <ProjectShell
      // ✅ 這裡不要傳 `hero={heroData}`，因為 EnhancedHeroSection 的 hero 期待字串
      //    如果你的元件需要圖片 URL，請改成 hero={"/img/xxx.png"}
      hero={<EnhancedHeroSection project={project} />}
      header={<Header project={project} hero={heroData} />}
      overview={<Overview longDesc={project.longDesc} />}
      sidebar={<Sidebar project={project} />}
      sections={<Sections sections={project.sections} />}
    />
  );
}
