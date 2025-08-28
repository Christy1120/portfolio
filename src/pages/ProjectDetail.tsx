// src/pages/ProjectDetail.tsx
import React, { Suspense, lazy } from "react";
import { useParams, Link } from "react-router-dom";
import { PROJECTS, type Project } from "../data/site";

// === 把每個 slug 對應到它的客製頁（用 lazy 做分包） ===
const DecentComicPage = lazy(() => import("./profile/DecentComicPage"));
// 之後要新增其他客製頁，照樣在上面 lazy import，然後加到表裡
const CUSTOM_PAGES: Record<
  string,
  React.LazyExoticComponent<React.ComponentType<{ project: Project }>> | undefined
> = {
  "decentralized-comic-platform": DecentComicPage,
  // "spotify-dashboard": lazy(() => import("./custom/SpotifyPage")),
};

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) return <div className="p-8">找不到這個專案 😢</div>;

  const Custom = slug ? CUSTOM_PAGES[slug] : undefined;

  // 有客製頁 → 直接渲染
  if (Custom) {
    return (
      <Suspense fallback={<div className="p-8">頁面載入中…</div>}>
        <Custom project={project} />
      </Suspense>
    );
  }

  // 沒客製頁 → 通用版
  return <GeneralProjectPage project={project} />;
}

// === 通用版（給沒有客製頁的作品走） ===
function GeneralProjectPage({ project }: { project: Project }) {
  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <Link to="/" className="text-sm text-slate-500 hover:underline">← 回到作品集</Link>

      <h1 className="mt-2 text-3xl font-bold">{project.title}</h1>
      <p className="mt-2 text-slate-600">{project.desc}</p>

      {project.hero && (
        <div className="mt-6 aspect-[16/9] w-full overflow-hidden rounded-xl border">
          <img src={project.hero} alt={project.title} className="w-full h-full object-cover" />
        </div>
      )}

      {project.longDesc && (
        <p className="mt-6 leading-7 text-slate-700">{project.longDesc}</p>
      )}

      {!!project.images?.length && (
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {project.images.map((src, i) => (
            <img key={i} src={src} alt={`${project.title} ${i + 1}`} className="rounded-lg border" />
          ))}
        </div>
      )}
    </div>
  );
}
