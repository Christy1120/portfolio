// src/hooks/useProjectDetail.ts
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { PROJECTS } from "../data/site";

export type Section = { title: string; body: string; image?: string };
export type Project = {
  slug: string;
  title: string;
  desc?: string;
  tags?: string[];
  href?: string;
  images?: string[];
  hero?: string;
  previewImage?: string;
  longDesc?: string;
  role?: string;
  roleSummary?: string;
  date?: string;
  owner?: string;
  sections?: Section[];
};

const getHero = (p?: Project | any): string | null => {
  if (!p) return null;
  return p.images?.[0] ?? p.hero ?? p.previewImage ?? null;
};

export function useProjectDetail() {
  const { slug } = useParams<{ slug: string }>();

  const project = useMemo<Project | undefined>(() => {
    return PROJECTS.find((p: any) => p.slug === slug) as Project | undefined;
  }, [slug]);

  const hero = useMemo(() => getHero(project), [project]);

  return { project, hero, slug };
}
