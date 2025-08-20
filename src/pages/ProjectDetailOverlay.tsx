import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { PROJECTS } from "../data/site";

export default function ProjectDetailOverlay() {
  const nav = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const project = PROJECTS.find(p => p.slug === slug);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && nav(-1);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [nav]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => nav(-1)}
      >
        <motion.article
          className="bg-white rounded-2xl max-w-lg w-full p-6 m-4"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-start">
            <h1 className="text-2xl font-bold">{project.title}</h1>
            <button
              onClick={() => nav(-1)}
              className="text-slate-500 hover:text-slate-700"
              aria-label="關閉"
            >
              ✕
            </button>
          </div>
          <p className="text-slate-700 mt-4">{project.desc}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="badge">
                {tag}
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
        </motion.article>
      </motion.div>
    </AnimatePresence>
  );
}
