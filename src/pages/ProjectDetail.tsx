import { Link, useParams } from "react-router-dom";
import { PROJECTS } from "../data/site";

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = PROJECTS.find(p => p.slug === slug);

  if (!project) {
    return (
      <main className="container mx-auto px-4 py-24">
        <h1 className="text-2xl font-bold">找不到此作品</h1>
        <Link to="/" className="text-sky-700 underline mt-4 inline-block">
          ← 回到首頁
        </Link>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-24">
      <Link to="/" className="text-sky-700 font-semibold mb-6 inline-block">
        ← 返回首頁
      </Link>
      <div className="max-w-2xl">
        <h1 className="text-4xl font-bold text-slate-900">{project.title}</h1>
        <p className="text-slate-700 mt-4 leading-relaxed">{project.desc}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <span key={t} className="badge">
              {t}
            </span>
          ))}
        </div>
        {project.href && (
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block text-sky-700 font-semibold"
          >
            外部連結 →
          </a>
        )}
      </div>
    </main>
  );
}
