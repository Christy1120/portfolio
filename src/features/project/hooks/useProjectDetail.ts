// src/features/project/hooks/useProjectDetail.ts
import { useParams } from "react-router-dom";
import { PROJECTS } from "../data/projects";
import { loadProjectOverrides } from "../overrides/registry";

export function useProjectDetail() {
  const { slug } = useParams();
  const project = PROJECTS.find((p) => p.slug === slug);

  const overrides = loadProjectOverrides(slug);

  // ⬇️ 改名，避免和 EnhancedHeroSection 的 `hero` prop 衝突
  const heroData = {
    title: project?.title ?? "",
    subtitle: project?.desc ?? "",
  };

  return { project, heroData, overrides };
}
